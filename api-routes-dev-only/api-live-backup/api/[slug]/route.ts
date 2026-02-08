import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 1. Read meta.json before deleting (to find image path)
    const blogDir = path.join(process.cwd(), "app", "blog", slug);
    let imagePath: string | null = null;
    const metaPath = path.join(blogDir, "meta.json");
    if (fs.existsSync(metaPath)) {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
        if (meta.image) {
          imagePath = path.join(process.cwd(), "public", meta.image);
        }
      } catch {
        // Ignore meta read errors
      }
    }

    // 2. Delete from Prisma database
    try {
      await prisma.blog.delete({
        where: { slug },
      });
    } catch (dbError: any) {
      // Record might not exist in DB — that's OK, continue with filesystem cleanup
      console.log(`Blog "${slug}" not found in database (may be filesystem-only):`, dbError.message);
    }

    // 3. Delete blog directory from filesystem
    if (fs.existsSync(blogDir)) {
      fs.rmSync(blogDir, { recursive: true, force: true });
    }

    // 4. Delete uploaded image if it exists
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return NextResponse.json({ success: true, message: `Blog "${slug}" deleted successfully` });
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog", details: error.message },
      { status: 500 }
    );
  }
}
