"use client";
import { useState, useRef, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Upload,
  Copy,
  Trash2,
  Check,
  Download,
  Zap,
  Shield,
  Globe,
  Code2,
  FileText,
  Clock,
  Table,
  ArrowRight,
  Plus,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
} from "lucide-react";
import { RelatedTools, ToolCta } from "../shared";

/* ─── Types ─── */
type Alignment = "left" | "center" | "right";

/* ─── Data ─── */
const features = [
  {
    icon: Table,
    title: "Visual Grid Editor",
    desc: "Edit cells directly in an interactive table — no manual pipe-and-hyphen formatting. Just type into the grid and the Markdown writes itself.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    desc: "Generate perfectly formatted Markdown table syntax in milliseconds. Click once and copy — ready for README files, docs, or blog posts.",
  },
  {
    icon: Shield,
    title: "100\u2009% Private",
    desc: "Everything runs client-side in your browser. Your table data is never sent to any server, stored, logged, or shared with anyone.",
  },
  {
    icon: Code2,
    title: "CSV Import / Export",
    desc: "Paste CSV data to auto-populate the grid, or export your table back to CSV. Seamlessly convert between formats in seconds.",
  },
  {
    icon: AlignCenter,
    title: "Column Alignment",
    desc: "Set each column independently to left, center, or right alignment. Alignment markers are automatically added to the generated Markdown.",
  },
  {
    icon: Globe,
    title: "GitHub Compatible",
    desc: "Generates GitHub Flavored Markdown (GFM) tables — fully compatible with GitHub, GitLab, Bitbucket, Notion, Obsidian, and all major platforms.",
  },
];

const howToSteps = [
  {
    step: "01",
    title: "Set Rows & Columns",
    desc: "Choose your table size with the row and column controls. Start small and expand later, or set the exact dimensions up front.",
  },
  {
    step: "02",
    title: "Fill in Your Data",
    desc: "Type directly into the interactive grid editor or click Import CSV to paste comma-separated data and auto-populate the table.",
  },
  {
    step: "03",
    title: "Set Alignment",
    desc: "Click the alignment buttons below each column header to toggle between left, center, and right text alignment.",
  },
  {
    step: "04",
    title: "Copy the Markdown",
    desc: "Click Generate Markdown, then copy the output to your clipboard or download it as a .md file — ready to paste anywhere.",
  },
];

const useCases = [
  {
    icon: Code2,
    title: "GitHub README Tables",
    desc: "Create beautifully formatted tables for your README.md — feature comparisons, API references, version matrices, and badge tables.",
    before: "Name, Stars, Language\nReact, 220k, JavaScript\nVue, 207k, JavaScript",
    after: "| Name  | Stars | Language   |\n| :---- | :---: | ---------: |\n| React | 220k  | JavaScript |\n| Vue   | 207k  | JavaScript |",
  },
  {
    icon: FileText,
    title: "Documentation Tables",
    desc: "Build configuration tables, API parameter docs, and environment variable references for technical documentation.",
    before: "Param, Type, Required\napi_key, string, yes\ntimeout, number, no",
    after: "| Param   | Type   | Required |\n| :------ | :----- | :------: |\n| api_key | string | yes      |\n| timeout | number | no       |",
  },
  {
    icon: Type,
    title: "Blog Content Tables",
    desc: "Add comparison tables, pricing grids, and pros/cons tables to Markdown-based blog posts and articles.",
    before: "Plan, Price, Storage\nFree, $0, 5 GB\nPro, $9, 100 GB",
    after: "| Plan | Price | Storage |\n| :--- | :---: | ------: |\n| Free | $0    |    5 GB |\n| Pro  | $9    |  100 GB |",
  },
  {
    icon: Globe,
    title: "Static Site Tables",
    desc: "Generate tables for Jekyll, Hugo, Gatsby, and other Markdown-based static site generators — no HTML required.",
    before: "Feature, Supported\nDark Mode, Yes\nRTL, Yes\nPWA, No",
    after: "| Feature   | Supported |\n| :-------- | :-------: |\n| Dark Mode | Yes       |\n| RTL       | Yes       |\n| PWA       | No        |",
  },
  {
    icon: Table,
    title: "CSV to Markdown",
    desc: "Convert exported CSV data from spreadsheets and databases into clean, readable Markdown tables instantly.",
    before: "id,name,email\n1,Alice,alice@ex.com\n2,Bob,bob@ex.com",
    after: "| id | name  | email        |\n| :- | :---- | :----------- |\n| 1  | Alice | alice@ex.com |\n| 2  | Bob   | bob@ex.com   |",
  },
];

const faqs = [
  {
    question: "What is a Markdown table?",
    answer:
      "A Markdown table is a lightweight way to display tabular data using plain text. It uses pipes (|) to separate columns and hyphens (-) to create a header row separator. Markdown tables are widely supported on GitHub, GitLab, Bitbucket, Reddit, Stack Overflow, Jekyll, Hugo, and most Markdown editors. They render as clean HTML tables without requiring any HTML.",
  },
  {
    question: "How do I create a Markdown table?",
    answer:
      "Use CoderDesign's free Markdown Table Generator: set your desired number of rows and columns, type your data into the interactive grid editor, choose column alignment (left, center, or right), and click Generate Markdown. The tool outputs perfectly formatted Markdown table syntax that you can copy and paste directly into any Markdown file.",
  },
  {
    question: "Can I import CSV data to create a table?",
    answer:
      "Yes. Click the Import CSV button, paste your comma-separated data into the textarea, and click Import. The tool automatically detects rows and columns, sets the first row as headers, and populates the grid. This is perfect for converting spreadsheet exports, database query results, or any CSV file into a clean Markdown table.",
  },
  {
    question: "What alignment options are available?",
    answer:
      "You can set each column independently to left-aligned (:---), center-aligned (:---:), or right-aligned (---:). Click the alignment buttons below each column header to toggle between options. The alignment is reflected in the generated Markdown using standard GitHub Flavored Markdown (GFM) alignment syntax.",
  },
  {
    question: "Does this work for GitHub Flavored Markdown?",
    answer:
      "Yes. The generated table syntax is fully compatible with GitHub Flavored Markdown (GFM), which is the standard used in GitHub README files, issues, pull requests, and wikis. It also works on GitLab, Bitbucket, Notion, Obsidian, and any platform that supports GFM tables.",
  },
  {
    question: "How do I escape pipes in cell content?",
    answer:
      "If your cell content contains a pipe character (|), the tool automatically escapes it as \\| in the generated Markdown. This ensures the table renders correctly on all platforms. You can type pipe characters freely in the grid editor without worrying about breaking the table structure.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All processing happens entirely in your browser using JavaScript — nothing is sent to any server. Your table data is never stored in any database, logged, or shared with any third party. You can disconnect from the internet after the page loads and the tool continues to work.",
  },
  {
    question: "Can I add or remove rows and columns dynamically?",
    answer:
      "Yes. The tool provides buttons to add or remove rows and columns at any time. You can start with a small table and expand it, or remove rows and columns you no longer need. The grid editor updates instantly and your existing data is preserved when adding new rows or columns.",
  },
];

/* ─── Helpers ─── */
function createGrid(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
}

function createHeaders(cols: number): string[] {
  return Array.from({ length: cols }, (_, i) => `Header ${i + 1}`);
}

function createAlignments(cols: number): Alignment[] {
  return Array.from({ length: cols }, () => "left" as Alignment);
}

/* ─── Component ─── */
export default function MarkdownTableGeneratorTool() {
  /* Grid state */
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(createGrid(3, 3));
  const [headerRow, setHeaderRow] = useState<string[]>(createHeaders(3));
  const [alignment, setAlignment] = useState<Alignment[]>(createAlignments(3));

  /* Output state */
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Import state */
  const [importCsv, setImportCsv] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Update cell ── */
  const updateCell = useCallback(
    (r: number, c: number, value: string) => {
      setData((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = value;
        return next;
      });
    },
    []
  );

  /* ── Update header ── */
  const updateHeader = useCallback(
    (c: number, value: string) => {
      setHeaderRow((prev) => {
        const next = [...prev];
        next[c] = value;
        return next;
      });
    },
    []
  );

  /* ── Toggle alignment ── */
  const setColumnAlignment = useCallback(
    (c: number, align: Alignment) => {
      setAlignment((prev) => {
        const next = [...prev];
        next[c] = align;
        return next;
      });
    },
    []
  );

  /* ── Add / Remove rows ── */
  const addRow = useCallback(() => {
    setData((prev) => [...prev, Array.from({ length: cols }, () => "")]);
    setRows((r) => r + 1);
  }, [cols]);

  const removeRow = useCallback(
    (index: number) => {
      if (rows <= 1) return;
      setData((prev) => prev.filter((_, i) => i !== index));
      setRows((r) => r - 1);
    },
    [rows]
  );

  /* ── Add / Remove columns ── */
  const addColumn = useCallback(() => {
    setHeaderRow((prev) => [...prev, `Header ${cols + 1}`]);
    setAlignment((prev) => [...prev, "left"]);
    setData((prev) => prev.map((row) => [...row, ""]));
    setCols((c) => c + 1);
  }, [cols]);

  const removeColumn = useCallback(
    (index: number) => {
      if (cols <= 1) return;
      setHeaderRow((prev) => prev.filter((_, i) => i !== index));
      setAlignment((prev) => prev.filter((_, i) => i !== index));
      setData((prev) => prev.map((row) => row.filter((_, i) => i !== index)));
      setCols((c) => c - 1);
    },
    [cols]
  );

  /* ── Generate Markdown ── */
  const generateMarkdown = useCallback(() => {
    /* Escape pipes in cell content */
    const esc = (s: string) => s.replace(/\|/g, "\\|");

    /* Calculate column widths for pretty-printing */
    const colWidths = Array.from({ length: cols }, (_, c) => {
      const headerLen = esc(headerRow[c]).length;
      const cellLens = data.map((row) => esc(row[c] ?? "").length);
      const alignLen = alignment[c] === "center" ? 5 : alignment[c] === "right" ? 4 : 4;
      return Math.max(headerLen, ...cellLens, alignLen);
    });

    /* Pad helper */
    const pad = (s: string, w: number) => s + " ".repeat(Math.max(0, w - s.length));

    /* Header line */
    const headerLine =
      "| " +
      headerRow.map((h, c) => pad(esc(h), colWidths[c])).join(" | ") +
      " |";

    /* Separator line with alignment markers */
    const sepLine =
      "| " +
      alignment
        .map((a, c) => {
          const w = colWidths[c];
          if (a === "center") return ":" + "-".repeat(Math.max(w - 2, 1)) + ":";
          if (a === "right") return "-".repeat(Math.max(w - 1, 1)) + ":";
          return ":" + "-".repeat(Math.max(w - 1, 1));
        })
        .map((s, c) => {
          const w = colWidths[c];
          return s.length < w ? s + "-".repeat(w - s.length) : s;
        })
        .join(" | ") +
      " |";

    /* Body rows */
    const bodyLines = data.map(
      (row) =>
        "| " +
        row.map((cell, c) => pad(esc(cell ?? ""), colWidths[c])).join(" | ") +
        " |"
    );

    const md = [headerLine, sepLine, ...bodyLines].join("\n");
    setOutput(md);
  }, [cols, headerRow, data, alignment]);

  /* ── Import from CSV ── */
  const importFromCsv = useCallback(() => {
    if (!importCsv.trim()) return;
    const lines = importCsv.trim().split("\n").filter((l) => l.trim());
    if (lines.length === 0) return;

    const parsed = lines.map((line) =>
      line.split(",").map((cell) => cell.trim())
    );

    const maxCols = Math.max(...parsed.map((r) => r.length));
    const normalised = parsed.map((r) => {
      while (r.length < maxCols) r.push("");
      return r;
    });

    const newHeaders = normalised[0] || createHeaders(maxCols);
    const newData = normalised.length > 1 ? normalised.slice(1) : [Array.from({ length: maxCols }, () => "")];

    setHeaderRow(newHeaders);
    setData(newData);
    setAlignment(createAlignments(maxCols));
    setRows(newData.length);
    setCols(maxCols);
    setShowImport(false);
    setImportCsv("");
  }, [importCsv]);

  /* ── Export to CSV ── */
  const exportCsv = useCallback(() => {
    const csvRows = [headerRow.join(","), ...data.map((row) => row.join(","))];
    const csvText = csvRows.join("\n");
    const blob = new Blob([csvText], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "table.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [headerRow, data]);

  /* ── Reset table ── */
  const resetTable = useCallback(() => {
    setRows(3);
    setCols(3);
    setData(createGrid(3, 3));
    setHeaderRow(createHeaders(3));
    setAlignment(createAlignments(3));
    setOutput("");
    setCopied(false);
  }, []);

  /* ── Clipboard / Download ── */
  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "table.md";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ── File upload (CSV) ── */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setImportCsv(text);
        setShowImport(true);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  /* ── Resize grid helpers ── */
  const handleRowsChange = (newRows: number) => {
    if (newRows < 1 || newRows > 50) return;
    if (newRows > rows) {
      const extra = Array.from({ length: newRows - rows }, () =>
        Array.from({ length: cols }, () => "")
      );
      setData((prev) => [...prev, ...extra]);
    } else {
      setData((prev) => prev.slice(0, newRows));
    }
    setRows(newRows);
  };

  const handleColsChange = (newCols: number) => {
    if (newCols < 1 || newCols > 20) return;
    if (newCols > cols) {
      const diff = newCols - cols;
      setHeaderRow((prev) => [
        ...prev,
        ...Array.from({ length: diff }, (_, i) => `Header ${cols + i + 1}`),
      ]);
      setAlignment((prev) => [
        ...prev,
        ...Array.from({ length: diff }, () => "left" as Alignment),
      ]);
      setData((prev) =>
        prev.map((row) => [...row, ...Array.from({ length: diff }, () => "")])
      );
    } else {
      setHeaderRow((prev) => prev.slice(0, newCols));
      setAlignment((prev) => prev.slice(0, newCols));
      setData((prev) => prev.map((row) => row.slice(0, newCols)));
    }
    setCols(newCols);
  };

  /* ── Render simple HTML preview ── */
  const renderPreview = () => {
    return (
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headerRow.map((h, c) => (
                <th
                  key={c}
                  className="px-4 py-2.5 font-semibold text-slate-900"
                  style={{
                    textAlign: alignment[c],
                  }}
                >
                  {h || <span className="text-slate-300">—</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className="px-4 py-2 text-slate-700"
                    style={{
                      textAlign: alignment[c],
                    }}
                  >
                    {cell || <span className="text-slate-300">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* ─── Render ─── */
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-600 py-16 lg:py-20">
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
            <span className="text-white">Markdown Table Generator</span>
          </nav>

          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 p-3 backdrop-blur-sm">
            <Table className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">
            Free Markdown Table Generator – Create &amp; Format Tables Online
          </h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">
            Build beautiful Markdown tables with a visual grid editor. Add rows,
            columns, set alignment, import CSV data, and copy ready-to-use
            GitHub Flavored Markdown — perfect for README files, documentation,
            and blog posts. Free, private, and instant.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
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
              GitHub Compatible
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              No Sign-Up
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Tool Section ── */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-12 space-y-6">
          {/* Row / Col controls + Import toggle */}
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Rows
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={rows}
                onChange={(e) => handleRowsChange(Number(e.target.value))}
                className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Columns
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={cols}
                onChange={(e) => handleColsChange(Number(e.target.value))}
                className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowImport((p) => !p)}
              className={`inline-flex h-[38px] items-center gap-1.5 rounded-xl border px-4 text-xs font-medium transition-colors ${
                showImport
                  ? "border-purple-300 bg-purple-50 text-purple-700"
                  : "border-slate-300 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              Import CSV
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-600 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload CSV File
            </button>
            <button
              onClick={resetTable}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          {/* CSV Import area */}
          {showImport && (
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3">
              <label className="block text-sm font-semibold text-slate-900">
                Paste CSV Data
              </label>
              <textarea
                value={importCsv}
                onChange={(e) => setImportCsv(e.target.value)}
                placeholder={
                  "Name, Age, City\nAlice, 30, Toronto\nBob, 25, Vancouver\nCharlie, 35, Montreal"
                }
                rows={5}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors font-mono"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={importFromCsv}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-purple-600 px-5 text-xs font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Import
                </button>
                <span className="text-xs text-slate-500">
                  First row becomes headers. Commas separate columns.
                </span>
              </div>
            </div>
          )}

          {/* Editable Grid Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full">
              {/* Header row */}
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-1.5 py-2 text-xs font-medium text-slate-400 w-10">
                    #
                  </th>
                  {headerRow.map((h, c) => (
                    <th key={c} className="px-1.5 py-2">
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => updateHeader(c, e.target.value)}
                        className="w-full min-w-[80px] rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 text-center focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
                        placeholder={`Header ${c + 1}`}
                      />
                    </th>
                  ))}
                </tr>
                {/* Alignment row */}
                <tr className="bg-slate-50 border-b border-slate-200">
                  <td className="px-1.5 py-1.5 text-[10px] text-slate-400 text-center">
                    Align
                  </td>
                  {alignment.map((a, c) => (
                    <td key={c} className="px-1.5 py-1.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setColumnAlignment(c, "left")}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                            a === "left"
                              ? "bg-purple-100 text-purple-700 border border-purple-300"
                              : "bg-white text-slate-400 border border-slate-200 hover:border-purple-200 hover:text-purple-500"
                          }`}
                          title="Left align"
                        >
                          <AlignLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setColumnAlignment(c, "center")}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                            a === "center"
                              ? "bg-purple-100 text-purple-700 border border-purple-300"
                              : "bg-white text-slate-400 border border-slate-200 hover:border-purple-200 hover:text-purple-500"
                          }`}
                          title="Center align"
                        >
                          <AlignCenter className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setColumnAlignment(c, "right")}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                            a === "right"
                              ? "bg-purple-100 text-purple-700 border border-purple-300"
                              : "bg-white text-slate-400 border border-slate-200 hover:border-purple-200 hover:text-purple-500"
                          }`}
                          title="Right align"
                        >
                          <AlignRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              {/* Body rows */}
              <tbody className="divide-y divide-slate-100">
                {data.map((row, r) => (
                  <tr key={r} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-1.5 py-1.5 text-xs font-medium text-slate-400 text-center">
                      {r + 1}
                    </td>
                    {row.map((cell, c) => (
                      <td key={c} className="px-1.5 py-1.5">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => updateCell(r, c, e.target.value)}
                          className="w-full min-w-[80px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
                          placeholder={`Row ${r + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Row / Column add / remove buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={addRow}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Row
            </button>
            <button
              onClick={() => removeRow(rows - 1)}
              disabled={rows <= 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="h-3.5 w-3.5" />
              Remove Last Row
            </button>
            <div className="mx-1 h-5 w-px bg-slate-200" />
            <button
              onClick={addColumn}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Column
            </button>
            <button
              onClick={() => removeColumn(cols - 1)}
              disabled={cols <= 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="h-3.5 w-3.5" />
              Remove Last Column
            </button>
          </div>

          {/* Generate button */}
          <div className="flex items-center gap-3">
            <button
              onClick={generateMarkdown}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-colors hover:bg-purple-700"
            >
              <Table className="h-4 w-4 flex-shrink-0" />
              <span>Generate Markdown</span>
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4 flex-shrink-0" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Stats bar */}
          {output && (
            <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm text-purple-800">
              <Table className="h-4 w-4 flex-shrink-0" />
              <span>
                <strong className="font-semibold">{rows}</strong>{" "}
                {rows === 1 ? "row" : "rows"} ×{" "}
                <strong className="font-semibold">{cols}</strong>{" "}
                {cols === 1 ? "column" : "columns"}
              </span>
            </div>
          )}

          {/* Output textarea */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Generated Markdown
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Click &quot;Generate Markdown&quot; to create your table…"
                rows={10}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-mono"
              />
              {output && (
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Markdown
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-purple-300 hover:text-purple-700 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download .md
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview toggle */}
          {output && (
            <div className="space-y-3">
              <button
                onClick={() => setShowPreview((p) => !p)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium transition-colors ${
                  showPreview
                    ? "border-purple-300 bg-purple-50 text-purple-700"
                    : "border-slate-300 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    showPreview ? "rotate-180" : ""
                  }`}
                />
                {showPreview ? "Hide Preview" : "Show HTML Preview"}
              </button>
              {showPreview && renderPreview()}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. How-To ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              How to Generate a Markdown Table Online
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Four simple steps to create perfectly formatted Markdown tables
              using CoderDesign&apos;s free Markdown Table Generator.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howToSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-700">
                  {s.step}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Features ── */}
      <section className="border-t border-slate-200 bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Why Use Our Free Markdown Table Generator?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              A powerful, privacy-first Markdown table builder with a visual
              grid editor, CSV import, column alignment, and zero limitations —
              built for developers and technical writers.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Use Cases ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
              Real-World Use Cases
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              See how the Markdown Table Generator handles common table-creation
              tasks — from GitHub READMEs to CSV conversions.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <uc.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {uc.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {uc.desc}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 font-mono text-red-700">
                    <span className="font-semibold text-red-500">
                      Before:{" "}
                    </span>
                    <span className="whitespace-pre-line">{uc.before}</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2 font-mono text-green-700 whitespace-pre-line">
                    <span className="font-semibold text-green-500">
                      After:{" "}
                    </span>
                    {uc.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-18">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 lg:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
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
      <RelatedTools currentSlug="markdown-table-generator" />

      {/* ── 8. CTA ── */}
      <ToolCta />

      {/* ── 9. Footer ── */}
      <FooterSection />
    </div>
  );
}
