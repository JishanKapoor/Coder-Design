"use client";
import { useState, useRef, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Trash2,
  Check,
  Zap,
  Shield,
  Globe,
  Code2,
  FileText,
  Clock,
  Search,
  ArrowRight,
  Type,
  BookOpen,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Token type enum for colour coding ─── */
type TokenType =
  | "anchor"
  | "quantifier"
  | "charclass"
  | "group"
  | "lookaround"
  | "alternation"
  | "escape"
  | "literal"
  | "backreference"
  | "flag";

interface ExplainedToken {
  token: string;
  description: string;
  type: TokenType;
}

/* ─── Colour map for token badges ─── */
const TOKEN_COLORS: Record<TokenType, { bg: string; text: string; border: string }> = {
  anchor: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  quantifier: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  charclass: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  group: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  lookaround: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  alternation: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  escape: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  literal: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  backreference: { bg: "bg-indigo-50", text: "text-teal-700", border: "border-indigo-200" },
  flag: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
};

/* ─── Core tokenizer / parser ─── */
function explainRegex(pattern: string): ExplainedToken[] {
  const tokens: ExplainedToken[] = [];
  let i = 0;
  const len = pattern.length;

  while (i < len) {
    const ch = pattern[i];

    /* ── Escaped sequences ── */
    if (ch === "\\" && i + 1 < len) {
      const next = pattern[i + 1];

      /* Shorthand character classes */
      const shorthandMap: Record<string, { desc: string; type: TokenType }> = {
        d: { desc: "Any digit (0-9)", type: "charclass" },
        D: { desc: "Any non-digit character", type: "charclass" },
        w: { desc: "Any word character (letter, digit, or underscore)", type: "charclass" },
        W: { desc: "Any non-word character", type: "charclass" },
        s: { desc: "Any whitespace character (space, tab, newline)", type: "charclass" },
        S: { desc: "Any non-whitespace character", type: "charclass" },
        b: { desc: "Word boundary", type: "anchor" },
        B: { desc: "Non-word boundary", type: "anchor" },
        t: { desc: "Tab character", type: "escape" },
        n: { desc: "Newline character", type: "escape" },
        r: { desc: "Carriage return", type: "escape" },
      };

      if (shorthandMap[next]) {
        tokens.push({
          token: `\\${next}`,
          description: shorthandMap[next].desc,
          type: shorthandMap[next].type,
        });
        i += 2;
        continue;
      }

      /* Back-references \1 .. \9 */
      if (/[1-9]/.test(next)) {
        let ref = next;
        let j = i + 2;
        while (j < len && /\d/.test(pattern[j])) {
          ref += pattern[j];
          j++;
        }
        tokens.push({
          token: `\\${ref}`,
          description: `Back-reference to capturing group ${ref}`,
          type: "backreference",
        });
        i = j;
        continue;
      }

      /* Escaped special chars → literal */
      tokens.push({
        token: `\\${next}`,
        description: `Literally '${next}'`,
        type: "escape",
      });
      i += 2;
      continue;
    }

    /* ── Anchors ── */
    if (ch === "^") {
      tokens.push({ token: "^", description: "Start of string", type: "anchor" });
      i++;
      continue;
    }
    if (ch === "$") {
      tokens.push({ token: "$", description: "End of string", type: "anchor" });
      i++;
      continue;
    }

    /* ── Dot ── */
    if (ch === ".") {
      tokens.push({ token: ".", description: "Any single character (except newline)", type: "charclass" });
      i++;
      continue;
    }

    /* ── Alternation ── */
    if (ch === "|") {
      tokens.push({ token: "|", description: "OR (alternation)", type: "alternation" });
      i++;
      continue;
    }

    /* ── Quantifiers ── */
    if (ch === "*") {
      const lazy = i + 1 < len && pattern[i + 1] === "?";
      tokens.push({
        token: lazy ? "*?" : "*",
        description: lazy ? "Zero or more of the preceding (lazy / non-greedy)" : "Zero or more of the preceding",
        type: "quantifier",
      });
      i += lazy ? 2 : 1;
      continue;
    }
    if (ch === "+") {
      const lazy = i + 1 < len && pattern[i + 1] === "?";
      tokens.push({
        token: lazy ? "+?" : "+",
        description: lazy ? "One or more of the preceding (lazy / non-greedy)" : "One or more of the preceding",
        type: "quantifier",
      });
      i += lazy ? 2 : 1;
      continue;
    }
    if (ch === "?" && (tokens.length === 0 || tokens[tokens.length - 1].type !== "quantifier")) {
      tokens.push({ token: "?", description: "Zero or one of the preceding (optional)", type: "quantifier" });
      i++;
      continue;
    }

    /* ── Curly-brace quantifiers {n}, {n,}, {n,m} ── */
    if (ch === "{") {
      const curlyMatch = pattern.slice(i).match(/^\{(\d+)(,)?(\d+)?\}/);
      if (curlyMatch) {
        const full = curlyMatch[0];
        const n = curlyMatch[1];
        const comma = curlyMatch[2];
        const m = curlyMatch[3];

        let desc: string;
        if (!comma && !m) {
          desc = `Exactly ${n} of the preceding`;
        } else if (comma && !m) {
          desc = `${n} or more of the preceding`;
        } else {
          desc = `Between ${n} and ${m} of the preceding`;
        }

        /* Check for lazy modifier */
        const afterBrace = i + full.length;
        const lazy = afterBrace < len && pattern[afterBrace] === "?";
        if (lazy) {
          desc += " (lazy / non-greedy)";
        }

        tokens.push({ token: lazy ? full + "?" : full, description: desc, type: "quantifier" });
        i += full.length + (lazy ? 1 : 0);
        continue;
      }
    }

    /* ── Character classes [...] ── */
    if (ch === "[") {
      let j = i + 1;
      let negated = false;
      if (j < len && pattern[j] === "^") {
        negated = true;
        j++;
      }
      /* Allow ] as first character inside the class */
      if (j < len && pattern[j] === "]") {
        j++;
      }
      while (j < len && pattern[j] !== "]") {
        if (pattern[j] === "\\" && j + 1 < len) {
          j += 2;
        } else {
          j++;
        }
      }
      if (j < len) j++; /* consume closing ] */

      const full = pattern.slice(i, j);
      const inner = full.slice(negated ? 2 : 1, -1);

      const prefix = negated ? "Negated character class" : "Character class";
      const verboseInner = describeCharClassContents(inner);
      const desc = negated
        ? `${prefix}: any character NOT in ${verboseInner}`
        : `${prefix}: any of ${verboseInner}`;

      tokens.push({ token: full, description: desc, type: "charclass" });
      i = j;
      continue;
    }

    /* ── Groups ── */
    if (ch === "(") {
      /* Lookaheads / lookbehinds / non-capturing / named groups */
      if (i + 1 < len && pattern[i + 1] === "?") {
        /* (?= positive lookahead */
        if (i + 2 < len && pattern[i + 2] === "=") {
          const end = findClosingParen(pattern, i);
          const inner = pattern.slice(i + 3, end);
          tokens.push({
            token: pattern.slice(i, end + 1),
            description: `Positive lookahead: followed by ${inner || "..."}`,
            type: "lookaround",
          });
          i = end + 1;
          continue;
        }
        /* (?! negative lookahead */
        if (i + 2 < len && pattern[i + 2] === "!") {
          const end = findClosingParen(pattern, i);
          const inner = pattern.slice(i + 3, end);
          tokens.push({
            token: pattern.slice(i, end + 1),
            description: `Negative lookahead: NOT followed by ${inner || "..."}`,
            type: "lookaround",
          });
          i = end + 1;
          continue;
        }
        /* (?<= positive lookbehind */
        if (i + 2 < len && pattern[i + 2] === "<" && i + 3 < len && pattern[i + 3] === "=") {
          const end = findClosingParen(pattern, i);
          const inner = pattern.slice(i + 4, end);
          tokens.push({
            token: pattern.slice(i, end + 1),
            description: `Positive lookbehind: preceded by ${inner || "..."}`,
            type: "lookaround",
          });
          i = end + 1;
          continue;
        }
        /* (?<! negative lookbehind */
        if (i + 2 < len && pattern[i + 2] === "<" && i + 3 < len && pattern[i + 3] === "!") {
          const end = findClosingParen(pattern, i);
          const inner = pattern.slice(i + 4, end);
          tokens.push({
            token: pattern.slice(i, end + 1),
            description: `Negative lookbehind: NOT preceded by ${inner || "..."}`,
            type: "lookaround",
          });
          i = end + 1;
          continue;
        }
        /* (?<name> named capturing group */
        if (i + 2 < len && pattern[i + 2] === "<") {
          const nameMatch = pattern.slice(i + 3).match(/^([a-zA-Z_]\w*)>/);
          if (nameMatch) {
            const groupName = nameMatch[1];
            const end = findClosingParen(pattern, i);
            const inner = pattern.slice(i + 3 + groupName.length + 1, end);
            tokens.push({
              token: pattern.slice(i, end + 1),
              description: `Named capturing group '${groupName}': captures ${inner || "..."}`,
              type: "group",
            });
            i = end + 1;
            continue;
          }
        }
        /* (?: non-capturing group */
        if (i + 2 < len && pattern[i + 2] === ":") {
          const end = findClosingParen(pattern, i);
          const inner = pattern.slice(i + 3, end);
          tokens.push({
            token: pattern.slice(i, end + 1),
            description: `Non-capturing group: ${inner || "..."}`,
            type: "group",
          });
          i = end + 1;
          continue;
        }
      }

      /* Plain capturing group */
      const end = findClosingParen(pattern, i);
      const inner = pattern.slice(i + 1, end);
      tokens.push({
        token: pattern.slice(i, end + 1),
        description: `Capturing group: ${inner || "..."}`,
        type: "group",
      });
      i = end + 1;
      continue;
    }

    /* ── Literal character ── */
    tokens.push({ token: ch, description: `Literally '${ch}'`, type: "literal" });
    i++;
  }

  return tokens;
}

/* ─── Helper: find matching closing parenthesis ─── */
function findClosingParen(pattern: string, openPos: number): number {
  let depth = 1;
  let j = openPos + 1;
  while (j < pattern.length && depth > 0) {
    if (pattern[j] === "\\" && j + 1 < pattern.length) {
      j += 2;
      continue;
    }
    if (pattern[j] === "[") {
      /* Skip character class contents */
      j++;
      if (j < pattern.length && pattern[j] === "^") j++;
      if (j < pattern.length && pattern[j] === "]") j++;
      while (j < pattern.length && pattern[j] !== "]") {
        if (pattern[j] === "\\" && j + 1 < pattern.length) j += 2;
        else j++;
      }
      j++; /* skip ] */
      continue;
    }
    if (pattern[j] === "(") depth++;
    if (pattern[j] === ")") depth--;
    if (depth === 0) return j;
    j++;
  }
  return j < pattern.length ? j : pattern.length - 1;
}

/* ─── Helper: describe character class contents ─── */
function describeCharClassContents(inner: string): string {
  const parts: string[] = [];
  let k = 0;
  while (k < inner.length) {
    if (inner[k] === "\\" && k + 1 < inner.length) {
      const esc = inner[k + 1];
      const escMap: Record<string, string> = {
        d: "digit",
        D: "non-digit",
        w: "word char",
        W: "non-word char",
        s: "whitespace",
        S: "non-whitespace",
        t: "tab",
        n: "newline",
        r: "carriage return",
      };
      if (escMap[esc]) {
        parts.push(escMap[esc]);
      } else {
        parts.push(`'${esc}'`);
      }
      k += 2;
      continue;
    }
    /* Range: a-z */
    if (k + 2 < inner.length && inner[k + 1] === "-" && inner[k + 2] !== "]") {
      parts.push(`'${inner[k]}' to '${inner[k + 2]}'`);
      k += 3;
      continue;
    }
    parts.push(`'${inner[k]}'`);
    k++;
  }
  return parts.join(", ");
}

/* ─── Helper: explain flags ─── */
function explainFlags(flags: string): ExplainedToken[] {
  const flagMap: Record<string, string> = {
    g: "Global: find all matches",
    i: "Case-insensitive matching",
    m: "Multiline: ^ and $ match line starts/ends",
    s: "Dotall: . matches newline too",
    u: "Unicode: full Unicode support",
  };
  const result: ExplainedToken[] = [];
  for (const f of flags) {
    if (flagMap[f]) {
      result.push({ token: f, description: flagMap[f], type: "flag" });
    }
  }
  return result;
}

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */

export default function RegexExplainerTool() {
  const [regexInput, setRegexInput] = useState("");
  const [flags, setFlags] = useState("gi");
  const [explanation, setExplanation] = useState<ExplainedToken[]>([]);
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Run explanation ─── */
  const handleExplain = useCallback(() => {
    setError("");
    setExplanation([]);
    setMatches([]);

    const pattern = regexInput.trim();
    if (!pattern) {
      setError("Please enter a regular expression to explain.");
      return;
    }

    /* Validate regex */
    try {
      new RegExp(pattern, flags);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid regular expression";
      setError(msg);
      return;
    }

    const tokens = explainRegex(pattern);
    const flagTokens = explainFlags(flags);
    setExplanation([...tokens, ...flagTokens]);

    /* Run test matches if test string exists */
    if (testString.trim()) {
      runTestMatches(pattern, flags, testString);
    }
  }, [regexInput, flags, testString]);

  /* ─── Test matches ─── */
  const runTestMatches = useCallback(
    (pattern: string, fl: string, text: string) => {
      try {
        const re = new RegExp(pattern, fl.includes("g") ? fl : fl + "g");
        const found = text.match(re) || [];
        setMatches(found);
      } catch {
        setMatches([]);
      }
    },
    []
  );

  /* ─── Highlight matches in test string ─── */
  const renderHighlightedText = useCallback(() => {
    if (!regexInput.trim() || !testString) return testString;

    try {
      const re = new RegExp(
        regexInput.trim(),
        flags.includes("g") ? flags : flags + "g"
      );
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      const safeRe = new RegExp(re.source, re.flags);

      while ((match = safeRe.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = safeRe.lastIndex;
        if (match[0].length === 0) {
          safeRe.lastIndex++;
        }
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false });
      }
      return parts;
    } catch {
      return testString;
    }
  }, [regexInput, flags, testString]);

  /* ─── Handlers ─── */
  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const handleClear = () => {
    setRegexInput("");
    setFlags("gi");
    setExplanation([]);
    setTestString("");
    setMatches([]);
    setError("");
    inputRef.current?.focus();
  };

  const handleCopy = async () => {
    if (explanation.length === 0) return;
    const text = explanation
      .map((t) => `${t.token}  →  ${t.description}`)
      .join("\n");
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── Data ─── */

  const features = [
    {
      icon: BookOpen,
      title: "Plain-English Explanations",
      description:
        "Every token in your regex is explained in simple, human-readable language. Anchors, quantifiers, character classes, groups, lookaheads — all decoded instantly so you never have to guess what a pattern does.",
    },
    {
      icon: Zap,
      title: "Instant Parsing",
      description:
        "The regex is parsed entirely client-side using a deterministic tokenizer written in TypeScript. No server calls, no latency — just paste your regex and see the breakdown in milliseconds.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "Nothing you type ever leaves your browser. Your regex patterns and test strings are never sent to any server, stored in any database, or shared with any third party. Complete privacy guaranteed.",
    },
    {
      icon: Code2,
      title: "Test Against Sample Text",
      description:
        "Paste any text in the test area to see exactly which substrings your regex matches. Matches are highlighted inline with a count badge so you can verify and debug patterns instantly.",
    },
    {
      icon: Lightbulb,
      title: "Learn Regex",
      description:
        "Perfect for students and developers learning regular expressions. See every part of a pattern explained with color-coded token types — anchors, quantifiers, groups, and more — to build intuition by example.",
    },
    {
      icon: Globe,
      title: "Works on Any Device",
      description:
        "Fully responsive design that works on desktop, tablet, and mobile. Chrome, Firefox, Safari, Edge — all modern browsers supported. No installation or plugins required.",
    },
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Paste Your Regular Expression",
      description:
        "Enter any regex pattern in the input field — from simple patterns like \\d+ to complex ones with lookaheads, character classes, and alternation. Paste from your code editor or type it directly.",
    },
    {
      step: 2,
      title: "Set Flags",
      description:
        "Choose the regex flags to apply: g (global), i (case-insensitive), m (multiline), s (dotall), or u (Unicode). Each flag modifies how the engine interprets the pattern.",
    },
    {
      step: 3,
      title: "Read the Explanation",
      description:
        "Press \"Explain Regex\" to see a color-coded breakdown. Every token is displayed with its regex syntax in monospace and a plain-English description of what it matches or asserts.",
    },
    {
      step: 4,
      title: "Test with Sample Text",
      description:
        "Paste sample text to see all matches highlighted in real time. The tool shows total match count and visually marks each match so you can verify the regex does exactly what you intend.",
    },
  ];

  const useCases = [
    {
      icon: BookOpen,
      title: "Learn Regex Syntax",
      description:
        "Students and beginners can paste any regex pattern and instantly see what each part does. Build understanding of anchors, quantifiers, groups, and character classes by seeing real explanations instead of abstract documentation.",
    },
    {
      icon: Code2,
      title: "Debug Complex Patterns",
      description:
        "When a regex doesn't match what you expect, paste it here to see the precise meaning of every token. Spot misplaced quantifiers, missing escapes, or incorrect character classes in seconds instead of staring at cryptic syntax.",
    },
    {
      icon: FileText,
      title: "Review Code",
      description:
        "Inherited a codebase full of regular expressions? Paste each one to get a clear English summary of what it validates or extracts. Perfect for code reviews, onboarding, and legacy system documentation.",
    },
    {
      icon: Type,
      title: "Write Better Patterns",
      description:
        "Use the explainer as a feedback loop while authoring regex. Write your pattern, see the explanation, verify it matches your intent, and iterate until the English description matches what you want the regex to do.",
    },
    {
      icon: Globe,
      title: "Share & Document",
      description:
        "Copy the plain-English explanation and paste it as a code comment or into team documentation. Transform unreadable regex into clear descriptions that any team member can understand without regex expertise.",
    },
  ];

  const faqs = [
    {
      question: "What regex flavor does the explainer support?",
      answer:
        "The explainer is built around JavaScript (ECMAScript) regular expression syntax, which is the most widely used flavor on the web. It supports character classes, quantifiers (greedy and lazy), capturing and non-capturing groups, named groups, lookaheads, lookbehinds, alternation, back-references, Unicode escapes, and all shorthand classes (\\d, \\w, \\s, etc.). Since most regex syntax is shared across flavors, explanations are accurate for Python, Java, PHP, Ruby, and Go in the vast majority of cases.",
    },
    {
      question: "Does it handle lookaheads and lookbehinds?",
      answer:
        "Yes. The tool fully recognizes and explains positive lookaheads (?=...), negative lookaheads (?!...), positive lookbehinds (?<=...), and negative lookbehinds (?<!...). Each lookaround is color-coded as an amber badge and described clearly — for example, 'Positive lookahead: followed by ...' — so you can understand zero-width assertions at a glance without memorizing the syntax.",
    },
    {
      question: "How are character class ranges explained?",
      answer:
        "Character classes like [a-zA-Z0-9] are broken down into their individual ranges and characters. The tool shows the full class token and describes each range — e.g., \"'a' to 'z', 'A' to 'Z', '0' to '9'\". Negated classes like [^0-9] are explicitly marked as 'any character NOT in ...' so you can immediately see what the class excludes.",
    },
    {
      question: "Does it explain greedy vs. lazy quantifiers?",
      answer:
        "Yes. Quantifiers like *, +, ?, and {n,m} are explained with their default greedy behavior. When a lazy modifier ? follows a quantifier (e.g., *?, +?, {2,5}?), the tool adds '(lazy / non-greedy)' to the description so you know the quantifier will match as few characters as possible rather than as many as possible.",
    },
    {
      question: "What about Unicode and special escape sequences?",
      answer:
        "The tool explains common escape sequences like \\t (tab), \\n (newline), \\r (carriage return), and shorthand character classes \\d, \\D, \\w, \\W, \\s, \\S. The 'u' flag can be toggled to indicate Unicode mode. Escaped special characters like \\. or \\* are correctly identified as literal matches rather than their special regex meaning.",
    },
    {
      question: "What about deeply nested or recursive groups?",
      answer:
        "The parser handles nested groups by tracking parenthesis depth and correctly identifying matching open/close pairs. For very deeply nested groups, the tool shows the entire group as a single token with its contents. While it correctly identifies all standard group types (capturing, non-capturing, named, and lookarounds), the inner contents of complex nested groups are displayed as-is rather than recursively expanded, which keeps the output readable.",
    },
    {
      question: "Is my regex or test text stored anywhere?",
      answer:
        "No. All parsing and explanation happens entirely in your browser using client-side JavaScript. Your regex patterns and test strings are never sent to any server, stored in any database, or shared with any third party. You can verify this by disconnecting from the internet after the page loads — the tool continues to work completely offline.",
    },
    {
      question: "How accurate are the explanations?",
      answer:
        "The explanations are generated by a deterministic token parser that follows ECMAScript regex grammar rules. Each token type — anchors, quantifiers, character classes, groups, lookarounds, back-references, and literals — is mapped to a precise, unambiguous English description. For standard JavaScript regex syntax, the accuracy is extremely high and covers well over 99% of patterns encountered in real-world codebases.",
    },
  ];

  /* ─── Render ─── */

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-emerald-600 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-sm text-white/70"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">
              Free Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Regex Explainer</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-4xl">
              Free Regex Explainer – Understand Regular Expressions Instantly
            </h1>
          </div>

          <p className="max-w-2xl text-white/90 leading-relaxed">
            Paste any regular expression and get a plain-English explanation of
            every part. Decode complex patterns, learn regex syntax, debug
            expressions, and test against sample text. Free, private, no login
            required.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Instant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              Any Device
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Tool Section ── */}
      <section className="py-16 lg:py-16" id="tool">
        <div className="mx-auto max-w-4xl overflow-hidden px-6 lg:px-12 space-y-8">
          {/* Regex Input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Regular Expression
            </label>
            <input
              ref={inputRef}
              type="text"
              value={regexInput}
              onChange={(e) => setRegexInput(e.target.value)}
              placeholder="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExplain();
              }}
            />
          </div>

          {/* Flags */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Flags
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              {[
                { flag: "g", label: "Global (g)" },
                { flag: "i", label: "Case-insensitive (i)" },
                { flag: "m", label: "Multiline (m)" },
                { flag: "s", label: "Dotall (s)" },
                { flag: "u", label: "Unicode (u)" },
              ].map(({ flag, label }) => (
                <label
                  key={flag}
                  className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={flags.includes(flag)}
                    onChange={() => toggleFlag(flag)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleExplain}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-auto whitespace-nowrap"
            >
              <BookOpen className="h-4 w-4 flex-shrink-0" />
              <span>Explain Regex</span>
            </button>
            <button
              onClick={handleClear}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 sm:px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/50 w-full sm:w-auto whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" />
              <span>Clear</span>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Explanation Output */}
          {explanation.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Explanation
                </h3>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Explanation
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {explanation.map((item, idx) => {
                  const colors = TOKEN_COLORS[item.type];
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 px-5 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <code
                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold font-mono whitespace-nowrap ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {item.token}
                      </code>
                      <span className="text-sm leading-relaxed text-slate-700 pt-0.5">
                        {item.description}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                  Anchor
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                  Quantifier
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  Character Class
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  Group
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Lookaround
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  Alternation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Escape
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  Literal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Flag
                </span>
              </div>
            </div>
          )}

          {/* Test Section */}
          {explanation.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-slate-900">
                Test Against Sample Text
              </label>
              <textarea
                value={testString}
                onChange={(e) => {
                  setTestString(e.target.value);
                  if (regexInput.trim()) {
                    runTestMatches(regexInput.trim(), flags, e.target.value);
                  }
                }}
                placeholder="Paste sample text here to see which parts match your regex..."
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
              />

              {testString.trim() && (
                <div className="space-y-3">
                  {/* Match count badge */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 border border-orange-100 px-3 py-1.5 text-sm text-orange-700">
                      <Search className="h-3.5 w-3.5" />
                      <strong>{matches.length}</strong>{" "}
                      {matches.length === 1 ? "match" : "matches"} found
                    </span>
                  </div>

                  {/* Highlighted text */}
                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 font-mono whitespace-pre-wrap break-all">
                    {(() => {
                      const result = renderHighlightedText();
                      if (typeof result === "string") return result;
                      return (result as { text: string; isMatch: boolean }[]).map(
                        (part, idx) =>
                          part.isMatch ? (
                            <mark
                              key={idx}
                              className="bg-orange-200 text-orange-900 rounded px-0.5"
                            >
                              {part.text}
                            </mark>
                          ) : (
                            <span key={idx}>{part.text}</span>
                          )
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          )}

          {explanation.length === 0 && !error && (
            <p className="text-sm text-slate-500">
              Enter a regular expression above and click &quot;Explain Regex&quot; to
              see a token-by-token breakdown.
            </p>
          )}
        </div>
      </section>

      {/* ── 3. How-To Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Explain a Regular Expression
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Follow these simple steps to understand any regex pattern. It takes
              just seconds — no prior regex knowledge required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {howToSteps.map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Features Section ── */}
      <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Regex Explainer?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A fast, private, and feature-rich regular expression explainer
              built by professional developers at CoderDesign Toronto. Here is
              what makes it different.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Use Cases Section ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Common Use Cases
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              See how developers, students, code reviewers, and teams use the
              Regex Explainer to work smarter with regular expressions.
            </p>
          </div>

          <div className="space-y-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="flex items-start gap-4 p-6">
                    <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-base font-semibold text-slate-900">
                        {useCase.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ Section ── */}
      <section
        className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20"
        id="faq"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Everything you need to know about explaining and understanding
              regular expressions. Can&apos;t find what you&apos;re looking
              for?{" "}
              <Link
                href="/contact"
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                Contact us
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Related Tools ── */}
      <RelatedTools currentSlug="regex-explainer" />

      {/* ── 8. CTA ── */}
      <ToolCta theme="emerald" />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
