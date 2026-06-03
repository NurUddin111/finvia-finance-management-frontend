## 💼 Finvia — Frontend

A modern, responsive frontend application for Finvia, built with Next.js and ShadCN UI, focused on performance, accessibility, and clean UI/UX.
This frontend consumes the Finvia backend APIs to manage authentication, businesses, clients, invoices, and dashboards.

## ✨ Features

    ⚡ Next.js App Router (latest architecture)
    🎨 ShadCN UI as the primary design system
    💅 Tailwind CSS for utility-first styling
    🔐 Authentication-ready UI (Login / Register / OTP flow)
    🧾 Invoice management UI
    👥 Client management dashboard
    🏢 Business settings & profile management
    📱 Fully responsive (mobile → desktop)
    ♿ Accessible & semantic components
    🧩 Scalable folder structure
    🛠 Tech Stack

## ⚡ Framework: Next.js

    Language: TypeScript
    Styling: Tailwind CSS
    UI Library: ShadCN UI
    Icons: Lucide Icons
    State Handling: URL state, server actions, and local state
    API Communication: Fetch / Server Actions

## 📁 Project Structure

    src/
    ├─ app/
    │  ├─ (commonLayout)/
    │  │  ├─ (.)login/
    │  │  │  └─ page.tsx
    │  │  ├─ (.)signup/
    │  │  │  ├─ password/
    │  │  │  │  └─ page.tsx
    │  │  │  ├─ verify/
    │  │  │  │  └─ page.tsx
    │  │  │  └─ page.tsx
    │  │  ├─ login/
    │  │  │  └─ page.tsx
    │  │  ├─ signup/
    │  │  │  ├─ password/
    │  │  │  │  └─ page.tsx
    │  │  │  ├─ verify/
    │  │  │  │  └─ page.tsx
    │  │  │  └─ page.tsx
    │  │  ├─ layout.tsx
    │  │  └─ page.tsx
    │  │
    │  ├─ (dashboardLayout)/
    │  │  ├─ admin/
    │  │  │  └─ dashboard/
    │  │  │     ├─ clients/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ settings/
    │  │  │     │  ├─ account/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ password/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ profile/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  └─ page.tsx
    │  │  │     └─ page.tsx
    │  │  ├─ business/
    │  │  │  └─ dashboard/
    │  │  │     ├─ clients/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ invoices/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ products/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ settings/
    │  │  │     │  ├─ account/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ business/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ password/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ profile/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  └─ page.tsx
    │  │  │     └─ page.tsx
    │  │  ├─ demo/
    │  │  │  └─ dashboard/
    │  │  │     ├─ clients/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ invoices/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ products/
    │  │  │     │  └─ page.tsx
    │  │  │     ├─ settings/
    │  │  │     │  ├─ account/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ business/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ password/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  ├─ profile/
    │  │  │     │  │  └─ page.tsx
    │  │  │     │  └─ page.tsx
    │  │  │     └─ page.tsx
    │  │  └─ layout.tsx
    │  │
    │  ├─ (onboardingLayout)/
    │  │  ├─ onboarding/
    │  │  │  └─ page.tsx
    │  │  └─ layout.tsx
    │  │
    │  ├─ api/
    │  │  ├─ auth/
    │  │  │  └─ callback/
    │  │  │     └─ google/
    │  │  │        └─ route.ts
    │  │  └─ cron/
    │  │     └─ ping/
    │  │        └─ route.ts
    │  │
    │  ├─ auth/
    │  │  └─ google/
    │  │     └─ callback/
    │  │        └─ page.tsx
    │  │
    │  ├─ payment/
    │  │  ├─ cancel/
    │  │  │  └─ page.tsx
    │  │  ├─ fail/
    │  │  │  └─ page.tsx
    │  │  ├─ success/
    │  │  │  └─ page.tsx
    │  │  └─ page.tsx
    │  │
    │  ├─ favicon.ico
    │  ├─ globals.css
    │  ├─ layout.tsx
    │  ├─ robots.ts
    │  └─ sitemap.ts
    │
    ├─ components/
    │  ├─ ui/
    │  ├─ shared/
    │  └─ modules/
    │
    ├─ lib/
    │  ├─ getInputFieldError.ts
    │  ├─ utils.ts
    │  └─ zodValidator.ts
    │
    ├─ services/
    │  ├─ auth/
    │  ├─ business/
    │  ├─ admin/
    │  └─ user/
    │
    ├─ types/
    │
    ├─ zod/
    │  ├─ auth.validation.ts
    │  └─ business.validation.ts
    │
    └─ proxy.ts

## ⚙️ Environment Variables

    Create a .env.local file in the root directory:

    NEXT_PUBLIC_API_BASE_URL=
    NEXT_PUBLIC_APP_NAME=

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

## 👨‍💻 Author

    Muhammad Nur Uddin

    “Don’t be shy, know the why!”
    📧 nuruddinmuhammad38@gmail.com
    🌐 https://github.com/NurUddin111
