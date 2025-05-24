# Deployment Checklist for Render

## Pre-Deployment Checklist

### ✅ Code Preparation
- [x] Package.json has correct start script (`npm start`)
- [x] Package.json includes Node.js engine version
- [x] Health check endpoints added (`/` and `/health`)
- [x] Environment variables properly configured
- [x] .gitignore includes .env files
- [x] render.yaml configuration file created

### ✅ Environment Variables Ready
- [x] MONGODB_URI (MongoDB Atlas connection string)
- [x] JWT_SECRET (secure random string)
- [x] CLOUDINARY_CLOUD_NAME
- [x] CLOUDINARY_API_KEY
- [x] CLOUDINARY_API_SECRET
- [x] EMAIL_SERVICE (gmail)
- [x] EMAIL_USER
- [x] EMAIL_PASS (Gmail app password)
- [x] EMAIL_FROM
- [x] NODE_ENV (production)

### ✅ Database Setup
- [x] MongoDB Atlas cluster created
- [x] Database user created with proper permissions
- [x] Network access configured (0.0.0.0/0 for Render)
- [x] Connection string tested

### ✅ External Services
- [x] Cloudinary account setup and credentials obtained
- [x] Gmail 2FA enabled and app password generated
- [x] All API keys and secrets secured

## Deployment Steps

### Step 1: Repository Setup
- [ ] Push all code to GitHub repository
- [ ] Ensure .env is not committed (check .gitignore)
- [ ] Verify all files are properly committed

### Step 2: Render Account Setup
- [ ] Create account at render.com
- [ ] Connect GitHub account to Render

### Step 3: Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service settings:
  - Name: `great-marcy-backend`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Plan: Free (or paid)

### Step 4: Environment Variables
Set these in Render dashboard:
- [ ] NODE_ENV=production
- [ ] MONGODB_URI=your_mongodb_connection_string
- [ ] JWT_SECRET=your_jwt_secret
- [ ] CLOUDINARY_CLOUD_NAME=your_cloud_name
- [ ] CLOUDINARY_API_KEY=your_api_key
- [ ] CLOUDINARY_API_SECRET=your_api_secret
- [ ] EMAIL_SERVICE=gmail
- [ ] EMAIL_USER=your_email@gmail.com
- [ ] EMAIL_PASS=your_app_password
- [ ] EMAIL_FROM=your_email@gmail.com

### Step 5: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build and deployment to complete
- [ ] Check deployment logs for any errors

## Post-Deployment Verification

### Step 1: Health Checks
- [ ] Visit: `https://your-app-name.onrender.com/`
- [ ] Visit: `https://your-app-name.onrender.com/health`
- [ ] Verify both endpoints return 200 status

### Step 2: API Testing
- [ ] Test authentication endpoints
- [ ] Test property endpoints
- [ ] Test file upload functionality
- [ ] Test email functionality

### Step 3: Database Connection
- [ ] Verify MongoDB connection in logs
- [ ] Test database operations
- [ ] Run seed script if needed

### Step 4: Performance Check
- [ ] Check response times
- [ ] Monitor memory usage
- [ ] Review error logs

## Troubleshooting Common Issues

### Build Failures
- [ ] Check Node.js version compatibility
- [ ] Verify all dependencies in package.json
- [ ] Review build logs for specific errors

### Runtime Errors
- [ ] Check environment variables are set correctly
- [ ] Verify MongoDB connection string
- [ ] Check Cloudinary credentials
- [ ] Verify email configuration

### Performance Issues
- [ ] Consider upgrading to paid plan
- [ ] Optimize database queries
- [ ] Implement caching if needed

## Final Steps

### Documentation
- [ ] Update README with live URL
- [ ] Document any deployment-specific configurations
- [ ] Create user guide for API endpoints

### Monitoring
- [ ] Set up Render alerts
- [ ] Monitor application logs
- [ ] Set up uptime monitoring

### Security
- [ ] Review CORS settings
- [ ] Verify environment variables are secure
- [ ] Consider rotating secrets

## Success Criteria

✅ Application is accessible at Render URL
✅ Health check endpoints respond correctly
✅ Database connection is working
✅ File uploads work with Cloudinary
✅ Email functionality is working
✅ All API endpoints are functional
✅ No critical errors in logs

## Next Steps After Deployment

1. **Custom Domain**: Configure custom domain in Render
2. **SSL Certificate**: Verify SSL is working (automatic with Render)
3. **Monitoring**: Set up application monitoring
4. **Scaling**: Consider upgrading plan for production use
5. **CI/CD**: Set up automatic deployments on code changes
6. **Backup**: Ensure database backups are configured

---

**Deployment URL**: `https://great-marcy-backend.onrender.com`

**Estimated Deployment Time**: 5-10 minutes

**Support**: Check DEPLOYMENT.md for detailed instructions
