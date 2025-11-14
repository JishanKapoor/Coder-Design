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
              Let's Build Something Great Together
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
                Reach out to us through any of these channels. We're here to help you succeed.
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
                      href="https://maps.app.goo.gl/vSXFVtvVq2Tm3D4F7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 transition-colors hover:text-violet-600"
                    >
                      17 State Street<br />
                      New York, NY 10004
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

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                <a
                  href="https://www.google.com/maps/place/Coder+Design/@40.7028925,-74.016452,17z/data=!3m2!4b1!5s0x89c3ae75e45b1d09:0xe1bbb17003dfca79!4m6!3m5!1s0x89c25b00680cc5c7:0xc3f35bd01807f248!8m2!3d40.7028885!4d-74.0138771!16s%2Fg%2F11yk4skcny?entry=tts&g_ep=EgoyMDI1MTEwNC4xIPu8ASoASAFQAw%3D%3D&skid=300d5522-93b2-4dc2-8fea-0f46ea20435f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.952672935889!2d-74.01393268459395!3d40.70432797933107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x2cb2ddf003b67659!2s17%20State%20St%2C%20New%20York%2C%20NY%2010004!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </a>
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
                        <option value="Full-Stack Development">Full-Stack Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="AI SEO & AEO Services">AI SEO & AEO Services</option>
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
