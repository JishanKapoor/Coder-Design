"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import axios from "axios";
import Link from "next/link";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Lock, Upload, FileText, User, Tag, Image as ImageIcon, Link2 } from "lucide-react";

export default function UploadBlog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Full-Stack Development");
  const [image, setImage] = useState<File | null>(null);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentAdminPassword, setCurrentAdminPassword] = useState("jishan1010");

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !shortDescription || !description) {
      return alert("All fields required!");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("customSlug", customSlug);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("short_description", shortDescription);
      formData.append("description", description);
      if (image) formData.append("image", image);
      formData.append("createdAt", new Date().toISOString());

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: () => true,
      });

      if (res.status === 409) {
        alert(res.data?.error || "Slug already exists. Pick a different one.");
        setLoading(false);
        return;
      }
      if (res.status >= 400) {
        alert(res.data?.error || "Upload failed.");
        setLoading(false);
        return;
      }

      alert("✅ Blog uploaded successfully!");
      setTitle("");
      setCustomSlug("");
      setAuthor("");
      setCategory("Full-Stack Development");
      setShortDescription("");
      setDescription("");
      setImage(null);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.error || "❌ Failed to upload blog.");
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
                  Enter password to upload blog posts
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="bg-gradient-to-b from-violet-50 to-white pb-8 pt-24 sm:pb-16 sm:pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
              Admin Panel
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Upload Blog Post
            </h1>
            <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
              Create and publish new articles for your audience
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
          <div className="mb-4 flex justify-end sm:mb-6">
            <Link
              href="/manage-blogs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-800 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base"
            >
              <FileText className="h-4 w-4" />
              Manage Blogs
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 sm:mb-3">
                  <ImageIcon className="h-4 w-4 text-violet-600" />
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border-2 border-violet-200 p-2 text-sm text-slate-900 transition-all file:mr-2 file:rounded-lg file:border-0 file:bg-violet-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-200 sm:p-3 sm:text-base sm:file:mr-4 sm:file:px-4 sm:file:py-2"
                />
                {image && (
                  <div className="mt-3 overflow-hidden rounded-lg border-2 border-violet-200 sm:mt-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-48 w-full object-cover sm:h-64"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 sm:mb-3">
                  <FileText className="h-4 w-4 text-violet-600" />
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-sm text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex flex-col gap-1 text-sm font-semibold text-slate-700 sm:mb-3 sm:flex-row sm:items-center sm:gap-2">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-violet-600" />
                    Custom URL Slug
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    (optional - leave blank to auto-generate from title)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., my-custom-url-slug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-sm text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-4 sm:text-base"
                />
                {customSlug && (
                  <p className="mt-2 break-all text-xs text-slate-600 sm:text-sm">
                    URL will be:{" "}
                    <span className="font-mono text-violet-600">/blog/{customSlug}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 sm:mb-3">
                  <User className="h-4 w-4 text-violet-600" />
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-sm text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-4 sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 sm:mb-3">
                  <Tag className="h-4 w-4 text-violet-600" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-sm text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-4 sm:text-base"
                >
                  <option value="Full-Stack Development">Full-Stack Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="AI SEO & AEO Services">AI SEO & AEO Services</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 sm:mb-3">
                  Short Description
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full rounded-lg border-2 border-violet-200 p-3 text-sm text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:p-4 sm:text-base"
                  placeholder="Enter a short description..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 sm:mb-3">
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

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:py-5 sm:text-base"
              >
                <Upload className="h-5 w-5" />
                {loading ? "Uploading..." : "Upload Blog Post"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}