# Evanto Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments from GitHub
- ✅ Perfect for React/Vite projects
- ✅ Free tier with generous limits
- ✅ Built-in environment variable management
- ✅ Custom domain support

**Steps:**
1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Production ready - cleaned up development files"
   git push origin uat
   ```

2. **Go to [vercel.com](https://vercel.com)**
3. **Sign up with GitHub**
4. **Import your repository**
5. **Add environment variables:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`

6. **Deploy!** (Automatic)

### Option 2: Netlify

**Steps:**
1. **Go to [netlify.com](https://netlify.com)**
2. **Connect GitHub repository**
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Add environment variables**
5. **Deploy**

### Option 3: Railway

**Steps:**
1. **Go to [railway.app](https://railway.app)**
2. **Connect GitHub**
3. **Add environment variables**
4. **Deploy**

## 🔧 Environment Variables Needed

Create these in your deployment platform:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📋 Pre-Deployment Checklist

- [x] Code committed to Git
- [x] Build works (`npm run build`)
- [x] Environment variables ready
- [x] Supabase project configured
- [x] Stripe account set up
- [x] Google Maps API key obtained

## 🌐 Custom Domain Setup

After deployment:
1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Add domain in Vercel/Netlify**
3. **Update DNS records**
4. **SSL certificate** (automatic)

## 📊 Post-Deployment

1. **Test all features:**
   - User registration/login
   - Event creation/booking
   - Payment processing
   - Mobile responsiveness

2. **Monitor performance:**
   - Core Web Vitals
   - Error tracking
   - User analytics

3. **Set up monitoring:**
   - Sentry for error tracking
   - Google Analytics
   - Uptime monitoring

## 🎯 Recommended: Vercel Deployment

**Why Vercel is perfect for Evanto:**
- **Instant deployments** from GitHub
- **Automatic HTTPS** and CDN
- **Edge functions** for API routes
- **Preview deployments** for branches
- **Analytics** built-in
- **Free tier** covers personal projects

**Next Steps:**
1. Commit your changes
2. Push to GitHub
3. Connect to Vercel
4. Add environment variables
5. Deploy!

Your Evanto app will be live in minutes! 🚀
