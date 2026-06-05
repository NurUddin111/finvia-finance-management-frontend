## 💼 Finvia — Frontend

![Live](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN_UI-000000?style=for-the-badge)

Finvia is a modern finance management platform built for freelancers and small businesses.

The platform enables businesses to manage invoices, clients, products, payments, and business analytics from a single workspace. Built with Next.js, TypeScript, and ShadCN UI, Finvia focuses on performance, scalability, accessibility, and an exceptional user experience.

## 🚀 Live Demo

🔗 Live Application: https://finvia-finance-management.vercel.app
🔗 Backend Repository: https://github.com/NurUddin111/finvia-finance-management-backend

## 📸 Preview

### Dashboard  
<img width="620" height="910" alt="chrome_wkvyJJaYlq" src="https://github.com/user-attachments/assets/43941863-9936-4d56-a59b-739bf64b2729" />

### Invoices
<img width="1036" height="892" alt="chrome_kdO1KYbf0g" src="https://github.com/user-attachments/assets/5a4fefd7-766c-4b31-8ac5-ad1920cc3d51" />

### Clients
<img width="1232" height="781" alt="chrome_T0NeDJgzKs" src="https://github.com/user-attachments/assets/2af0e9fa-012c-46dd-902e-d12d2c78f983" />

### Products
<img width="1229" height="899" alt="chrome_Iciu3C3tRo" src="https://github.com/user-attachments/assets/03fedc04-db17-4be5-88d5-92aa31144521" />


## 🚀 Highlights
- Invoice Management
- Client Management
- Product Management
- Business Analytics Dashboard
- Google Authentication
- Responsive Design
- SEO Optimized
- Google Analytics Integrated
- Demo Workspace

## ✨ Features

### Authentication

* Email & OTP Registration Flow
* Google OAuth Login
* Secure Cookie-Based Authentication

### Business Management

* Business Profile Management
* Multi-Step Onboarding Flow
* Business Settings Dashboard

### Invoice System

* Create and Manage Invoices
* Draft, Sent, Paid & Overdue Status Tracking
* Payment Workflow Integration

### Client Management

* Add, Edit and Organize Clients
* Client Revenue Insights

### Product Management

* Product Catalog Management
* Product-Based Invoice Generation

### Analytics Dashboard

* Revenue Tracking
* Client Growth Analytics
* Invoice Status Insights
* Payment Distribution Reports

### User Experience

* Fully Responsive Design
* Accessibility Focused
* SEO Optimized
* Demo Workspace

## 🎯 Project Goals

Finvia was built to help freelancers and small businesses manage their operations from a single platform.

The project focuses on:

* Simplifying invoice management
* Improving payment tracking
* Centralizing client management
* Providing actionable business analytics
* Delivering a modern SaaS experience

## 🏆 Key Achievements

- Built a production-ready SaaS platform
- Implemented Google OAuth authentication
- Integrated payment workflows
- Achieved Lighthouse SEO score of 100
- Configured Google Analytics and Search Console
- Designed a responsive dashboard experience
- 
## 🏗 Architecture

- Next.js App Router
- Server Actions
- Route Groups
- Feature-Based Module Structure
- ShadCN UI Design System

## 📁 Project Structure

    src/
    ├─ app/
    │  ├─ (commonLayout)/
    │  ├─ (dashboardLayout)/
    │  ├─ (onboardingLayout)/
    │  ├─ api/
    │  ├─ auth/
    │  ├─ payment/
    │  ├─ favicon.ico
    │  ├─ globals.css
    │  ├─ layout.tsx
    │  ├─ robots.ts
    │  └─ sitemap.ts
    │
    ├─ components/
    ├─ lib/
    ├─ services/
    ├─ types/
    ├─ zod/
    └─ proxy.ts

## ⚙️ Environment Variables

    Create a .env.local file in the root directory:

    NODE_ENV=development
    NEXT_PUBLIC_API_URL=http://localhost:1126/api/v1
    NEXT_PUBLIC_APP_URL=https://finvia-finance-management.vercel.app
    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-**********
    
    # JWT
    JWT_ACCESS_SECRET=access_secret_here 

    Make sure the backend server is running before starting the frontend!

## 🚀 Getting Started

    1️⃣ Install dependencies
    npm install

    2️⃣ Run the development server
    npm run dev

    Open your browser at:
    http://localhost:3000

## 🧩 ShadCN UI Setup

    This project uses ShadCN UI as the primary component system.
    If you need to add new components:
    npx shadcn-ui@latest add component-name

    ⚠️ Do not mix other UI libraries to maintain design consistency.

## 🔐 Authentication Flow (UI)

    User clicks Register

    Modal opens over landing page

    Route updates to /signup

    Email → OTP → Password (multi-phase flow)

    Secure cookie-based authentication handled by backend

## 📐 Design Principles

    Minimal & modern UI

    Clear visual hierarchy

    Consistent spacing & typography

    No unnecessary animations

    Mobile-first responsiveness

## 🤝 Contribution

    This is a private project.
    Follow existing patterns and conventions before adding new features.

## ☁️ Deployment

- Frontend: Vercel
- Backend: Railway
- Database: PostgreSQL

## 👨‍💻 Author

    Muhammad Nur Uddin

    “Don’t be shy, know the why!”
    📧 nuruddinmuhammad38@gmail.com
    🌐 https://github.com/NurUddin111
