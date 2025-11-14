"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Trash2, Upload, FileText, Calendar, User, Tag, Image as ImageIcon, ArrowLeft, Edit, Lock, Clock } from "lucide-react";

export default function ManageBlogs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentAdminPassword, setCurrentAdminPassword] = useState("jishan1010");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchBlogs();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === currentAdminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/fetch");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog.slug !== slug));
        alert("✅ Blog deleted successfully!");
      } else {
        alert("❌ Failed to delete blog");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting blog");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
  }, [isAuthenticated]);

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
                  Enter password to manage blog posts
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center" style={{ minHeight: "calc(100vh - 400px)" }}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mb-4"></div>
            <p className="text-lg text-slate-600">Loading blogs...</p>
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
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-8">
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
          
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
                Admin Panel
              </div>
              <h1 className="mb-4 text-4xl font-bold text-slate-900 lg:text-5xl">
                Manage Blog Posts
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                View, manage, and delete your published articles
              </p>
            </div>
            
            <Link
              href="/upload-blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 px-8 py-4 text-white font-semibold hover:from-violet-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Upload className="h-5 w-5" />
              Upload New Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-12 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-violet-100 p-6">
                    <FileText className="h-12 w-12 text-violet-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">No blogs found</h3>
                <p className="mb-8 text-slate-600">
                  Get started by uploading your first blog post
                </p>
                <Link
                  href="/upload-blog"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 px-8 py-4 text-white font-semibold hover:from-violet-700 hover:to-purple-800 transition-all shadow-lg"
                >
                  <Upload className="h-5 w-5" />
                  Upload First Blog
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-slate-600">
                Showing {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
              </div>
              
              {/* Blog Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <article 
                    key={blog.id} 
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-violet-300 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop"} 
                        alt={blog.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute right-4 top-4">
                        <span className="inline-block rounded-full bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                          {blog.category || "General"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Meta */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span>{blog.author || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.createdAt).toDateString()}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-violet-600 transition-colors">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-2">
                        {blog.short_description}
                      </p>

                      {/* Read time */}
                      <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime || 6} min read</span>
                      </div>

                      {/* Action Buttons - Side by Side */}
                      <div className="flex gap-2 border-t border-slate-100 pt-4">
                        <Link
                          href={`/edit-blog/${blog.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-700 hover:shadow-md"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          style={{ backgroundColor: '#dc2626', color: 'white' }}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-md"
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                          title="Delete blog"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      <FooterSection />
    </div>
  );
}
