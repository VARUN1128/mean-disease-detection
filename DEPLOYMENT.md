# 🚀 Deployment Guide for FinX Aqua

This guide covers deploying both the frontend (Vercel) and backend (separate service).

## 📋 Overview

- **Frontend**: Deploy to Vercel (React/Vite app)
- **Backend**: Deploy to Railway, Render, or similar (FastAPI with TensorFlow)

**Why separate?** The TensorFlow model file is large and requires persistent server resources, which doesn't work well with Vercel's serverless functions.

---

## 🎨 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings (should auto-detect Vite)

5. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com`
   - Add: `VITE_API_URL` = `https://your-backend-url.com` (optional, fallback)

6. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Configure Environment Variables**:
   - In project settings → Environment Variables
   - Add `VITE_API_BASE_URL` = `https://your-backend-url.com`

4. **Deploy**: Vercel will automatically deploy on every push to main branch

---

## 🔧 Backend Deployment Options

### Option A: Railway (Recommended)

Railway is great for Python apps with large dependencies.

1. **Sign up** at [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload code)

3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

4. **Set Environment Variables** in Railway:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   SUPABASE_SERVICE_KEY=your_service_key
   MODEL_PATH=models/fish_disease_mobilenetv2.h5
   GOOGLE_API_KEY=your_gemini_key
   PORT=8000
   ```

5. **Upload Model File**:
   - Railway will include files from your repo
   - Ensure `backend/models/fish_disease_mobilenetv2.h5` is committed (if <100MB)
   - Or use Railway's volume storage for larger files

6. **Get your backend URL** (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Sign up** at [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables** (same as Railway)

4. **Note**: Free tier has limitations, consider paid plan for production

### Option C: Fly.io

1. **Install Fly CLI**: `curl -L https://fly.io/install.sh | sh`

2. **Create `backend/fly.toml`**:
   ```toml
   app = "your-app-name"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [http_service]
     internal_port = 8000
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]

   [[services]]
     protocol = "tcp"
     internal_port = 8000
   ```

3. **Deploy**:
   ```bash
   cd backend
   fly launch
   fly secrets set SUPABASE_URL=... SUPABASE_KEY=... # etc
   fly deploy
   ```

### Option D: Google Cloud Run / AWS Lambda / Azure

For production scale, consider cloud platforms with better resource allocation.

---

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Update Frontend Environment Variable**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Set `VITE_API_BASE_URL` to your backend URL (e.g., `https://your-app.railway.app`)

2. **Redeploy Frontend**:
   ```bash
   vercel --prod
   ```
   Or push a commit to trigger auto-deploy

3. **Test**:
   - Visit your Vercel URL
   - Try uploading an image for disease detection
   - Check browser console for any CORS errors

---

## 🛠️ Troubleshooting

### CORS Issues

If you see CORS errors, ensure your backend has:
```python
# In backend/app.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specific: ["https://your-frontend.vercel.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Model File Not Found

- Ensure `MODEL_PATH` environment variable is set correctly
- Verify model file is included in deployment (check file size limits)
- For large files, consider using cloud storage (S3, GCS) and loading at runtime

### Environment Variables Not Working

- Vercel: Variables must start with `VITE_` to be exposed to frontend
- Backend: Restart service after adding environment variables
- Check variable names match exactly (case-sensitive)

### Build Failures

- **Frontend**: Check `npm run build` works locally first
- **Backend**: Ensure all dependencies in `requirements.txt` are correct
- Check platform-specific build issues (Python version, etc.)

---

## 📝 Quick Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render/etc.
- [ ] Environment variables set in both services
- [ ] `VITE_API_BASE_URL` points to backend URL
- [ ] CORS configured in backend
- [ ] Model file accessible to backend
- [ ] Tested end-to-end (upload image → get prediction)

---

## 🎯 Production Tips

1. **Use Custom Domain**: Add your domain in Vercel settings
2. **Enable HTTPS**: Both services should use HTTPS
3. **Monitor Logs**: Check Vercel and backend logs for errors
4. **Set Up Monitoring**: Consider adding error tracking (Sentry, etc.)
5. **Optimize Model**: Consider model quantization for faster inference
6. **Caching**: Implement caching for predictions if needed
7. **Rate Limiting**: Add rate limiting to backend API

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

