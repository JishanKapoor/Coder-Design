import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import { prisma } from "../../../lib/prisma";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();

    const title = data.get("title")?.toString() || "";
    const customSlug = data.get("customSlug")?.toString() || "";
    const slug = data.get("slug")?.toString() || ""; // For edit mode
    const author = data.get("author")?.toString() || "";
    const category = data.get("category")?.toString() || "";
    const shortDescription = data.get("short_description")?.toString() || "";
    const description = data.get("description")?.toString() || "";
    const imageFile = data.get("image") as File | null;
    const existingImage = data.get("existingImage")?.toString() || "";
    const isEdit = data.get("isEdit")?.toString() === "true";

    if (!title || !author || !category || !shortDescription || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save image if provided
    let imagePath: string | null = existingImage || null;
    if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const safeName = imageFile.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const fileName = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

  // Determine the slug
    const finalSlug = isEdit ? slug : (customSlug ? slugify(customSlug) : (slugify(title) || `post-${Date.now()}`));
    const postDir = path.join(process.cwd(), "app", "blog", finalSlug);
    // Enforce unique slug when creating new blog
    if (!isEdit && fs.existsSync(postDir)) {
      return NextResponse.json({ error: "Slug already exists. Choose a different custom slug." }, { status: 409 });
    }
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

    const themeByCategory: Record<string, { gradient: string }> = {
      "Full-Stack Development": { gradient: "from-violet-600 to-indigo-700" },
      "Mobile App Development": { gradient: "from-blue-600 to-cyan-700" },
      "AI & Machine Learning": { gradient: "from-purple-600 to-pink-600" },
      "AI SEO & AEO Services": { gradient: "from-emerald-600 to-teal-700" },
    };
    const theme = themeByCategory[category as keyof typeof themeByCategory] || themeByCategory["Full-Stack Development"];

  const createdAtIso = new Date().toISOString();
  const readTime = [6, 7, 8][Math.floor(Math.random() * 3)];

    // Escape for safe embedding in TSX text nodes
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeTitle = esc(title);
    const safeAuthor = esc(author);
    const safeCategory = esc(category);
    
  // Convert markdown to HTML
  const htmlContent = marked(description, { breaks: true, gfm: true });

    const contentTsx = [
      '"use client";',
      'import { Navigation } from "../../components/Navigation";',
      'import { FooterSection } from "../../components/FooterSection";',
      'import { Calendar, Clock, User, ArrowLeft } from "lucide-react";',
      'import { Button } from "../../components/ui/button";',
      'import Link from "next/link";',
      'import "../blog-content.css";',
      '',
      'export default function BlogPost() {',
      '  return (',
      '    <div className="min-h-screen bg-white">',
      '      <Navigation />',
      `      <section className="relative overflow-hidden bg-gradient-to-br ${theme.gradient} py-20 lg:py-28">`,
      '        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">',
      '          <div>',
      '            <div className="mb-8">',
      '              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">',
      '                <ArrowLeft className="h-4 w-4" /> Back to Blogs',
      '              </Link>',
      '            </div>',
      `            <div className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">`,
      `              <span className="text-sm text-white">${safeCategory}</span>`,
      '            </div>',
      `            <h1 className="mb-6 text-white">${safeTitle}</h1>`,
      '            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">',
      '              <div className="flex items-center gap-2">',
      '                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">',
      '                  <User className="h-5 w-5" />',
      '                </div>',
      '                <div>',
      `                  <div className="text-sm">${safeAuthor}</div>`,
      '                  <div className="text-xs text-white/70">Contributor</div>',
      '                </div>',
      '              </div>',
      '              <div className="flex items-center gap-2">',
      '                <Calendar className="h-5 w-5" />',
      `                <span>${new Date(createdAtIso).toDateString()}</span>`,
      '              </div>',
      '              <div className="flex items-center gap-2">',
      '                <Clock className="h-5 w-5" />',
      `                <span>${readTime} min read</span>`,
      '              </div>',
      '            </div>',
      '            <div className="flex gap-3">',
      '              <Button className="gap-2 bg-white text-violet-600 hover:bg-white/90" asChild>',
      '                <Link href="/contact">Contact Us</Link>',
      '              </Button>',
      '            </div>',
      '          </div>',
      '        </div>',
      '      </section>',
      '',
      imagePath ? `      <div className="mx-auto max-w-4xl px-6 lg:px-12 -mt-12">` : '',
      imagePath ? `        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border-4 border-white">` : '',
      imagePath ? `          <img src="${imagePath}" alt="${safeTitle}" className="w-full h-full object-cover" />` : '',
      imagePath ? '        </div>' : '',
      imagePath ? '      </div>' : '',
      imagePath ? '' : '',
      '      <article className="bg-white py-16 lg:py-20">',
      '        <div className="mx-auto max-w-4xl px-6 lg:px-12">',
      `          <div className="blog-content" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlContent)} }} />`,
      '        </div>',
      '      </article>',
      '',
      `      <section className="bg-gradient-to-br ${theme.gradient} py-20">`,
      '        <div className="mx-auto max-w-4xl px-6 lg:px-12">',
      '          <div className="text-center">',
      '            <h2 className="mb-6 text-white text-3xl font-bold">Ready to Transform Your Business?</h2>',
      `            <p className="mb-8 text-lg text-white/90">Let's discuss how we can help bring your vision to life.</p>`,
      '            <div className="flex flex-wrap items-center justify-center gap-4">',
      '              <Button size="lg" variant="secondary" asChild>',
      '                <Link href="/contact">Get Started</Link>',
      '              </Button>',
      '              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/20 hover:text-white" asChild>',
      '                <Link href="/contact">Contact Us</Link>',
      '              </Button>',
      '            </div>',
      '          </div>',
      '        </div>',
      '      </section>',
      '',
      '      <FooterSection />',
      '    </div>',
      '  );',
      '}',
    ].filter(line => line !== '').join('\n');

    const pageTsx = [
      'import Content from "./content";',
      'export const dynamic = "force-static";',
      'export default function Page(){ return <Content /> }',
    ].join('\n');

  fs.writeFileSync(path.join(postDir, "content.tsx"), contentTsx, "utf-8");
  fs.writeFileSync(path.join(postDir, "page.tsx"), pageTsx, "utf-8");
  // Persist original markdown for editing later
  fs.writeFileSync(path.join(postDir, "content.md"), description, "utf-8");
    
    // Also persist to database (DB-first for admin and edits)
    // Store markdown in DB for reliable retrieval during edits
    await prisma.blog.upsert({
      where: { slug: finalSlug },
      update: {
        title,
        author,
        category,
        description, // markdown
        short_description: shortDescription,
        image: imagePath || null,
        updatedAt: new Date(),
      },
      create: {
        slug: finalSlug,
        title,
        author,
        category,
        description, // markdown
        short_description: shortDescription,
        image: imagePath || null,
        createdAt: new Date(createdAtIso),
      },
    });
    
    // Read existing meta.json to preserve id and readTime if editing
    let existingMeta: any = {};
    const metaPath = path.join(postDir, "meta.json");
    if (isEdit && fs.existsSync(metaPath)) {
      try {
        existingMeta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      } catch {}
    }

    const blogId = existingMeta.id || Date.now();
    const readTimeValue = existingMeta.readTime || readTime;
    
    const meta = {
      id: blogId,
      slug: finalSlug,
      title,
      author,
      category,
      image: imagePath,
      createdAt: existingMeta.createdAt || createdAtIso,
      short_description: shortDescription,
      readTime: readTimeValue,
    };
    fs.writeFileSync(path.join(postDir, "meta.json"), JSON.stringify(meta, null, 2), "utf-8");

    return NextResponse.json({ success: true, slug: finalSlug, id: blogId });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err?.message || "Failed to upload blog" }, { status: 500 });
  }
};
