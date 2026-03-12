ILLUMINEX_PROJECT_DOCUMENTATION.md
# Illuminex Consultancy Website — Project Documentation

This document provides full technical documentation for the **Illuminex Consultancy website project**.

It is intended to allow the project to be continued, maintained, or rebuilt without losing architectural knowledge.

---

# Project Overview

The Illuminex website is a **premium executive search and specialist recruitment website** designed to reflect a high-end consultancy brand.

Design inspiration includes firms such as:

- McKinsey
- Bain
- BCG

The website focuses on:

- premium typography
- minimal UI
- responsive design
- strong brand identity
- performance and security

---

# Technology Stack

Framework


Next.js 16.1.6


Features used


App Router
Turbopack
Server Components
TypeScript


Hosting


Vercel


Domain Provider


IONOS


Development Environment


VS Code
Node.js
Git
GitHub


---

# Frontend Architecture

Frontend structure follows the **Next.js App Router pattern**.


src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ ├── globals.css
│ ├── about/
│ ├── clients/
│ ├── candidates/
│ ├── services/
│ ├── live-jobs/
│ ├── contact/
│ ├── privacy/
│ ├── terms/
│ └── cookies/
│
├── components/
│ ├── SiteHeader.tsx
│ ├── ContactForm.tsx
│ ├── MobileFooterNav.tsx
│ ├── CookiePreferencesButton.tsx
│ ├── TermsFeedConsent.tsx
│ ├── GoogleAnalytics.tsx
│ ├── LinkedInInsight.tsx
│ ├── MetaPixel.tsx
│ └── ContentProtection.tsx
│
├── lib/
│ ├── validation.ts
│ ├── adminAuth.ts
│ ├── admin2fa.ts
│ ├── redis.ts
│ └── rateLimit.ts


---

# Typography System

The website uses a **two-font system** for clarity and brand identity.

Headings and Navigation


Inter


Body text and UI elements


IBM Plex Sans


Font variables are defined in `layout.tsx`.


--font-heading → Inter
--font-body → IBM Plex Sans


Typography rules ensure:

- headings remain clean and strong
- body text is highly readable
- UI elements maintain consistency

---

# Design System

Primary Brand Colours


Dark Blue
#124c76


Secondary Blue


#1e5f8f


Accent Colour


Orange
#ff8a00


Gradient


--brand-orange-gradient


Used for:

- CTA borders
- accent elements
- UI highlights

---

# UI Components

## SiteHeader

Main navigation component.

Features

- desktop navigation pills
- mobile hamburger menu
- mobile navigation drawer
- active page highlighting
- protected images

File


src/components/SiteHeader.tsx


---

## Footer

Features

- responsive mobile layout
- emblem images
- contact information
- navigation links
- LinkedIn icon
- legal company information

Footer logo returns to top of homepage using:


href="/#top"


Smooth scroll behaviour is enabled globally.

---

## Contact Form

Location


src/components/ContactForm.tsx


Features

- validation
- Google reCAPTCHA
- email routing
- responsive layout

---

## Contact Panel

Displays company contact details.

Features

- glass card UI
- gradient border
- responsive grid
- icon support

Typography uses **IBM Plex Sans**.

---

# Security

Security features implemented include:


ContentProtection.tsx


Prevents:

- image right-click saving
- drag download
- basic scraping

Admin authentication includes:


bcrypt password hashing
2FA via TOTP
Redis session storage


---

# Admin Dashboard

Internal admin panel includes analytics and operational tools.

Capabilities include:

- recruitment performance metrics
- sector intelligence
- job engagement analytics
- CSV export tools
- audit logs
- job performance data

Protected routes require authenticated session.

---

# Analytics & Tracking

Analytics integrations include:

## Google Analytics


GoogleAnalytics.tsx


Tracking ID example:


G-XXXXXXXXXX


---

## LinkedIn Insight Tag

Used for recruitment marketing analytics.

Component


LinkedInInsight.tsx


---

## Meta Pixel

Optional advertising analytics.

Component


MetaPixel.tsx


---

# Cookies & Compliance

Cookie consent managed through:


TermsFeedConsent.tsx


Includes:

- cookie banner
- consent storage
- preferences button

Component


CookiePreferencesButton.tsx


---

# Environment Variables

Environment variables are configured in:


.env.local


Examples


ADMIN_USERS
ADMIN_SESSION_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_LINKEDIN_PARTNER_ID
NEXT_PUBLIC_META_PIXEL_ID


These must be configured in **Vercel environment settings** for production.

---

# Deployment

Deployment platform


Vercel


Deployment process


GitHub push → Vercel auto deploy


Branches


vercel-fix (primary working branch)


Milestones are tagged using Git tags.

Example


milestone-15
milestone-16
milestone-17
milestone-18


---

# Performance Optimisation

The site includes:

- Turbopack development builds
- optimized image handling
- responsive CSS
- minimal JS where possible
- server components where appropriate

---

# Launch Checklist

Before public launch the following must be verified.

Domain


IONOS domain connected to Vercel


Analytics


Google Analytics verified
LinkedIn Insight Tag verified
Meta Pixel verified


SEO


sitemap.xml created
robots.txt configured
meta tags verified


Forms


contact form email routing confirmed
candidate registration form confirmed
job application form confirmed


Legal


privacy policy
terms
cookie policy
company registration details


Production checks


mobile testing
desktop testing
performance testing
security verification


---

# Current Project Status

Current milestone


Milestone 18


Completed

- full UI design
- responsive layout
- typography system
- analytics integration
- admin dashboard
- security features

Next milestone


Milestone 19 — Pre-Launch Go Live Checklist


---

# Maintenance Notes

When continuing development:

- maintain typography system
- preserve brand colour system
- avoid breaking responsive grid
- ensure accessibility standards remain intact
- maintain Git milestone tagging structure

---

# Project Owner

Illuminex Consultancy

Executive Search & Specialist Recruitment

Registered in England & Wales  
Company No. 16961631