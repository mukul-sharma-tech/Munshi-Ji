# 💰 MunshiJi — Your AI Financial Companion

MunshiJi is a state-of-the-art personal finance management dashboard built with **Next.js 16**, featuring an enterprise-grade UI and an autonomous AI voice agent (**CA Munshi**) that provides real-time financial consulting.

![MunshiJi Banner](https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop)

## ✨ Features

- **📊 Enterprise Dashboard**: A high-density, glassmorphic UI displaying real-time Balance Trends, Spending Breakdowns, and KPI stats.
- **🎙️ CA Munshi (Voice Agent)**: An immersive AI voice consultant powered by **ElevenLabs (Speech Synthesis)** and **Groq (Llama 3 + Whisper)**. Engage in natural, concise financial conversations.
- **📝 Full Transaction Management**: A robust CRUD list with Add, Edit, and Delete support, powered by local state management.
- **🔍 Smart Filtering & Search**: Instant filtering by category, date ranges, amount, and transaction type (Credit/Debit).
- **📥 Data Portability**: Export your entire financial history to CSV with a single click.
- **📱 Responsive & Optimized**: Fully responsive layouts using UI-sans-serif system fonts for a native OS feel, optimized for legibility and accessibility.
- **✨ Micro-Animations**: Smooth Framer Motion transitions, floating money animations in the voice suite, and interactive hover effects.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Models**: [Groq (Llama 3-70b)](https://groq.com/)
- **Voice Intelligence**: [ElevenLabs API](https://elevenlabs.io/) & [Whisper (via Groq)](https://groq.com/whisper)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mukul-sharma-tech/FinBro.git
cd fintech
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
GROQ_API_KEY=your_groq_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

- `/app`: Next.js 16 App Router (Transactions, Dashboard, CA Munshi).
- `/app/api`: API Routes for Voice synthesis, Transcription, and Chat logic.
- `/components`: Reusable UI components (Sidebar, Charts, Chatbot).
- `/lib`: Helper functions, global state logic, and mock data.
- `/public`: Static assets and icons.

## 📸 Screenshots

- **Dashboard**: Modern data-dense overview with interactive charts.
- **CA Munshi**: Immersive voice calling interface with floating particle effects.
- **Transactions**: Advanced data table with search, filter, and export.

## 📜 License
MIT License. Created by Mukul Sharma.
