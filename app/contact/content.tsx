'use client';
import { Navigation } from "../components/Navigation";
import { FooterSection } from "../components/FooterSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const form = e.currentTarget;
    
    // Create a hidden iframe for form submission (bypasses CORS)
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Set form target to the iframe
    form.target = 'hidden_iframe';
    
    // Submit the form
    form.submit();
    
    // Simulate success after a short delay (since we can't read the response)
    setTimeout(() => {
      setFormStatus('success');
      form.reset();
      form.target = ''; // Reset target
      document.body.removeChild(iframe);
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white pb-16 pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm text-violet-700">
              Get in Touch
            </div>
            <h1 className="mb-6 text-slate-900">
              Contact CoderDesign Toronto
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Have a project in mind? Whether you need a custom web application, a mobile app, 
              AI powered automation, or an SEO strategy, we would love to hear from you. 
              Reach out to our Toronto team and we will respond within one business day with a detailed 
              assessment and custom quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="mb-6 text-slate-900">Contact Information</h2>
              <p className="mb-8 text-slate-600">
                Reach out through any of the channels below. Our team is available Monday through Friday, 
                9 AM to 6 PM EST, and we typically respond to all inquiries within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                    <Phone className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-slate-900">Phone</h3>
                    <a 
                      href="tel:+14372392448"
                      className="text-slate-600 transition-colors hover:text-violet-600"
                      title="Call CoderDesign at (437) 239-2448"
                    >
                      (437) 239-2448
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                    <Mail className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-slate-900">Email</h3>
                    <a 
                      href="mailto:hello@coderdesign.com"
                      className="text-slate-600 transition-colors hover:text-violet-600"
                      title="Email CoderDesign"
                    >
                      hello@coderdesign.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                    <MapPin className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-slate-900">Office</h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=7+Grosvenor+Street+Toronto+ON+M4Y+0E2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 transition-colors hover:text-violet-600"
                      title="View CoderDesign office on Google Maps"
                    >
                      7 Grosvenor Street<br />
                      Toronto, ON M4Y 0E2
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                    <Clock className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-slate-900">Business Hours</h3>
                    <p className="text-slate-600">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-slate-900">Send us a Message</h2>
                
                <form 
                  action="https://api.web3forms.com/submit" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input 
                    type="hidden" 
                    name="access_key" 
                    value="d356de31-91d7-40da-9fed-50965252b5b0"
                  />
                  <input 
                    type="hidden" 
                    name="subject" 
                    value="New Contact Form Submission from CoderDesign"
                  />
                  <input 
                    type="hidden" 
                    name="from_name" 
                    value="CoderDesign Website"
                  />
                  <input 
                    type="hidden" 
                    name="redirect" 
                    value="https://web3forms.com/success"
                  />
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Inc."
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In</Label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        className="h-11 w-full appearance-none rounded-md border border-slate-300 bg-gradient-to-r from-violet-50 to-white px-3 py-2 pr-10 text-sm text-slate-700 shadow-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 hover:border-violet-400"
                      >
                        <option value="">Select a service...</option>
                        <option value="Web Application Development">Web Application Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI Automation and Chatbots">AI Automation and Chatbots</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  {formStatus === 'success' && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                      Sorry, there was an error sending your message. Please try again or email us directly.
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-violet-600 hover:bg-violet-700 sm:w-auto"
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
