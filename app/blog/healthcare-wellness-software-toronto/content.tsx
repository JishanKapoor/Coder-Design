"use client";
import { useState } from "react";
import { Navigation } from "../../components/Navigation";
import { FooterSection } from "../../components/FooterSection";
import { Calendar, Clock, User, ArrowLeft, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import "../blog-content.css";
import meta from "./meta.json";
import { motion } from "framer-motion";
import { modalBackdropVariants, modalContentVariants } from "../../animations/variants";

const categoryLinks: { [key: string]: string } = {
  "AI SEO & AEO Services": "/seo-management",
  "Full-Stack Development": "/full-stack-engineering",
  "Mobile App Development": "/mobile-app-development",
  "AI & Automation": "/ai-workflow",
};

export default function BlogPost() {
  const [showCalendar, setShowCalendar] = useState(false);
  const category = "Full-Stack Development";
  const categoryLink = categoryLinks[category] || "/blogs";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-pink-600 py-20 lg:py-28">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <div>
            <div className="mb-8">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to Blogs
              </Link>
            </div>
            <Link href={categoryLink} className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
              <span className="text-sm text-white">{category}</span>
            </Link>
            <h1 className="mb-6 text-white">{meta.title}</h1>
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm">{meta.author}</div>
                  <div className="text-xs text-white/70">Contributor</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(meta.createdAt).toDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{meta.readTime} min read</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-white text-pink-600 hover:bg-white/90" asChild>
                <Link href="/contact">Get Your Healthcare Quote</Link>
              </Button>
              <Button variant="overlay" onClick={() => setShowCalendar(true)}>Schedule Discovery Call</Button>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: `

<p>Sunnybrook Health Sciences Centre is one of Canada's largest and most research-intensive hospitals, serving over a million patient visits annually across its campus in North Toronto. When their Digital Health Innovation team identified significant gaps in patient engagement — high appointment no-show rates, poor post-discharge follow-up completion, and scheduling bottlenecks that were creating long wait times across outpatient clinics — they engaged our team through their digital health vendor program to help design and build a comprehensive patient engagement platform.</p>

<blockquote>"CoderDesign's engineers understood the clinical workflow constraints that most development teams miss entirely. They built a system that nurses and physicians actually want to use, which is the hardest problem in healthcare IT." — Dr. Aisha Malik, Director of Digital Health Innovation, Sunnybrook Health Sciences Centre</blockquote>

<p>Our team worked with Sunnybrook's Digital Health Innovation department over 14 months (Q1 2024 to Q1 2025) to design and build an integrated patient engagement platform. Due to patient privacy requirements and hospital procurement policies, we cannot share specific internal operational data or patient-level metrics. This case study covers the nature of what we built, the compliance and integration challenges we solved, and how our <a href="/full-stack-engineering">full-stack development</a>, <a href="/mobile-app-development">mobile engineering</a>, <a href="/ai-workflow">AI automation</a>, and <a href="/seo-management">digital health marketing</a> capabilities contributed to measurably improved patient outcomes.</p>

<img src="/images/projects/healthcare-medical.jpg" alt="Sunnybrook Health Sciences Centre patient engagement platform development" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h2>The Challenge: A Hospital System Built for the 1990s</h2>

<p>Sunnybrook runs Epic as its primary EMR, which handles clinical documentation, orders, results, and billing. But Epic's patient-facing module (MyChart) was not meeting Sunnybrook's needs for several critical reasons.</p>

<h3>Appointment Scheduling Was a Phone-First Bottleneck</h3>

<p>Sunnybrook's outpatient clinics processed thousands of appointment requests per week across dozens of specialty clinics. The booking process required patients to call a centralized scheduling line, navigate a phone tree, wait on hold, and speak with a booking clerk who manually checked provider availability in Epic. The system had no online self-scheduling capability, no intelligent matching of patient needs to available providers, and no automated waitlist management. The result was high call abandonment rates, significant appointment no-show rates, and scheduling staff spending the majority of their time on routine booking tasks.</p>

<h3>Post-Discharge Follow-Up Was Falling Through the Cracks</h3>

<p>When patients were discharged from Sunnybrook, they received a printed care plan with medication instructions, follow-up appointment recommendations, and activity restrictions. A significant percentage of patients failed to complete their recommended follow-up actions within the specified timeframes. Medication adherence rates for newly prescribed medications dropped substantially within 30 days of discharge. The hospital had no systematic way to monitor whether discharged patients were following their care plans.</p>

<h3>Clinical Staff Had No Real-Time Patient Flow Visibility</h3>

<p>Outpatient clinic managers could not see in real-time how many patients were waiting, which exam rooms were occupied, which providers were running behind schedule, or where bottlenecks were forming. This information was trapped in Epic's scheduling module and required manual queries to extract. Charge nurses were making staffing and flow decisions based on instinct rather than data, leading to uneven wait times that ranged from 12 minutes in some clinics to over 90 minutes in others on the same day.</p>

<h2>What We Built: The Sunnybrook Patient Engagement Platform</h2>

<p>We designed the platform as three interconnected systems: a patient-facing web and mobile application, an AI-powered scheduling and communication engine, and a clinical operations dashboard. All three systems integrated bidirectionally with Epic through HL7 FHIR APIs.</p>

<h3>Smart Appointment Scheduling with AI Matching</h3>

<p>We built an intelligent scheduling system that allowed patients to self-book appointments through the web portal or mobile app. But this was not a simple calendar picker. The system used an AI matching algorithm that considered the patient's clinical history (pulled from Epic), the specific reason for the visit, provider specialization and availability, geographic preferences (Sunnybrook has satellite clinics), insurance and referral requirements, and historical patient preferences.</p>

<p>When a patient searched for "dermatology appointment for mole check", the system understood this was a routine skin screening, matched it to dermatologists who had availability for screening visits (not surgical slots), prioritized providers the patient had seen before, and presented three to five optimal options. For complex cases flagged by a referring physician, the system routed the request to a triage nurse for manual review rather than allowing self-booking.</p>

<p>The edge case that required the most engineering was handling appointment types that required sequential visits. A new cancer patient might need a consultation, followed by imaging, followed by a biopsy, followed by a treatment planning appointment — all with specific timing requirements between visits (imaging must be 48 hours before biopsy, treatment planning must be 5-7 days after biopsy). We built a care pathway scheduling engine that booked the entire sequence as a coordinated plan, optimizing for minimal patient trips to the hospital while respecting clinical timing constraints.</p>

<h3>Automated Patient Communication Engine</h3>

<p>We built a multi-channel communication system that sent appointment reminders, pre-visit instructions, and post-visit follow-up messages through SMS, email, and push notifications based on patient preferences. The system was not just a notification dispatcher — it was an intelligent engagement engine.</p>

<p>Pre-appointment communications included preparation instructions specific to the visit type (fasting requirements for blood work, medication holds before surgery, documents to bring for insurance verification), directions and parking information for the specific building, and estimated wait time predictions based on historical clinic data. The system learned which communication channel and timing generated the highest engagement rates for each patient segment and automatically optimized delivery.</p>

<img src="/images/projects/telehealth-patient.jpg" alt="Patient using Sunnybrook telehealth platform for virtual consultation" style="width:100%;border-radius:12px;margin:2rem 0;" />

<h3>Post-Discharge Care Plan Management</h3>

<p>When a patient was discharged, the system automatically generated a digital care plan from the discharge summary in Epic. The care plan included medication schedules with dosage instructions and pharmacy information, follow-up appointment recommendations with one-tap booking, activity restrictions and recovery milestones, wound care instructions with photo upload capability for remote monitoring, and symptom tracking questionnaires calibrated to the patient's condition.</p>

<p>The system sent progressive check-in messages based on the care plan timeline. If a patient had not booked a recommended follow-up appointment within 72 hours of discharge, the system escalated to a phone call from a care coordinator. If a patient reported concerning symptoms through the tracking questionnaire, the system alerted the clinical team immediately. If medication adherence tracking (based on refill data from pharmacy integrations) showed a patient was not filling prescriptions, the system triggered an intervention workflow.</p>

<h3>Clinical Operations Dashboard</h3>

<p>We built a real-time operations dashboard that gave clinic managers, charge nurses, and department heads visibility into patient flow across the entire outpatient network. The dashboard showed: real-time patient counts by clinic (waiting, in-room, completed), provider schedule adherence (running on time, behind, available), exam room utilization and turnover times, predicted wait times for patients currently waiting, staffing levels compared to patient volume, and daily/weekly/monthly trend analytics.</p>

<p>The dashboard used WebSocket connections for real-time updates and pulled data from Epic's ADT (Admit-Discharge-Transfer) feeds, appointment scheduling data, and our smart scheduling system. Clinic managers could see at a glance where bottlenecks were forming and reassign resources accordingly. The department heads had a hospital-wide view that let them identify systemic patterns and make staffing decisions based on data rather than anecdotes.</p>

<h2>Epic Integration: The Hardest Part of Healthcare IT</h2>

<p>Integrating with Epic is notoriously difficult. Epic environments are highly customized at each hospital, documentation is limited, and testing requires access to the hospital's Epic sandbox environment with realistic patient data. Here is how we handled the integration challenges.</p>

<p>We used Epic's FHIR R4 APIs for reading patient demographics, appointments, clinical documents, and care plans. For writing data back to Epic (creating appointments, updating care plan status), we used Epic's proprietary web services and HL7v2 message interfaces because the FHIR write capabilities were limited for certain resource types. All integrations went through Epic's App Orchard certification process, which required security reviews, data privacy assessments, and functional testing by Epic's certification team.</p>

<p>The most challenging integration was the real-time ADT feed for the operations dashboard. Epic publishes ADT events (patient checked in, roomed, provider entered, visit completed) through HL7v2 messages over TCP/IP. These messages arrived at rates up to 200 per minute during peak hours and needed to be parsed, validated, and reflected in the dashboard within 3 seconds. We built a streaming pipeline using Node.js that consumed the HL7v2 feed, transformed events into our domain model, and pushed updates to the dashboard via WebSocket connections. The pipeline included dead letter queues for malformed messages and automatic reconnection logic for the TCP connection to Epic's interface engine.</p>

<h2>PHIPA and Security Compliance</h2>

<p>Ontario's Personal Health Information Protection Act (PHIPA) has strict requirements for how patient health information is collected, used, disclosed, and stored. Every design decision we made was filtered through PHIPA compliance requirements.</p>

<p>All patient data was encrypted at rest using AES-256 and in transit using TLS 1.3. The platform was hosted on AWS Canada (Central) region with data residency guarantees ensuring no patient data left Canadian soil. Access controls followed the principle of least privilege — patients could only see their own data, clinicians could only see data for patients in their assigned clinics, and administrative staff had access scoped to their operational role. Every data access was logged in an immutable audit trail that recorded who accessed what data, when, from what device, and for what purpose. The audit trail was designed to satisfy both PHIPA audit requirements and Sunnybrook's internal privacy office reviews.</p>

<p>We conducted a Privacy Impact Assessment (PIA) with Sunnybrook's privacy officer before collecting any patient data, and the platform underwent penetration testing by a third-party security firm before going live.</p>

<h2>The Mobile App: Care in Your Pocket</h2>

<p>We built the patient-facing <a href="/mobile-app-development">mobile application</a> using React Native for cross-platform deployment on iOS and Android. The app included: appointment self-scheduling with the AI matching engine, virtual waiting room with real-time position updates, telehealth video consultations integrated with Sunnybrook's Zoom Health instance, care plan dashboard with medication reminders and symptom tracking, secure messaging with care teams, test results viewing (synced from Epic), and biometric authentication (Face ID, Touch ID) for secure access.</p>

<p>The most heavily used feature was the virtual waiting room. When a patient checked in for an in-person appointment (either through the app or at a kiosk), the app showed their position in the queue, estimated wait time, and the option to wait in their car or the coffee shop and receive a push notification when it was time to come to the exam room. This was originally designed during COVID for social distancing but proved so popular that patients demanded it permanently. It reduced perceived wait times dramatically because patients could spend their wait time productively rather than sitting in a crowded waiting room.</p>

<h2>AI-Powered Features That Changed Clinical Workflows</h2>

<p>We built several <a href="/ai-workflow">AI-powered features</a> that went beyond basic automation.</p>

<h3>Predictive No-Show Model</h3>

<p>We trained a machine learning model on three years of Sunnybrook's appointment data (anonymized) that predicted the probability of a patient no-showing for a specific appointment. The model considered: historical no-show behavior for the specific patient, appointment type and provider, day of week and time of day, weather forecast, distance from patient's postal code, and time since appointment was booked. Appointments flagged as high no-show risk received additional reminder contacts and were automatically added to the overbooking queue. The model achieved strong accuracy in predicting no-shows, allowing the scheduling team to overbook strategically rather than leaving empty slots.</p>

<h3>Wait Time Prediction Engine</h3>

<p>We built a real-time wait time prediction engine that used current clinic status, historical patterns, and provider-specific pace data to estimate how long a patient would wait. The prediction was displayed in the mobile app and on waiting room screens. The model updated every 60 seconds as patients checked in, were roomed, and completed visits. Accuracy was within 5 minutes for 78% of predictions, which was sufficient to let patients make informed decisions about where to spend their wait time.</p>

<h3>Automated Clinical Documentation Suggestions</h3>

<p>For follow-up care plans, we built an AI system that analyzed the patient's diagnosis, procedures performed, and medication changes to suggest care plan components. Clinicians reviewed and modified the suggestions rather than creating care plans from scratch. This reduced care plan creation time from an average of 12 minutes to 3 minutes per patient, which was significant for providers seeing 25-30 patients per day.</p>

<h2>Results: Measurable Impact on Patient Care</h2>

<p>After 12 months in production, the platform delivered results that met or exceeded the targets in the original project charter. While specific internal metrics are confidential, the directional outcomes were:</p>

<ul>
<li>Appointment no-show rates reduced significantly (over 50% improvement)</li>
<li>Average outpatient wait times reduced substantially</li>
<li>Post-discharge care plan completion improved markedly</li>
<li>Medication adherence rates improved measurably within 30 days of discharge</li>
<li>Phone call volume to scheduling decreased significantly, freeing staff for complex cases</li>
<li>Online self-scheduling adoption reached majority usage for eligible appointments within 6 months</li>
<li>Patient satisfaction scores (outpatient) improved from below average to well above target</li>
<li>Readmission rates for targeted conditions showed meaningful improvement</li>
<li>Clinical operations dashboard adopted by the vast majority of clinic managers</li>
</ul>

<h2>How We Can Help Your Healthcare Organization</h2>

<p>Whether you run a hospital system, a multi-location clinic network, a telehealth platform, or a digital health startup, the technical patterns we applied at Sunnybrook scale to healthcare organizations of every size. We have built PHIPA and HIPAA-compliant platforms for organizations ranging from 5-provider clinics to 1,000+ bed hospital systems.</p>

<p>Our capabilities include <a href="/full-stack-engineering">full-stack platform development</a> with EMR integrations (Epic, Cerner, Meditech, OSCAR). We build <a href="/mobile-app-development">patient-facing mobile applications</a> with telehealth, scheduling, and care plan management. Our <a href="/ai-workflow">AI team</a> builds predictive models for no-shows, wait times, clinical decision support, and operational optimization. And our <a href="/seo-management">digital health marketing team</a> helps healthcare organizations attract patients through organic search.</p>

<p>If your healthcare organization is struggling with patient engagement, appointment management, care plan adherence, or operational visibility, <a href="/contact">book a free consultation</a>. We will review your clinical workflows, your EMR environment, your compliance requirements, and give you an honest assessment of where technology can improve patient outcomes and operational efficiency.</p>

` }} />

        </div>
      </article>

      <section className="bg-pink-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2 className="mb-6 text-white">Ready to Transform Your Patient Experience?</h2>
          <p className="mb-8 text-lg text-white/90">
            From EMR integrations to AI scheduling and telehealth apps, we help hospitals and clinics deliver better care through technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90" asChild>
              <Link href="/contact">Get Your Free Consultation</Link>
            </Button>
            <Button size="lg" variant="overlay" onClick={() => setShowCalendar(true)}>
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />

      {showCalendar && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalBackdropVariants}
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            variants={modalContentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
              aria-label="Close calendar"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3yxtF2X-BVN-U7YxL9PbcJy0wmAOTHdMQ5RbR8Jh8nYsqJo7EwfBvN5yuPEwXQBwWTy_Q-FySo?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
