# 🌊 FinX Aqua

**World's 1st Real-Time Fish Disease Detection Software**

FinX Aqua is an AI-powered web application designed to help users detect fish and shrimp diseases in real-time. Upload a photo, get an instant diagnosis, and receive medicine & treatment suggestions.

## ✨ Features

- 🔍 **AI-Powered Disease Detection**: Upload images of fish or shrimp to get instant disease diagnosis
- 📚 **Comprehensive Disease Manuals**: Browse detailed information about fish and shrimp diseases
- 💊 **Medicine Reference Library**: Access information about medicines, drugs, probiotics, and supplements
- 📊 **Detection History Dashboard**: View and manage your previous detections
- 🌓 **Dark/Light Mode**: Toggle between themes for comfortable viewing
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🎨 **Modern UI/UX**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 7
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Radix UI (shadcn/ui style)
- **Routing**: React Router DOM v7
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Formatting**: date-fns

### Backend
- **Framework**: FastAPI (Python)
- **AI Model**: TensorFlow 2.16 (MobileNetV2)
- **AI Descriptions**: Google Gemini API
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Server**: Uvicorn (ASGI)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Frontend
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn** or **pnpm**

### Backend
- **Python** (3.9 or higher)
- **pip** (Python package manager)
- **Supabase Account** (for database and storage)
- **Google Gemini API Key** (for AI-generated descriptions)
- **TensorFlow Model** (`.h5` file) - MobileNetV2 model for disease classification

## 🚀 Getting Started

### Frontend Setup

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

#### 3. Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Backend Setup

See the [Backend README](backend/README.md) for detailed setup instructions.

**Quick Start:**
```bash
cd backend
pip install -r requirements.txt
cp env.template .env
# Edit .env with your Supabase and Gemini API credentials
python run.py
```

The backend API will be available at `http://localhost:8000`

**Required Environment Variables:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key
- `GOOGLE_API_KEY` - Your Google Gemini API key
- `MODEL_PATH` - Path to your TensorFlow model file

## 📁 Project Structure

```
fish/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Base UI components (Button, Card, Dialog, etc.)
│   │   ├── Navbar.tsx      # Navigation bar component
│   │   ├── Footer.tsx      # Footer component
│   │   ├── UploadCard.tsx  # File upload component
│   │   ├── ResultCard.tsx  # Detection result display
│   │   └── Loader.tsx      # Loading animation
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── Detect.tsx      # Disease detection page
│   │   ├── Manual.tsx      # Disease manual page
│   │   ├── Medicines.tsx   # Medicine reference page
│   │   └── Dashboard.tsx   # User dashboard
│   ├── data/               # Mock data files
│   │   ├── fishDiseases.ts
│   │   ├── shrimpDiseases.ts
│   │   └── medicines.ts
│   ├── store/              # Zustand state management
│   │   ├── themeStore.ts   # Theme (dark/light) state
│   │   └── detectionStore.ts # Detection history state
│   ├── utils/              # Utility functions
│   │   ├── api.ts          # Backend API client
│   │   ├── textCleaner.ts  # Text cleaning utilities
│   │   └── cn.ts           # Class name utility
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── style.css           # Global styles and TailwindCSS
├── backend/                # FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── run.py              # Server startup script
│   ├── routers/            # API route handlers
│   │   ├── prediction.py   # Disease prediction endpoint
│   │   ├── disease.py      # Disease information endpoints
│   │   └── auth.py         # Authentication endpoints
│   ├── models/             # TensorFlow model
│   │   ├── loader.py       # Model loading and prediction
│   │   └── fish_disease_model.h5  # TensorFlow model file
│   ├── utils/              # Backend utilities
│   │   └── supabase_client.py  # Supabase client
│   ├── requirements.txt    # Python dependencies
│   └── env.template        # Environment variables template
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (if configured)

## 🎨 Pages Overview

### Home Page (`/`)
- Hero section with app tagline
- 3-step detection flow visualization
- Links to Fish and Shrimp disease manuals
- Medicine category grid

### Disease Detection (`/detect`)
- Drag-and-drop image upload or camera capture
- AI-powered disease detection using TensorFlow MobileNetV2 model
- Google Gemini AI-generated disease descriptions and treatment recommendations
- Results display with confidence percentage
- Structured medicine recommendations with dosage information

### Disease Manual (`/manual`)
- Tabbed interface for Fish and Shrimp diseases
- Disease cards with thumbnails
- Detailed modal views with treatment information
- Symptoms, prevention, and dosage information

### Medicine Reference (`/medicines`)
- Category-based medicine browsing
- Detailed medicine information
- Usage instructions and precautions
- Dosage recommendations

### Dashboard (`/dashboard`)
- Detection history view
- Export to PDF functionality (placeholder)
- Clear history option
- Detailed view of past detections

## 🔧 Configuration

### Theme Toggle
The app includes a dark/light mode toggle that persists your preference in localStorage. The theme is managed via Zustand store in `src/store/themeStore.ts`.

### API Integration
The app is fully integrated with the FastAPI backend:
- Disease detection uses real TensorFlow model predictions
- Disease descriptions and treatments are generated by Google Gemini AI
- Detection history is stored in localStorage (images excluded to save space)
- Backend API endpoint: `POST /predict` (public, no authentication required)

### Environment Variables
**Frontend (`.env` in root):**
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend (`.env` in `backend/`):**
See `backend/env.template` for all required variables.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- **Real AI Detection**: Uses TensorFlow MobileNetV2 model for disease classification
- **AI-Generated Content**: Disease descriptions and treatments are generated by Google Gemini API
- **Detection History**: Results are stored in localStorage (images excluded to save space)
- **Public API**: The `/predict` endpoint is publicly accessible (no authentication required)
- **Fallback Handling**: If Gemini API fails, fallback messages are displayed
- **Image Storage**: Uploaded images are optionally stored in Supabase Storage

## 🤝 Contributing

This is a full-stack application with:
- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: FastAPI + TensorFlow + Google Gemini AI

The backend is already integrated. To extend functionality:

1. Add new API endpoints in `backend/routers/`
2. Update frontend API client in `src/utils/api.ts`
3. Add new components in `src/components/`
4. Update state management in `src/store/`

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

### Adding New Diseases
Edit `src/data/fishDiseases.ts` or `src/data/shrimpDiseases.ts` to add new disease entries.

### Adding New Medicines
Edit `src/data/medicines.ts` to add new medicine entries.

### Customizing Styles
- Global styles: `src/style.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use TailwindCSS classes directly in components

## 🐛 Troubleshooting

### Frontend Issues

**Build Errors:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf node_modules/.vite` (or delete `.vite` folder)

**Port Already in Use:**
- Vite will automatically suggest an alternative port
- Or specify a port: `npm run dev -- --port 3000`

**TypeScript Errors:**
- Ensure all TypeScript types are properly defined
- Run `npm run build` to check for type errors

**API Connection Errors:**
- Ensure the backend server is running on `http://localhost:8000`
- Check `VITE_API_BASE_URL` in `.env` file
- Verify CORS is configured in the backend

### Backend Issues

See [Backend README](backend/README.md) for detailed troubleshooting:
- Model loading issues
- Gemini API configuration
- Supabase connection errors
- Storage upload failures

---

**Built with ❤️ for the aquaculture community**

#
