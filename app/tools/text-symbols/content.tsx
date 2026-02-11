"use client";
import { useState, useMemo, useCallback } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Globe, Search, Check } from "lucide-react";
import { RelatedTools, ToolFaq, ToolCta } from "../shared";

/* ── Symbol categories ── */
const CATEGORIES: { name: string; color: string; symbols: { char: string; name: string }[] }[] = [
  {
    name: "Arrows",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    symbols: [
      { char: "←", name: "Left Arrow" }, { char: "→", name: "Right Arrow" }, { char: "↑", name: "Up Arrow" }, { char: "↓", name: "Down Arrow" },
      { char: "↔", name: "Left Right Arrow" }, { char: "↕", name: "Up Down Arrow" }, { char: "⇐", name: "Double Left" }, { char: "⇒", name: "Double Right" },
      { char: "⇑", name: "Double Up" }, { char: "⇓", name: "Double Down" }, { char: "⇔", name: "Double Left Right" }, { char: "⇕", name: "Double Up Down" },
      { char: "↗", name: "NE Arrow" }, { char: "↘", name: "SE Arrow" }, { char: "↙", name: "SW Arrow" }, { char: "↖", name: "NW Arrow" },
      { char: "↩", name: "Left Hook" }, { char: "↪", name: "Right Hook" }, { char: "↻", name: "Clockwise" }, { char: "↺", name: "Counter-Clockwise" },
      { char: "➜", name: "Heavy Right" }, { char: "➤", name: "Triangle Right" }, { char: "➡", name: "Right Arrow Emoji" }, { char: "⬅", name: "Left Arrow Emoji" },
      { char: "⬆", name: "Up Arrow Emoji" }, { char: "⬇", name: "Down Arrow Emoji" }, { char: "↳", name: "Down Right" }, { char: "↱", name: "Up Right" },
    ],
  },
  {
    name: "Math",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    symbols: [
      { char: "±", name: "Plus Minus" }, { char: "×", name: "Multiplication" }, { char: "÷", name: "Division" }, { char: "≠", name: "Not Equal" },
      { char: "≈", name: "Approximately" }, { char: "∞", name: "Infinity" }, { char: "∑", name: "Summation" }, { char: "∏", name: "Product" },
      { char: "√", name: "Square Root" }, { char: "∫", name: "Integral" }, { char: "≤", name: "Less or Equal" }, { char: "≥", name: "Greater or Equal" },
      { char: "∂", name: "Partial Derivative" }, { char: "∆", name: "Delta/Increment" }, { char: "∇", name: "Nabla" }, { char: "∈", name: "Element of" },
      { char: "∉", name: "Not Element" }, { char: "∅", name: "Empty Set" }, { char: "∪", name: "Union" }, { char: "∩", name: "Intersection" },
      { char: "⊂", name: "Subset" }, { char: "⊃", name: "Superset" }, { char: "∀", name: "For All" }, { char: "∃", name: "There Exists" },
      { char: "∴", name: "Therefore" }, { char: "∵", name: "Because" }, { char: "π", name: "Pi" }, { char: "θ", name: "Theta" },
      { char: "α", name: "Alpha" }, { char: "β", name: "Beta" }, { char: "γ", name: "Gamma" }, { char: "λ", name: "Lambda" },
    ],
  },
  {
    name: "Currency",
    color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    symbols: [
      { char: "$", name: "Dollar" }, { char: "€", name: "Euro" }, { char: "£", name: "Pound" }, { char: "¥", name: "Yen/Yuan" },
      { char: "₹", name: "Indian Rupee" }, { char: "₿", name: "Bitcoin" }, { char: "¢", name: "Cent" }, { char: "₩", name: "Korean Won" },
      { char: "₽", name: "Russian Ruble" }, { char: "₱", name: "Philippine Peso" }, { char: "₫", name: "Vietnamese Dong" }, { char: "₺", name: "Turkish Lira" },
      { char: "₴", name: "Ukrainian Hryvnia" }, { char: "₸", name: "Kazakhstani Tenge" }, { char: "₦", name: "Nigerian Naira" }, { char: "₡", name: "Costa Rican Colón" },
    ],
  },
  {
    name: "Stars & Shapes",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    symbols: [
      { char: "★", name: "Black Star" }, { char: "☆", name: "White Star" }, { char: "●", name: "Black Circle" }, { char: "○", name: "White Circle" },
      { char: "■", name: "Black Square" }, { char: "□", name: "White Square" }, { char: "▲", name: "Black Up Triangle" }, { char: "△", name: "White Up Triangle" },
      { char: "▼", name: "Black Down Triangle" }, { char: "▽", name: "White Down Triangle" }, { char: "◆", name: "Black Diamond" }, { char: "◇", name: "White Diamond" },
      { char: "♠", name: "Spade" }, { char: "♣", name: "Club" }, { char: "♥", name: "Heart" }, { char: "♦", name: "Diamond" },
      { char: "♤", name: "White Spade" }, { char: "♧", name: "White Club" }, { char: "♡", name: "White Heart" }, { char: "♢", name: "White Diamond Suit" },
      { char: "✦", name: "Four-Point Star" }, { char: "✧", name: "White Four-Point" }, { char: "✪", name: "Circled Star" }, { char: "✫", name: "Open Star" },
      { char: "⬟", name: "Pentagon" }, { char: "⬡", name: "Hexagon" }, { char: "⭐", name: "Star Emoji" }, { char: "❤", name: "Heart Emoji" },
    ],
  },
  {
    name: "Bullets & Lists",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    symbols: [
      { char: "•", name: "Bullet" }, { char: "◦", name: "White Bullet" }, { char: "‣", name: "Triangular Bullet" }, { char: "⁃", name: "Hyphen Bullet" },
      { char: "▪", name: "Small Black Square" }, { char: "▸", name: "Right Triangle" }, { char: "►", name: "Right Pointer" }, { char: "▹", name: "White Right Triangle" },
      { char: "◉", name: "Fisheye" }, { char: "◎", name: "Bullseye" }, { char: "⊙", name: "Circled Dot" }, { char: "⊚", name: "Circled Ring" },
      { char: "‐", name: "Hyphen" }, { char: "–", name: "En Dash" }, { char: "—", name: "Em Dash" }, { char: "―", name: "Horizontal Bar" },
      { char: "✓", name: "Check Mark" }, { char: "✔", name: "Heavy Check" }, { char: "✗", name: "Ballot X" }, { char: "✘", name: "Heavy Ballot X" },
    ],
  },
  {
    name: "Lines & Borders",
    color: "bg-slate-100 border-slate-300 hover:border-slate-500",
    symbols: [
      { char: "─", name: "Horizontal Line" }, { char: "│", name: "Vertical Line" }, { char: "┌", name: "Top Left Corner" }, { char: "┐", name: "Top Right Corner" },
      { char: "└", name: "Bottom Left" }, { char: "┘", name: "Bottom Right" }, { char: "├", name: "Left Tee" }, { char: "┤", name: "Right Tee" },
      { char: "┬", name: "Top Tee" }, { char: "┴", name: "Bottom Tee" }, { char: "┼", name: "Cross" }, { char: "═", name: "Double Horizontal" },
      { char: "║", name: "Double Vertical" }, { char: "╔", name: "Double Top Left" }, { char: "╗", name: "Double Top Right" }, { char: "╚", name: "Double Bottom Left" },
      { char: "╝", name: "Double Bottom Right" }, { char: "╠", name: "Double Left Tee" }, { char: "╣", name: "Double Right Tee" }, { char: "╦", name: "Double Top Tee" },
      { char: "╩", name: "Double Bottom Tee" }, { char: "╬", name: "Double Cross" }, { char: "▀", name: "Upper Half Block" }, { char: "▄", name: "Lower Half Block" },
      { char: "█", name: "Full Block" }, { char: "░", name: "Light Shade" }, { char: "▒", name: "Medium Shade" }, { char: "▓", name: "Dark Shade" },
    ],
  },
  {
    name: "Punctuation & Legal",
    color: "bg-red-50 border-red-200 hover:border-red-400",
    symbols: [
      { char: "†", name: "Dagger" }, { char: "‡", name: "Double Dagger" }, { char: "§", name: "Section" }, { char: "¶", name: "Pilcrow" },
      { char: "©", name: "Copyright" }, { char: "®", name: "Registered" }, { char: "™", name: "Trademark" }, { char: "°", name: "Degree" },
      { char: "′", name: "Prime" }, { char: "″", name: "Double Prime" }, { char: "‴", name: "Triple Prime" }, { char: "⁂", name: "Asterism" },
      { char: "※", name: "Reference Mark" }, { char: "‽", name: "Interrobang" }, { char: "⁇", name: "Double Question" }, { char: "⁈", name: "Question Exclamation" },
      { char: "…", name: "Ellipsis" }, { char: "«", name: "Left Guillemet" }, { char: "»", name: "Right Guillemet" }, { char: "‹", name: "Left Single Guillemet" },
    ],
  },
  {
    name: "Music",
    color: "bg-pink-50 border-pink-200 hover:border-pink-400",
    symbols: [
      { char: "♩", name: "Quarter Note" }, { char: "♪", name: "Eighth Note" }, { char: "♫", name: "Beamed Notes" }, { char: "♬", name: "Beamed Sixteenths" },
      { char: "♭", name: "Flat" }, { char: "♮", name: "Natural" }, { char: "♯", name: "Sharp" }, { char: "🎵", name: "Music Notes" },
      { char: "🎶", name: "Singing Notes" }, { char: "🎼", name: "Musical Score" }, { char: "🎹", name: "Piano" }, { char: "🎸", name: "Guitar" },
    ],
  },
  {
    name: "Weather & Nature",
    color: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
    symbols: [
      { char: "☀", name: "Sun" }, { char: "☁", name: "Cloud" }, { char: "☂", name: "Umbrella" }, { char: "☃", name: "Snowman" },
      { char: "⚡", name: "Lightning" }, { char: "❄", name: "Snowflake" }, { char: "☾", name: "Crescent Moon" }, { char: "☽", name: "First Quarter Moon" },
      { char: "🌙", name: "Crescent Moon Emoji" }, { char: "🌟", name: "Glowing Star" }, { char: "🌈", name: "Rainbow" }, { char: "🔥", name: "Fire" },
      { char: "💧", name: "Droplet" }, { char: "🌊", name: "Wave" }, { char: "🍃", name: "Leaves" }, { char: "🌸", name: "Cherry Blossom" },
    ],
  },
  {
    name: "Miscellaneous",
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
    symbols: [
      { char: "☎", name: "Telephone" }, { char: "✂", name: "Scissors" }, { char: "✈", name: "Airplane" }, { char: "✉", name: "Envelope" },
      { char: "☮", name: "Peace" }, { char: "☯", name: "Yin Yang" }, { char: "⚛", name: "Atom" }, { char: "⚙", name: "Gear" },
      { char: "⚠", name: "Warning" }, { char: "⚡", name: "High Voltage" }, { char: "⚔", name: "Crossed Swords" }, { char: "⚖", name: "Balance Scale" },
      { char: "⚜", name: "Fleur-de-lis" }, { char: "⚫", name: "Black Circle" }, { char: "⚪", name: "White Circle" }, { char: "⭕", name: "Heavy Circle" },
      { char: "❌", name: "Cross Mark" }, { char: "❗", name: "Exclamation" }, { char: "❓", name: "Question Mark" }, { char: "💡", name: "Light Bulb" },
      { char: "🔗", name: "Link" }, { char: "🔒", name: "Lock" }, { char: "🔓", name: "Unlock" }, { char: "⏳", name: "Hourglass" },
    ],
  },
];

export default function TextSymbolsTool() {
  const [search, setSearch] = useState("");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) {
      if (activeCategory) return CATEGORIES.filter((c) => c.name === activeCategory);
      return CATEGORIES;
    }
    const q = search.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      symbols: cat.symbols.filter((s) => s.char.includes(search) || s.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.symbols.length > 0);
  }, [search, activeCategory]);

  const totalSymbols = useMemo(() => CATEGORIES.reduce((sum, c) => sum + c.symbols.length, 0), []);

  const copySymbol = useCallback(async (char: string) => {
    await navigator.clipboard.writeText(char).catch(() => {});
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1500);
  }, []);

  const faqs = [
    { question: "How do I copy a symbol?", answer: "Simply click on any symbol in the grid and it will be instantly copied to your clipboard. You'll see a brief 'Copied!' confirmation." },
    { question: "Will these symbols work on social media?", answer: "Yes! All these symbols are standard Unicode characters and work on virtually all modern platforms including Instagram, Twitter/X, Facebook, WhatsApp, and more." },
    { question: "Can I search for specific symbols?", answer: "Yes, use the search bar to filter symbols by name. For example, search 'arrow' to find all arrow symbols, or 'heart' for heart-related characters." },
    { question: "What's the difference between symbols and emojis?", answer: "Symbols are simpler Unicode characters that render consistently across platforms. Emojis are more complex and may look different on different devices. This tool includes both." },
    { question: "Is my data private?", answer: "Yes. This tool runs entirely in your browser — nothing is sent to any server." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 py-14 lg:py-18">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} /></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Text Symbols</span>
          </nav>
          <h1 className="mb-3 text-2xl font-bold text-white lg:text-4xl">Text Symbols &amp; Special Characters</h1>
          <p className="max-w-2xl text-white/90 leading-relaxed">Browse and copy {totalSymbols}+ special characters, symbols, emojis, and Unicode characters organized by category. Click any symbol to copy.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" />100% Private</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" />Instant Copy</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />Any Device</span>
          </div>
        </div>
      </section>

      {/* Tool UI */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search symbols by name (e.g., arrow, heart, star)..." className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveCategory(null)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${!activeCategory ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat.name} onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat.name ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-600 hover:border-violet-200"}`}>{cat.name}</button>
            ))}
          </div>

          {/* Copied Toast */}
          {copiedChar && (
            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
                <Check className="h-4 w-4 text-green-400" />
                Copied &ldquo;{copiedChar}&rdquo; to clipboard!
              </div>
            </div>
          )}

          {/* Symbol Grid by Category */}
          {filteredCategories.map((cat) => (
            <div key={cat.name}>
              <h2 className="mb-3 text-lg font-bold text-slate-900">{cat.name} <span className="text-sm font-normal text-slate-400">({cat.symbols.length})</span></h2>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
                {cat.symbols.map((sym) => (
                  <button
                    key={`${cat.name}-${sym.char}-${sym.name}`}
                    onClick={() => copySymbol(sym.char)}
                    title={`${sym.name} — Click to copy`}
                    className={`group relative flex h-12 w-full items-center justify-center rounded-lg border text-xl transition-all ${cat.color} ${copiedChar === sym.char ? "scale-95 ring-2 ring-green-400" : "hover:scale-105 hover:shadow-md"}`}
                  >
                    <span className="select-none">{sym.char}</span>
                    <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">{sym.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">No symbols found for &ldquo;{search}&rdquo;. Try a different search term.</div>
          )}
        </div>
      </section>

      <ToolFaq faqs={faqs} />
      <RelatedTools currentSlug="text-symbols" />
      <ToolCta />
      <FooterSection />
    </div>
  );
}
