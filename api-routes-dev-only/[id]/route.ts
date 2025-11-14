import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop(); // Extract slug from URL
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Path to the blog directory
    const blogDir = path.join(process.cwd(), "app", "blog", slug);

    // Check if blog directory exists
    if (!fs.existsSync(blogDir)) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete the entire blog directory (this removes it from indexing)
    fs.rmSync(blogDir, { recursive: true, force: true });

    return NextResponse.json({
      message: "Blog deleted successfully and removed from indexing",
      success: true,
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
