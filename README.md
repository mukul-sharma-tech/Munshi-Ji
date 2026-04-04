# 💰 MunshiJi — Your AI Financial Companion

MunshiJi is a state-of-the-art personal finance management dashboard built with **Next.js 16**, featuring an enterprise-grade UI and an autonomous AI voice agent (**CA Munshi**) that provides real-time financial consulting.

![MunshiJi Banner](https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop)

## ✨ New Features

- **🛡️ Dynamic Onboarding**: A non-blocking landing page experience. Captures user identity (Name & Email) via a stunning glassmorphic full-screen form only when signing in.
- **👤 Identity Personalization**: Once identified, the entire app (Dashboard, Sidebar, Profile, & Landing Hero) dynamically reflects the user's name and greeting.
- **🛡️ Role-Based Access (RBAC)**: Integrated a "System Role" toggle (Admin/Viewer) in the sidebar. **Admin** allows full CRUD on transactions, while **Viewer** provides a read-only experience.
- **🎙️ CA Munshi (Voice Agent)**: An immersive AI voice consultant powered by **ElevenLabs (Speech Synthesis)** and **Groq (Llama 3 + Whisper)**.
- **📝 Transaction Suite**: Full-featured data table with Add, Edit, Delete (Admin), Search, Sorting, and Advanced Filtering.
- **🔄 Session Persistence**: User identity, roles, and transaction mutations are all persisted across refreshes via **LocalStorage**.
- **📥 Data Export**: Instant CSV export functionality for financial history.
- **📱 Responsive & Optimized**: High-legibility UI-sans-serif font stack, dark/light mode toggle, and hydration-synchronized rendering for zero flicker.

## 🎯 Zorvyn Assignment Checklist

This project was refined specifically for the Zorvyn Frontend Internship appraisal:

- [x] **Financial Summary**: Total Balance, Income, Expenses + KPI cards.
- [x] **Visualizations**: Balance Trend (Linear) and Spending Breakdown (Donut) charts.
- [x] **CRUD Operations**: Functional Add/Edit/Delete logic with state persistence.
- [x] **RBAC Simulation**: Live permission switching via Sidebar toggle.
- [x] **Insights Section**: Automated data-driven observations.
- [x] **State Management**: Scalable use of Context API and React local state.
- [x] **UX Polish**: Toast notifications (Sonner), Framer Motion animations, and responsive layouts.

## 🚀 Technical Architecture

- **Engine**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & Framer Motion
- **AI Backend**: Groq AI SDK (Llama 3-70b/8b & Whisper)
- **Voice Edge**: ElevenLabs Speech Synthesis
- **UI System**: Shadcn UI (Accessible & Modern)

## 🛠️ Quick Start

### 1. Variables
Create a root `.env` file:
```env
GROQ_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
```

### 2. Development
```bash
npm install
npm run dev
```

## 🧠 Technical Decisions & Trade-offs

### 1. Design-First Philosophy & Aesthetics
The development began with a "Mental UI Prototype." I visualized the layout and hierarchy before touching the code, sketching the core placements on a physical notepad. My goal was to create a UI that is **simple yet beautiful and deeply informative**, following the minimalist design languages used by big tech companies like **Google, Microsoft, and Amazon**. 

To achieve this, I used **Shadcn UI** for its highly aesthetic, accessible, and high-performance pre-built components. This allowed me to maintain a consistent design system while focusing on building unique business logic. I also carefully studied the **Zorvyn website** to align my styling choices with your brand's aesthetic.

### 2. Framework: Next.js 16 (App Router)
I chose **Next.js** for its unparalleled balance of developer experience and performance. The App Router's server-side rendering (SSR) ensures fast initial loads, while the lightweight nature of the framework allows for seamless client-side state transitions.

### 3. State Management & Simplicity
For this project, I opted for **React Context API** combined with `useState` and `useEffect`. While Redux or Zustand are great for massive scale, the native Context API provided the simplicity needed to keep the UI snappy and maintainable, specifically for handling identity, RBAC (Role-Based Access Control), and persistence.

### 4. Going Beyond Frontend (The AI Tier)
Although this was primarily a frontend evaluation, I decided to implement **CA Munshi** (the AI Voice Agent). I believe in building products that feel complete; adding a real-time conversational layer demonstrates how frontend dashboards can evolve into proactive financial consultants.

### 5. Trade-offs (Storage Strategy)
A deliberate trade-off was made by choosing **Local Storage** for data persistence instead of a full database. This was intentional to ensure the project remains portable, easy to review, and has zero latency for the reviewer, while still demonstrating full CRUD and session persistence capabilities.

## 📝 Additional Notes

- **Role-Based Access (RBAC)**: I implemented a fully interactive system role toggle. Switching from **Admin** to **Viewer** in the sidebar live-updates the dashboard and transaction table permissions, demonstrating a clear understanding of dynamic data security.
- **Hydration Synchronization**: Since I use LocalStorage for user sessions, I implemented a 'mounted' state check to prevent Next.js hydration mismatches. This ensures a clean, error-free browser console and a smooth visual experience.
- **Graceful Degradation**: The AI Voice Agent requires external API keys (Groq/ElevenLabs). If keys are not provided, the interface gracefully degrades to show informative placeholders.
- **MunshiJi Brand Context**: This project was built with a focus on "MunshiJi" (the traditional Indian term for an accountant), blending cultural familiarity with futuristic AI tech.

---
Created by Mukul Sharma for the Zorvyn Fintech Assignment.
