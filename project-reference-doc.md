# Rishi's Project Reference Document

*Purpose: A complete, detailed record of client and personal projects for future reference. Feed this into an AI assistant when you need to recall specifics, write case studies, update a portfolio, or answer client questions about past work.*

---

## 1. AI Instagram Appointment Booking Agent

**Client:** Salon (United Kingdom)
**Industry:** Beauty / Salon services

**Problem**
The salon received appointment inquiries through Instagram Direct Messages. The owner had to manually respond to every customer, answer common questions, and book appointments — consuming significant time and delaying responses.

**Solution**
Built an AI-powered Instagram assistant that automatically handled customer conversations while replicating the owner's personal conversational style, so replies felt authentic rather than robotic.

**What Was Built**
- Instagram DM automation (Instagram API + n8n)
- AI-powered conversational assistant
- Personality modeling of the owner's tone
- Appointment qualification logic
- Automated calendar booking, synced to the salon's calendar
- FAQ handling for common customer questions
- Reduced manual back-and-forth communication

**Biggest Challenge**
Making the AI genuinely sound like the salon owner, not like a generic bot. Process used:
1. Collected historical customer conversations
2. Used AI to analyze communication patterns
3. Generated a personality profile from those patterns
4. Engineered prompts to replicate the owner's conversational style
5. Iteratively refined prompts through extensive testing until conversations felt natural

**Technologies**
Instagram API, n8n automation, AI language model, calendar integration

**Outcome**
The owner no longer needed to manually respond to every inquiry. Appointments were booked automatically while maintaining a personal, authentic customer experience.

**Live Demo**
A live demo version runs under the MyTaskEngine agency Instagram: https://ig.me/m/mytaskengine — send "hi" to test it. This version is trained as a sales assistant that collects information and directs prospects toward a booking with Rishi under MyTaskEngine (used for showing prospective clients how the agent works, not the actual salon deployment).

---

## 2. AI Website Customer Support Chatbot

**Client:** Not specified (general business chatbot)

**Overview**
An AI chatbot embedded directly on a company's website, acting as the first point of contact for visitors. Unlike the Instagram booking agent, this one focuses purely on answering questions rather than scheduling.

**Features**
- Website chat widget
- AI-powered FAQ responses
- Knowledge-base retrieval
- Business information delivery
- Customer guidance / natural conversation flow

**Technologies**
AI language model, website integration, n8n automation

**Outcome**
Reduced repetitive customer questions and gave visitors immediate answers around the clock.

---

## 3. Physiotherapy Clinic Website & Donation Platform

**Client:** Amma Psy (AMMAPSYDAC)
**Industry:** Healthcare / Nonprofit

**Problem**
The organization needed a professional online presence and an easy way for supporters to contribute financially.

**Solution**
Designed and developed a full website with an integrated donation system, handled end-to-end.

**Features**
- Responsive design
- Organization/service information
- Team profiles
- Blog / content management system
- Donation interface and payment integration
- User-friendly navigation

**My Role**
Handled the project end-to-end — UI design, client collaboration, development, and deployment.

**Technologies**
Web development, payment/donation integration

**Outcome**
Created a centralized online presence for the organization while simplifying the donation process for supporters.

**Live Site:** https://www.ammapsydac.com/

---

## 4. Football Jersey E-commerce Store

**Client:** Football jersey resale business

**Problem**
The business needed an online storefront to sell football jerseys.

**Solution**
Developed a complete e-commerce platform with a product catalog and online ordering.

**Features**
- Product catalog
- Shopping experience / product pages
- Online ordering

**Technologies**
E-commerce platform, web development

**Outcome**
Enabled the business to sell jerseys online through a dedicated digital storefront.

*Note: Considered the least differentiated project in the portfolio — still worth including for breadth, but not a lead case study.*

---

## 5. Sahadar Shield Membership Ecosystem

**Client:** Sahadar Shield
**Industry:** Healthcare / Pharmacy membership program

**Background**
Sahadar Shield runs a membership-based discount program spanning 300+ partner medical stores.

**Problem**
The organization needed a complete digital platform to manage members, staff, memberships, credits, and retail discounts across all partner locations.

**Solution**
Designed and built a full ecosystem consisting of:
- Customer mobile app
- Customer portal
- Admin dashboard
- Staff dashboard

**Features by Component**

*Customer App*
- Phone number registration + OTP authentication
- Google Sign-In
- Digital membership card
- Unique member ID
- Wallet / credit balance

*Staff Dashboard*
- Search customers
- Scan/lookup member details
- Top-up customer credits
- View customer profile

*Admin Dashboard*
- Member management
- Staff management
- Branch management
- Role-based permissions
- Membership controls / system administration

**Customer Journey**
1. User registers via phone OTP
2. Receives a digital membership card
3. Assigned a unique member ID
4. Visits a partner medical store
5. Staff locates the customer using their ID
6. Credits are added to the account
7. Credits are later redeemed for discounts

**Technical Challenges**
- Multi-branch administration
- Role-based permission management
- Phone OTP authentication + Google Authentication
- Secure login/authentication redirect flows

**Technologies**
Firebase, mobile app development, web dashboards, authentication, backend database

**Outcome**
Digitized the entire membership ecosystem, simplifying operations for customers, staff, and admins across hundreds of partner stores. This is the largest project in the portfolio by scope.

---

## 6. AI-Powered Customer Feedback & Google Review Automation

**Client:** JK Tyres Dealer
**Industry:** Automotive / Tire retail

**Problem**
The business's performance bonuses depended partly on Google reviews, but consistently collecting reviews was difficult. Customer phone numbers already existed in the billing software, but there was no post-purchase engagement. The owner also didn't want to spam customers with marketing messages.

**Solution**
Designed a WhatsApp-based post-purchase automation that delivered value *before* requesting feedback — rather than the typical "send WhatsApp → ask for review" approach, the customer journey was redesigned around trust-building first.

**Customer Flow**
1. Customer purchases tires
2. Billing software generates an invoice
3. Automation detects the invoice
4. Invoice is instantly delivered via WhatsApp
5. Customer is asked: "How was your experience?"

**Rating Logic**
- **5 stars:** Customer is thanked and sent the Google Review link, encouraged to post publicly.
- **4 stars or below:** Customer is *not* sent to Google Reviews. Instead redirected to a private feedback form; business collects improvement suggestions internally.

**Technical Challenges**
WhatsApp Business API has significant limitations — overcome by building webhook-driven integrations with third-party services to enable the workflow while keeping the customer experience seamless.

**Technologies**
Billing software integration, webhooks/API, WhatsApp Business API, automation workflow, customer feedback routing

**Outcome**
Created an automated, customer-first experience that increased positive Google reviews, prevented dissatisfied customers from posting public negative reviews, captured actionable private feedback, and improved local SEO/online reputation — with no additional effort required from staff.

*Note: This is considered one of the strongest projects in the portfolio because it demonstrates business/product thinking and customer psychology, not just technical execution.*

---

## 7. Cold Email Infrastructure & Outreach Automation

**Client:** Business owner (industry not specified)

**Problem**
The client had a large database of prospective leads but was manually sending outreach emails one by one — slow, inefficient, and impossible to scale, with a real risk of poor deliverability if sent in bulk without proper infrastructure.

**Solution**
Designed and implemented a scalable cold email system enabling the client to safely send thousands of personalized outreach emails while maintaining high deliverability.

**What Was Built**
- Sending domain strategy (multiple domains, purchased and configured)
- Domain authentication: SPF, DKIM, DMARC configuration
- Email warm-up infrastructure
- Sending limits to avoid rate limiting / spam filters
- Gradual volume ramp-up
- Bounce protection
- Campaign pause logic
- Inbox placement / deliverability optimization

**Personalization Engine**
Campaigns automatically inserted First Name, Company Name, Job Title, and custom variables directly from uploaded CSV lead lists — rather than sending generic emails.

**Campaign Architecture**
A five-email outbound sequence ending in a structured break-up email, with campaign metrics tracked via a dashboard.

**Technologies**
Brevo API, email infrastructure, SPF/DKIM/DMARC, warm-up services, CSV processing

**Outcome**
Transformed manual, one-by-one outreach into a scalable outbound system capable of safely sending high-volume personalized campaigns with strong inbox placement.

---

## 8. MyTaskEngine Website

**What it is:** Official website for Rishi's own AI Automation & Development agency (MyTaskEngine / "The Engine Room").

**Purpose**
Communicates services, showcases past projects, and acts as the company's primary online presence.

**Website:** https://www.mytaskengine.com/

---

## 9. Telos (Personal Product — Live)

**Status:** Live on Google Play

**Links**
- Play Store: https://play.google.com/store/apps/details?id=com.alrawi.telos
- Website: https://telos-website-two.vercel.app/

**Vision**
A habit-tracking and journaling app centered on deep reflection rather than simple streaks/checklists.

**Planned Features**
- Habit tracking
- Daily journal
- Reflection system
- Recurring tasks
- Long-term progress tracking
- Home screen widgets
- Beautiful page-turning journal animation

**Notes**
A companion website was also designed to introduce the product and drive app downloads. Goal is to help users build meaningful habits through reflection rather than relying solely on streaks.

---

## 10. Entheos (Personal Product — Live)

**Status:** Live on Google Play
*(Also referred to elsewhere as "Comparative Spiritual Learning App")*

**Link**
- Play Store: https://play.google.com/store/apps/details?id=com.alrawi.entheos

**Vision**
A comparative spiritual learning platform for exploring mystical/spiritual traditions from around the world without bias — presenting each tradition in its own words rather than promoting one over another.

**Planned Features**
- Comparative learning across traditions
- Guided meditation methods / tradition-specific practices
- Educational content
- Structured learning paths
- Personal exploration tools

**Goal**
Provide a neutral platform for understanding and practicing different spiritual traditions.

---

## 11. Business Onboarding Automation

**Overview**
An onboarding workflow that automatically provisions resources whenever a new customer or employee completes an onboarding form.

**Workflow**
1. User submits onboarding form
2. Automation creates a dedicated Google Drive folder
3. Documents are organized automatically
4. Legal paperwork is added
5. Folder is shared with the user
6. Welcome email is sent automatically with access links

**Technologies**
n8n, Google Drive API, Google Workspace, email automation

---

## 12. Additional Expertise (Smaller Automations & Skills)

Rather than separate case studies, these smaller capabilities round out the overall skill set:

- CRM automations
- Google Workspace automations
- Calendar integrations
- Booking systems
- Webhook-based workflows
- WhatsApp integrations
- API integrations
- OTP authentication
- Google OAuth
- AI prompt engineering
- AI personality modeling
- Firebase backend architecture
- End-to-end deployment

---

## Core Expertise Summary (for positioning/bios)

**AI Agents:** AI customer support, AI appointment booking, AI knowledge assistants, prompt engineering, personality modeling, AI workflow design

**Automation:** n8n, Make.com, Zapier, CRM automation, Google Workspace automation, email automation, WhatsApp automation, API integrations, webhooks

**Full-Stack Development:** React, Next.js, Node.js, Firebase, Supabase, authentication, REST APIs

**AI-Assisted Development Tools:** ChatGPT, Claude, Google Gemini, Perplexity, rapid AI-assisted prototyping

**Overall Process/Philosophy:**
1. Understand the business problem
2. Design the most efficient workflow
3. Build the user experience
4. Develop the backend and automations
5. Integrate AI where it creates real value
6. Test extensively
7. Deploy and iterate

Handles the entire lifecycle — client discussions, solution architecture, UI design, implementation, automation, testing, and deployment.

---

## Portfolio Positioning Notes (strategy reference)

**Positioning:** "AI Automation & Full-Stack Engineer" — away from "I build websites," toward "I design AI-powered systems that automate business operations."

**Recommended Featured Case Study Order:**
1. AI Instagram Appointment Booking Agent — strongest AI/personality story, most relatable use case
2. Sahadar Shield Membership Platform — largest scope, full-stack + mobile + dashboards + auth
3. AI Customer Feedback & Google Review Automation — best business/product-thinking narrative
4. Cold Email Infrastructure & Outreach Platform — showcases infrastructure/deliverability skill set

**Other Projects (supporting/breadth section):**
- AI Website Support Chatbot
- Physiotherapy Clinic Website (AMMAPSYDAC)
- MyTaskEngine (own agency site)
- Business Onboarding Automation
- Football Jersey E-commerce Store (least differentiated, still worth including)
- Telos (live on Google Play — personal product, product design/long-term thinking)
- Entheos (live on Google Play — personal product, vision/education)

**Structural recommendation:** Drop numbering, present as featured case studies + "Other Projects" + "Additional Expertise" section. Roughly 4 featured case studies, 6–7 supporting projects, one expertise summary section — balances depth and breadth without overwhelming readers.
