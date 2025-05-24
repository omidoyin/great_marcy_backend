# Great Marcy Real Estate Backend

This is the backend API for the Great Marcy Real Estate Company Website built with Node.js, Express, and MongoDB.

## 🚀 Live Deployment

**Production URL**: `https://great-marcy-backend.onrender.com`

- **Health Check**: [https://great-marcy-backend.onrender.com/](https://great-marcy-backend.onrender.com/)
- **API Health**: [https://great-marcy-backend.onrender.com/health](https://great-marcy-backend.onrender.com/health)

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing
- **Render** - Hosting platform

## 🚀 Deployment

This application is configured for easy deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Render

1. **Fork/Clone this repository**
2. **Push to your GitHub account**
3. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
4. **Configure Environment Variables** (see below)
5. **Deploy!**

## 📋 Features

- User authentication and authorization
- Property management (lands, houses, apartments)
- Service management
- Payment processing
- Admin panel
- Portfolio management
- Favorites system
- Image upload with Cloudinary
- Email notifications
- Health check endpoints for monitoring

## 🔧 Local Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Gmail account (for email service)

### Installation

1. **Clone the repository**:

```bash
git clone <your-repository-url>
cd great_marcy_backend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Environment Setup**:

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

4. **Start development server**:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🌍 Environment Variables

### Required for Production

```env
# Server Configuration
PORT=10000
NODE_ENV=production

# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_secure_jwt_secret

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
```

### Setting Up Environment Variables

1. **MongoDB Atlas**: Create cluster and get connection string
2. **Cloudinary**: Sign up and get API credentials
3. **Gmail**: Enable 2FA and create app password
4. **JWT Secret**: Generate a secure random string

## 📡 API Endpoints

### Health & Status

- `GET /` - API status and health check
- `GET /health` - Detailed health information

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Properties

- `GET /api/lands` - Get all lands
- `POST /api/lands` - Create new land (admin only)
- `GET /api/houses` - Get all houses
- `POST /api/houses` - Create new house (admin only)
- `GET /api/apartments` - Get all apartments
- `POST /api/apartments` - Create new apartment (admin only)

### Services

- `GET /api/services` - Get all services
- `POST /api/services` - Create new service (admin only)

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/properties` - Get all properties (admin only)

### Favorites

- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Payments

- `POST /api/payments` - Process payment
- `GET /api/payments` - Get payment history

### Portfolio

- `GET /api/portfolio` - Get portfolio items
- `POST /api/portfolio` - Add portfolio item (admin only)

## 🗄 Database Seeding

To populate the database with sample data:

```bash
npm run seed
```

## 📜 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests
- `npm run build` - Build command (no-op for Node.js)

## 📁 Project Structure

```
src/
├── controllers/     # Route controllers
│   ├── authController.js
│   ├── apartmentController.js
│   ├── houseController.js
│   ├── landController.js
│   ├── serviceController.js
│   ├── paymentController.js
│   ├── adminController.js
│   ├── portfolioController.js
│   └── favoriteController.js
├── middlewares/     # Custom middlewares
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/         # Mongoose models
│   ├── User.js
│   ├── Apartment.js
│   ├── House.js
│   ├── Land.js
│   ├── Service.js
│   ├── Payment.js
│   ├── Favorite.js
│   ├── Announcement.js
│   ├── Inspection.js
│   └── Team.js
├── routes/         # API routes
│   ├── authRoutes.js
│   ├── apartmentRoutes.js
│   ├── houseRoutes.js
│   ├── landRoutes.js
│   ├── serviceRoutes.js
│   ├── paymentRoutes.js
│   ├── adminRoutes.js
│   ├── portfolioRoutes.js
│   └── favoriteRoutes.js
├── seeds/          # Database seeders
│   ├── index.js
│   ├── apartmentSeeds.js
│   ├── houseSeeds.js
│   ├── landSeeds.js
│   ├── serviceSeeds.js
│   ├── announcementSeeds.js
│   ├── inspectionSeeds.js
│   └── teamSeeds.js
├── utils/          # Utility functions
│   └── cloudinary.js
├── app.js          # Express app configuration
└── server.js       # Server entry point
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Environment variable protection
- Input validation
- Error handling middleware

## 📊 Monitoring & Logging

- Request/response logging
- Authentication logging
- Health check endpoints
- Error tracking
- Performance monitoring

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection**: Verify MongoDB Atlas connection string and network access
2. **Environment Variables**: Ensure all required variables are set
3. **CORS Issues**: Check frontend URL in CORS configuration
4. **Image Upload**: Verify Cloudinary credentials
5. **Email Service**: Check Gmail app password and 2FA settings

### Support

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Review Render logs for runtime errors
- Verify environment variables in Render dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Great Marcy Real Estate** - Building the future of real estate technology.

---

**Ready to deploy?** Follow the [deployment guide](./DEPLOYMENT.md) to get your application live on Render!
