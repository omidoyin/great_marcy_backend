# Deployment Guide for Great Marcy Real Estate Backend

This guide will help you deploy your Node.js backend application to Render.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Your database is already configured with MongoDB Atlas

## Step-by-Step Deployment Process

### 1. Prepare Your Repository

Your repository is already configured with:
- ✅ `package.json` with proper start script
- ✅ `render.yaml` configuration file
- ✅ Health check endpoints (`/` and `/health`)
- ✅ Environment variables setup

### 2. Deploy to Render

#### Option A: Using Render Dashboard (Recommended)

1. **Sign in to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `great-marcy-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid plan for better performance)

4. **Set Environment Variables**
   Add these environment variables in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://omidoyinayodeji:greatmarcy@real-estate.e9vt9zg.mongodb.net/?retryWrites=true&w=majority&appName=real-estate
   JWT_SECRET=ec8ee681a8abd22df011361cdf9940e537c1b51c500f0cdb649371377d048ed7279d91b1cb89c51410308e89c8a4cc51a6ebc99b2fdb6a0846dc44d429d577b2
   CLOUDINARY_CLOUD_NAME=dp6pmwcqu
   CLOUDINARY_API_KEY=952184646629768
   CLOUDINARY_API_SECRET=1SM7twK94ouxeRHYI7BeXiTbsJU
   EMAIL_SERVICE=gmail
   EMAIL_USER=omidoyinayodeji@gmail.com
   EMAIL_PASS=nrqjlalkahrcrsab
   EMAIL_FROM=omidoyinayodeji@gmail.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

#### Option B: Using render.yaml (Infrastructure as Code)

1. **Connect Repository**
   - In Render dashboard, go to "Blueprint"
   - Click "New Blueprint Instance"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **Set Environment Variables**
   - You'll need to manually set the environment variables marked with `sync: false`

### 3. Verify Deployment

Once deployed, your application will be available at:
`https://great-marcy-backend.onrender.com`

Test these endpoints:
- **Health Check**: `GET /`
- **API Health**: `GET /health`
- **API Routes**: `GET /api/auth`, `/api/lands`, etc.

### 4. Configure CORS for Frontend

Update your frontend application to use the new Render URL:
```javascript
const API_BASE_URL = 'https://great-marcy-backend.onrender.com/api';
```

### 5. Database Connection

Your MongoDB Atlas database should work automatically since:
- ✅ Connection string is properly configured
- ✅ MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- ✅ Render's IP addresses are whitelisted by default

## Important Notes

### Free Tier Limitations
- **Cold Starts**: Free services sleep after 15 minutes of inactivity
- **Build Time**: Limited build minutes per month
- **Performance**: Shared resources

### Security Considerations
- ✅ Environment variables are properly configured
- ✅ Sensitive data is not committed to repository
- ⚠️ Consider rotating JWT secret for production
- ⚠️ Review CORS settings for production

### Monitoring
- Use Render's built-in logs and metrics
- Monitor application performance
- Set up alerts for downtime

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs in Render dashboard

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas
   - Ensure environment variables are set correctly

3. **Application Not Starting**
   - Check start command in package.json
   - Review application logs
   - Verify PORT environment variable usage

### Support
- Render Documentation: [render.com/docs](https://render.com/docs)
- MongoDB Atlas Support: [mongodb.com/support](https://mongodb.com/support)

## Next Steps

1. **Custom Domain**: Configure a custom domain in Render settings
2. **SSL Certificate**: Render provides free SSL certificates
3. **Monitoring**: Set up application monitoring and alerts
4. **Scaling**: Consider upgrading to paid plans for better performance
5. **CI/CD**: Set up automatic deployments on code changes
