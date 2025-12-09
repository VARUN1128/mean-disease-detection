# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy your `Project URL` (SUPABASE_URL)
   - Copy your `anon public` key (SUPABASE_KEY)
   - Copy your `service_role` key (SUPABASE_SERVICE_KEY) - keep this secret!

3. **Set Up Database**
   - Go to SQL Editor in Supabase dashboard
   - Run `supabase_schema.sql` to create all tables
   - Run `seed_diseases.sql` to populate disease data

4. **Create Storage Bucket**
   - Go to Storage in Supabase dashboard
   - Click "Create a new bucket"
   - Name: `fish-uploads`
   - Make it **Public**
   - Click "Create bucket"

### 3. Configure Environment

1. Create `.env` file in the `backend` directory:
```bash
# Copy the template
cp env.template .env
```

2. Edit `.env` and add your Supabase credentials:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
MODEL_PATH=models/fish_disease_model.h5
HOST=0.0.0.0
PORT=8000
DEBUG=True
ALLOWED_ORIGINS=*
```

### 4. Add Your Model File

Place your TensorFlow `.h5` model file in:
```
backend/models/fish_disease_model.h5
```

Or update `MODEL_PATH` in `.env` to point to your model location.

### 5. Run the Server

**Option 1: Using the run script**
```bash
python run.py
```

**Option 2: Using uvicorn directly**
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 6. Test the API

1. Open your browser and go to: `http://localhost:8000/docs`
2. You should see the interactive API documentation
3. Try the `/health` endpoint to verify the server is running
4. Test registration: `POST /auth/register`
5. Test login: `POST /auth/login`
6. Test prediction: `POST /predict` (requires authentication)

## Troubleshooting

### Model Not Loading
- Check that `MODEL_PATH` in `.env` points to a valid `.h5` file
- Verify the file exists and has read permissions
- Check the console for error messages

### Supabase Connection Errors
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check that your Supabase project is active
- Ensure you have internet connectivity

### Storage Upload Fails
- Verify the `fish-uploads` bucket exists
- Check that the bucket is set to Public
- Verify your `SUPABASE_KEY` has storage permissions

### Import Errors
- Make sure you're running from the `backend` directory
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check that Python version is 3.9 or higher: `python --version`

### Authentication Issues
- Verify JWT token is being sent in Authorization header
- Check token format: `Bearer <token>`
- Ensure user is registered and logged in

## Next Steps

1. **Connect Frontend**: Update your React frontend to call the backend API
2. **Update API URL**: Change frontend API calls to point to `http://localhost:8000`
3. **Test Integration**: Upload an image from the frontend and verify predictions
4. **Deploy**: When ready, deploy to a hosting service (Railway, Render, etc.)

## Production Deployment

Before deploying to production:

1. Set `DEBUG=False` in `.env`
2. Update `ALLOWED_ORIGINS` to your frontend domain
3. Use environment variables (don't commit `.env`)
4. Enable HTTPS
5. Set up proper logging
6. Consider using a production ASGI server (Gunicorn + Uvicorn)

## Support

For issues or questions:
- Check the main `README.md` for detailed documentation
- Review `POSTMAN_EXAMPLES.md` for API usage examples
- Check Supabase documentation for database/storage issues

