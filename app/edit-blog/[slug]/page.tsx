"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import axios from "axios";
import Link from "next/link";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import { Lock, Upload, FileText, User, Tag, Image as ImageIcon, Link2, ArrowLeft } from "lucide-react";
import TurndownService from "turndown";

const turndownClient = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
const HTML_REGEX = /dangerouslySetInnerHTML=\{\{ __html: ("[\s\S]*?") \}\}/;

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Full-Stack Development");
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentAdminPassword, setCurrentAdminPassword] = useState("jishan1010");

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadBlogData();
    } else {
      setLoadingData(false);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === currentAdminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      loadBlogData();
    } else if (password === "floxy1010") {
      setShowPasswordChange(true);
    } else {
      alert("Incorrect password!");
      setPassword("");
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    if (newPassword === "floxy1010") {
      alert("Cannot use floxy1010 as admin password!");
      return;
    }
    setCurrentAdminPassword(newPassword);
    alert("✅ Admin password changed successfully!");
    setShowPasswordChange(false);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const fetchMarkdownContent = async () => {
    try {
      const mdRes = await fetch(`/api/blog/${slug}/markdown`);
      if (mdRes.ok) {
        const data = await mdRes.json();
        if (data.markdown) {
          return data.markdown as string;
        }
      }
    } catch (err) {
      console.log("Markdown API fetch failed", err);
    }

    try {
      const contentRes = await fetch(`/blog/${slug}/content.tsx`);
      if (contentRes.ok) {
        const contentText = await contentRes.text();
        const match = contentText.match(HTML_REGEX);
        if (match && match[1]) {
          try {
            const htmlString = JSON.parse(match[1]);
            return turndownClient.turndown(htmlString);
          } catch (err) {
            console.log("Failed to parse HTML fallback", err);
          }
        }
      }
    } catch (err) {
      console.log("Failed to fetch TSX fallback", err);
    }

    return "";
  };

  const loadBlogData = async () => {
    try {
  const res = await fetch("/api/fetch");
  const blogs = await res.json();
  const blog = blogs.find((b: any) => b.slug === slug);
      
      if (blog) {
        setTitle(blog.title);
        setAuthor(blog.author);
        setCategory(blog.category);
        setExistingImage(blog.image || "");
        setShortDescription(blog.short_description);
        
        const markdownContent = await fetchMarkdownContent();
        setDescription(markdownContent);
      } else {
        alert("Blog not found!");
        router.push("/manage-blogs");
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      alert("Failed to load blog data");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !shortDescription || !description) {
      return alert("All fields required!");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug); // Keep the same slug
      formData.append("author", author);
      formData.append("category", category);
      formData.append("short_description", shortDescription);
      formData.append("description", description);
      if (image) formData.append("image", image);
      formData.append("existingImage", existingImage);
      formData.append("createdAt", new Date().toISOString());
      formData.append("isEdit", "true");

      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Blog updated successfully!");
      router.push("/manage-blogs");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center px-6" style={{ minHeight: "calc(100vh - 300px)", paddingTop: "8rem", paddingBottom: "4rem" }}>
          <div className="w-full max-w-md">
            {showPasswordChange ? (
              <div className="rounded-2xl border border-purple-200 bg-white p-8 shadow-xl lg:p-10">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-5">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="mb-2 text-center text-2xl font-bold text-slate-900 lg:text-3xl">
                  Change Admin Password
                </h1>
                <p className="mb-8 text-center text-slate-600">
                  Set a new password for admin access
                </p>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border-2 border-purple-200 p-4 text-slate-900 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border-2 border-purple-200 p-4 text-slate-900 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      className="flex-1 rounded-lg border-2 border-slate-200 py-4 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-4 font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl lg:p-10">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-gradient-to-br from-violet-600 to-purple-700 p-5">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="mb-2 text-center text-2xl font-bold text-slate-900 lg:text-3xl">
                  Admin Access
                </h1>
                <p className="mb-8 text-center text-slate-600">
                  Enter password to edit blog posts
                </p>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border-2 border-violet-200 p-4 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 py-4 font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-800 hover:shadow-xl"
                  >
                    Access Admin Panel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center" style={{ minHeight: "calc(100vh - 400px)" }}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mb-4"></div>
            <p className="text-lg text-slate-600">Loading blog data...</p>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="mb-8">
            <Link 
              href="/manage-blogs"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Manage Blogs
            </Link>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
              Admin Panel
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
              Edit Blog Post
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Update your article details and content
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Current Image */}
              {existingImage && (
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ImageIcon className="h-4 w-4 text-violet-600" />
                    Current Image
                  </label>
                  <div className="overflow-hidden rounded-lg border-2 border-violet-200 aspect-video">
                    <img
                      src={existingImage}
                      alt="Current"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* New Image Upload */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ImageIcon className="h-4 w-4 text-violet-600" />
                  {existingImage ? "Replace Image (optional)" : "Blog Image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-slate-900 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-violet-100 file:px-4 file:py-2 file:font-semibold file:text-violet-700 hover:file:bg-violet-200"
                />
                {image && (
                  <div className="mt-4 overflow-hidden rounded-lg border-2 border-violet-200 aspect-video">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FileText className="h-4 w-4 text-violet-600" />
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-4 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              {/* Slug Display */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Link2 className="h-4 w-4 text-violet-600" />
                  URL Slug (cannot be changed)
                </label>
                <input
                  type="text"
                  value={slug}
                  disabled
                  className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 p-4 text-slate-500"
                />
              </div>

              {/* Author */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="h-4 w-4 text-violet-600" />
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-4 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Tag className="h-4 w-4 text-violet-600" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-4 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
                >
                  <option value="Full-Stack Development">Full-Stack Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="AI SEO & AEO Services">AI SEO & AEO Services</option>
                </select>
              </div>

              {/* Short Description */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Short Description
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-4 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  placeholder="Enter a short description..."
                  rows={3}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <div className="overflow-hidden rounded-lg border-2 border-violet-200">
                  <SimpleMDE
                    value={description}
                    onChange={setDescription}
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 py-5 font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload className="h-5 w-5" />
                {loading ? "Updating..." : "Update Blog Post"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
