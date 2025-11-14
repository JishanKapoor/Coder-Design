-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "image" TEXT,
    "readTime" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Blog" ("author", "category", "createdAt", "description", "id", "image", "short_description", "slug", "title", "updatedAt") SELECT "author", "category", "createdAt", "description", "id", "image", "short_description", "slug", "title", "updatedAt" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
