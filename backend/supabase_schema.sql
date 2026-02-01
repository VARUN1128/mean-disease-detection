-- Supabase Database Schema for FinX Aqua
-- Run this SQL in your Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diseases table
CREATE TABLE IF NOT EXISTS diseases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    common_treatment TEXT NOT NULL,
    medicine_suggestion TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Uploads table (stores predictions)
CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    prediction TEXT NOT NULL,
    confidence DECIMAL(5, 4) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs table
CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_created_at ON uploads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_diseases_name ON diseases(name);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Service role can insert users" ON users;

-- Create policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

-- Allow users to insert their own data during registration
-- This policy allows insertion when the user_id matches the authenticated user
CREATE POLICY "Users can insert their own data"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Note: Service role key bypasses RLS, so we don't need a separate policy for it
-- The backend uses SUPABASE_SERVICE_KEY which automatically bypasses all RLS policies

-- RLS Policies for diseases table (public read access)
DROP POLICY IF EXISTS "Diseases are viewable by everyone" ON diseases;
CREATE POLICY "Diseases are viewable by everyone"
    ON diseases FOR SELECT
    USING (true);

-- RLS Policies for uploads table
DROP POLICY IF EXISTS "Users can view their own uploads" ON uploads;
DROP POLICY IF EXISTS "Users can insert their own uploads" ON uploads;

CREATE POLICY "Users can view their own uploads"
    ON uploads FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own uploads"
    ON uploads FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for logs table
DROP POLICY IF EXISTS "Users can view their own logs" ON logs;
DROP POLICY IF EXISTS "Users can insert their own logs" ON logs;

CREATE POLICY "Users can view their own logs"
    ON logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs"
    ON logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for fish-uploads (if it doesn't exist)
-- Note: This requires running in Supabase Dashboard > Storage > Create Bucket
-- Bucket name: fish-uploads
-- Public: Yes (or configure policies as needed)

