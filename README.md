# 🌟 SunLight - Premium Lighting E-commerce Platform

A comprehensive, modern e-commerce platform for premium lighting products built with React, Vite, Tailwind CSS, and Node.js. Features complete user authentication, shopping cart, newsletter system, and admin dashboard.

## ✨ Features

### 🛍️ **E-commerce Functionality**
- **Complete Shopping Experience**: Product catalog, cart, checkout, and order management
- **User Authentication**: Secure JWT-based registration, login, and email verification
- **Product Management**: Advanced filtering, search, sorting, and detailed product views
- **Order Tracking**: Complete order history with status tracking and reorder functionality
- **User Profiles**: Editable profile information with email verification system

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach that works flawlessly on all devices
- **Dark Mode**: System-aware dark/light theme switching with localStorage persistence
- **Smooth Animations**: Custom CSS animations and ScrollReveal effects
- **Interactive Components**: Product carousels, modals, and hover effects
- **Beautiful Gradients**: Branded orange gradients throughout the interface

### 📧 **Newsletter System**
- **Smart Preferences**: Customizable subscription preferences (deals, products, tips, decor)
- **Admin Dashboard**: Complete newsletter management with subscriber statistics
- **Email Verification**: Confirmation system with unique tokens
- **Analytics**: Subscriber metrics, confirmation rates, and activity tracking

### 🔒 **Security & Performance**
- **Secure Authentication**: bcrypt password hashing and JWT tokens
- **Input Validation**: Comprehensive form validation and sanitization
- **Fast Performance**: Vite-powered development with optimized production builds
- **SEO Friendly**: Semantic HTML and proper meta tags

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and Context API
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **React Router** - Client-side routing for SPA navigation
- **Swiper.js** - Modern touch slider with custom styling
- **ScrollReveal** - Scroll-triggered animations library
- **Remix Icons** - Comprehensive icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **bcryptjs** - Password hashing for secure authentication
- **jsonwebtoken** - JWT implementation for secure sessions
- **fs-extra** - Enhanced file system operations
- **uuid** - Unique identifier generation
- **CORS** - Cross-origin resource sharing middleware
- **Helmet** - Security middleware for Express

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS transformation and optimization
- **Autoprefixer** - Automatic vendor prefixing

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone https://github.com/Satyarthranjan8051/lamp-website-react.git
cd lamp-website-react
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Setup Demo Data (Optional)
```bash
# Create demo users with hashed passwords
cd server
node create-demo-users.js

# Update users with email verification fields
node update-users-verification.js
cd ..
```

### 4. Environment Setup
Create a `.env` file in the server directory:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
```

## 🔧 Development

### Frontend Development
```bash
# Start the React development server
npm run dev
# 🌐 Frontend available at: http://localhost:5173
```

### Backend Development
```bash
# Start the Express server
npm run server
# 🔌 Backend API available at: http://localhost:5000

# Alternative: Start from server directory
cd server
npm run dev
```

### Full Stack Development
```bash
# Start both frontend and backend (if using concurrently)
npm run dev:full
```

### Demo Credentials
For testing the authentication system:
- **Email**: `test@example.com`
- **Password**: `password123`

### Testing Utilities
```bash
# Test password hashing
cd server
node test-password.js

# Test server connectivity
node test-server.js
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Project Structure

```
lamp-website-react/
├── 📂 .github/                 # GitHub workflows and templates
├── 📂 .vscode/                 # VS Code workspace settings
├── 📂 src/                     # Frontend source code
│   ├── 📂 components/          # React components
│   │   ├── Header.jsx          # Navigation with auth integration
│   │   ├── Home.jsx            # Hero section
│   │   ├── Popular.jsx         # Featured products carousel
│   │   ├── Choose.jsx          # Features section
│   │   ├── Products.jsx        # Product showcase
│   │   ├── Join.jsx            # Newsletter with preferences
│   │   ├── Footer.jsx          # Footer section
│   │   ├── QuickCart.jsx       # Sliding cart component
│   │   ├── Cart.jsx            # Cart component
│   │   ├── CartPage.jsx        # Full cart page
│   │   ├── CartPageNew.jsx     # Updated cart page
│   │   ├── CartPageTest.jsx    # Cart page testing
│   │   ├── CheckoutPage.jsx    # Checkout process
│   │   ├── ProductModal.jsx    # Product quick view modal
│   │   ├── ProtectedRoute.jsx  # Route protection component
│   │   ├── SignIn.jsx          # Sign in component (legacy)
│   │   └── SignUp.jsx          # Sign up component (legacy)
│   ├── 📂 pages/               # Route pages
│   │   ├── SignIn.jsx          # User login page
│   │   ├── SignUp.jsx          # User registration page
│   │   ├── Profile.jsx         # User profile management
│   │   ├── Orders.jsx          # Order history
│   │   ├── ProductsPage.jsx    # Complete product catalog
│   │   └── NewsletterAdmin.jsx # Newsletter dashboard
│   ├── 📂 context/             # React Context providers
│   │   ├── CartContext.jsx     # Shopping cart state management
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── 📂 services/            # API services
│   │   └── api.js              # API communication layer
│   ├── 📂 styles/              # Custom styles
│   │   └── swiper-custom.css   # Swiper customizations
│   ├── 📂 assets/              # Static assets
│   │   └── 📂 img/             # Product images and graphics
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles and animations
├── 📂 server/                  # Backend application
│   ├── 📂 routes/              # API route handlers
│   │   ├── auth.js             # Authentication endpoints
│   │   └── orders.js           # Order management endpoints
│   ├── 📂 middleware/          # Express middleware
│   │   └── auth.js             # Authentication middleware
│   ├── 📂 data/                # JSON data storage
│   │   ├── users.json          # User accounts database
│   │   ├── orders.json         # Orders database
│   │   └── newsletter-subscribers.json # Newsletter subscribers
│   ├── 📂 node_modules/        # Backend dependencies
│   ├── index.js               # Express server configuration
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json      # Backend dependency lock
│   ├── .env                   # Environment variables
│   ├── create-demo-users.js   # Demo data generator
│   ├── test-password.js       # Password testing utility
│   ├── test-server.js         # Server connectivity test
│   └── update-users-verification.js # User data updater
├── 📂 node_modules/            # Frontend dependencies
├── 📁 Configuration Files      # Project configuration
│   ├── package.json           # Frontend dependencies and scripts
│   ├── package-lock.json      # Frontend dependency lock
│   ├── vite.config.js         # Vite build configuration
│   ├── tailwind.config.js     # Tailwind CSS customizations
│   ├── postcss.config.js      # PostCSS configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── .gitignore             # Git ignore rules
│   └── index.html             # HTML template
### 📂 **Folder Organization Principles**

- **`/components/`**: Reusable UI components and layout elements
- **`/pages/`**: Route-specific page components for React Router
- **`/context/`**: React Context providers for global state management
- **`/services/`**: API communication and external service integrations
- **`/styles/`**: Custom CSS files and component-specific styling
- **`/assets/`**: Static assets like images, icons, and media files

### 🏗️ **Backend Architecture**

- **`/routes/`**: Express route handlers organized by feature
- **`/middleware/`**: Custom Express middleware for authentication and validation
- **`/data/`**: JSON-based data storage for development (easily replaceable with database)
- **Utility Scripts**: Development tools for testing and data management

### 🔧 **Development vs Production**

The project is structured to support easy migration from development to production:
- **Development**: Uses JSON files for data storage
- **Production Ready**: Middleware and API structure ready for database integration
- **Environment Configs**: Separate configurations for different environments

## 🎨 Design System & Theming

### Color Palette
```css
/* Primary Brand Colors */
--hero-gradient: linear-gradient(90deg, hsl(15, 68%, 42%) 0%, hsl(20, 68%, 80%) 100%);
--second-gradient: linear-gradient(90deg, hsl(20, 72%, 57%) 0%, hsl(20, 78%, 80%) 100%);
--third-gradient: linear-gradient(90deg, hsl(15, 70%, 40%) 0%, hsl(20, 62%, 60%) 100%);

/* Light Mode */
--background: #ffffff;
--surface: #f9fafb;
--text-primary: #111827;
--text-secondary: #6b7280;

/* Dark Mode */
--dark-background: #111827;
--dark-surface: #1f2937;
--dark-text-primary: #f9fafb;
--dark-text-secondary: #d1d5db;
```

### Typography Scale
- **Primary Font**: Poppins (body text, UI elements)
- **Secondary Font**: Montserrat (headings, emphasis)
- **Font Sizes**: Responsive scale from 0.75rem to 3rem
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Layout
- **Container Max-Width**: 1200px (max-w-6xl)
- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Spacing Scale**: Tailwind's default spacing scale (0.25rem increments)
- **Border Radius**: Consistent rounding from 0.5rem to 1.5rem

### Animation System
```css
/* Custom Animations */
@keyframes fade-in { /* Smooth entry animations */ }
@keyframes slide-up { /* Content reveal animations */ }
@keyframes float { /* Decorative element animations */ }
@keyframes spin-slow { /* Background gradient animations */ }
```

### Component Patterns
- **Cards**: Consistent padding, shadows, and border radius
- **Buttons**: Gradient backgrounds with hover states and transitions
- **Forms**: Unified input styling with focus states
- **Modals**: Backdrop blur and smooth transitions

## 🔌 API Endpoints

### Authentication Routes (`/api/auth/`)
- `POST /api/auth/signup` - User registration with email verification
- `POST /api/auth/signin` - User login with JWT token generation
- `POST /api/auth/send-verification` - Send email verification token
- `POST /api/auth/verify-email` - Verify email address with token

### Product Routes (`/api/products/`)
- `GET /api/products` - Get all products with optional filtering
- `GET /api/products/featured` - Get featured/popular products
- `GET /api/products/:id` - Get single product by ID

### Order Routes (`/api/orders/`)
- `GET /api/orders` - Get user's order history
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get specific order details
- `PUT /api/orders/:id` - Update order status

### Newsletter Routes (`/api/newsletter/`)
- `POST /api/newsletter` - Subscribe with preferences (deals, products, tips, decor)
- `GET /api/newsletter/confirm/:token` - Confirm newsletter subscription
- `GET /api/newsletter/stats` - Get newsletter statistics (admin)

### Contact & Support (`/api/contact/`)
- `POST /api/contact` - Submit contact form with user inquiries

### Request/Response Examples

#### User Registration
```javascript
POST /api/auth/signup
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "password123"
}
// Response: { token, user: { id, firstName, lastName, email } }
```

#### Create Order
```javascript
POST /api/orders
{
  "items": [
    { "productId": 1, "quantity": 2, "price": 89.99 },
    { "productId": 3, "quantity": 1, "price": 69.99 }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Anytown", 
    "state": "CA",
    "zipCode": "12345"
  },
  "totalAmount": 249.97
}
// Response: { orderId, status: "pending", estimatedDelivery }
```

#### Newsletter Subscription
```javascript
POST /api/newsletter
{
  "email": "user@example.com",
  "preferences": {
    "weeklyDeals": true,
    "newProducts": true,
    "designTips": false,
    "homeDecor": true
  }
}
// Response: { success: true, message: "Subscription successful" }
```

## 📱 Key Components & Features

### 🧭 **Navigation (Header.jsx)**
- Responsive navigation with mobile menu
- User authentication integration (login/logout/profile)
- Shopping cart icon with item count
- Dark mode toggle with system preference detection
- User dropdown menu with quick access to profile and orders

### 🏠 **Homepage Sections**
- **Hero (Home.jsx)**: Animated landing section with call-to-action
- **Popular (Popular.jsx)**: Featured products carousel with Swiper.js
- **Choose (Choose.jsx)**: Feature highlights and benefits
- **Products (Products.jsx)**: Product showcase with quick add-to-cart
- **Join (Join.jsx)**: Newsletter subscription with preference selection

### 🛒 **E-commerce Features**
- **Shopping Cart**: Persistent cart state with quantity management
- **Product Catalog**: Advanced filtering, search, and sorting capabilities
- **Product Modal**: Quick view with detailed product information
- **Checkout Process**: Secure checkout with order summary
- **Order Management**: Complete order history with tracking

### 👤 **User Account System**
- **Registration**: Secure signup with email verification
- **Authentication**: JWT-based login with bcrypt password hashing
- **Profile Management**: Editable user information and address
- **Email Verification**: Token-based email confirmation system
- **Order History**: Track past purchases and reorder functionality

### 📧 **Newsletter System**
- **Smart Preferences**: Customizable subscription options
  - Weekly Deals & Promotions
  - New Product Announcements  
  - Interior Design Tips
  - Home Decor Inspiration
- **Admin Dashboard**: Comprehensive newsletter analytics
  - Total subscribers and confirmation rates
  - Recent subscription activity
  - Preference distribution analytics
- **Email Management**: Subscription confirmation and management

### 🎨 **Design Features**
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark Mode**: Seamless theme switching with localStorage persistence
- **Custom Animations**: CSS keyframes for enhanced user experience
- **Gradient System**: Branded orange gradients throughout interface
- **Icon Integration**: Remix Icons for consistent visual language

## 🌙 Dark Mode Implementation

The application features a comprehensive dark mode system with the following capabilities:

### Theme Detection & Persistence
- **System Preference**: Automatically detects user's OS theme preference
- **Manual Toggle**: Header toggle button for user preference override
- **localStorage**: Persists theme choice across browser sessions
- **CSS Classes**: Tailwind's `dark:` prefix for seamless theme switching

### Implementation Details
```javascript
// Theme detection and storage
const savedTheme = localStorage.getItem('sunlight-theme')
document.documentElement.classList.toggle('dark', isDarkMode)

// Component-level dark mode styling
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

### Dark Mode Coverage
- ✅ All UI components and pages
- ✅ Form elements and inputs
- ✅ Buttons and interactive elements  
- ✅ Cards, modals, and overlays
- ✅ Product grids and carousels
- ✅ Newsletter and admin dashboard
- ✅ Authentication pages
- ✅ Custom Swiper styles

## 🚀 Performance Optimizations

### Frontend Optimizations
- **Vite Build Tool**: Lightning-fast development and optimized production builds
- **Code Splitting**: Automatic route-based code splitting with React Router
- **Image Optimization**: Optimized product images with proper sizing
- **CSS Purging**: Tailwind CSS purges unused styles in production
- **Bundle Analysis**: Optimized chunk sizes for faster loading

### Backend Optimizations  
- **File-based Storage**: Fast JSON file operations for development
- **Middleware Optimization**: Minimal middleware stack for faster responses
- **CORS Configuration**: Optimized CORS settings for production deployment
- **Security Headers**: Helmet.js for security without performance impact

### User Experience Optimizations
- **Loading States**: Skeleton loaders and spinner animations
- **Error Boundaries**: Graceful error handling throughout the application
- **Responsive Images**: Adaptive image loading based on device capabilities
- **Smooth Animations**: Hardware-accelerated CSS transitions and transforms

## � Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Backend Deployment (Heroku/Railway/DigitalOcean)
```bash
# Set environment variables
export NODE_ENV=production
export PORT=5000
export JWT_SECRET=your-production-jwt-secret

# Start production server
cd server
npm start
```

### Environment Variables
Create production environment files:

**.env.production** (Frontend)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_NODE_ENV=production
```

**.env** (Backend)
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secure-jwt-secret-here
CORS_ORIGIN=https://your-frontend-domain.com
```

### Database Migration
For production, consider migrating from JSON files to a proper database:
- **MongoDB** with Mongoose ODM
- **PostgreSQL** with Prisma ORM  
- **Firebase** for realtime features
- **Supabase** for PostgreSQL with real-time subscriptions

## 🧪 Testing

### Manual Testing Checklist
- ✅ User registration and email verification
- ✅ Login/logout functionality  
- ✅ Shopping cart operations (add/remove/update)
- ✅ Product filtering and search
- ✅ Newsletter subscription with preferences
- ✅ Dark mode toggle and persistence
- ✅ Responsive design across devices
- ✅ Form validation and error handling

### Demo Data & Testing
```bash
# Reset demo data
cd server
node create-demo-users.js

# Test password functionality
node test-password.js

# Verify server connectivity
node test-server.js
```

## 📊 Project Statistics

- **Total Components**: 25+ React components (17 in components/, 6 in pages/, 2 contexts)
- **API Endpoints**: 15+ RESTful endpoints across 4 route categories
- **Authentication**: JWT + bcrypt secure authentication with middleware
- **Database**: JSON file-based storage (users, orders, newsletter subscribers)
- **Styling**: 1000+ Tailwind utility classes with custom animations
- **Animations**: 10+ custom CSS animations and transitions
- **Routes**: 8 main application routes with protected routes
- **Backend Middleware**: Custom authentication and security middleware
- **File Structure**: Well-organized modular architecture
- **Configuration Files**: 7 configuration files for build tools and linting
- **Development Tools**: 4 utility scripts for testing and data management
- **Responsive Breakpoints**: 5 responsive design breakpoints (sm, md, lg, xl, 2xl)
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)

## 🤝 Contributing

We welcome contributions to the SunLight project! Here's how you can help:

### Development Workflow
1. **Fork** the repository on GitHub
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/lamp-website-react.git
   ```
3. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Make** your changes with proper commit messages
   ```bash
   git commit -m "feat: add amazing new feature with tests"
   ```
5. **Push** to your fork and submit a **Pull Request**
   ```bash
   git push origin feature/amazing-new-feature
   ```

### Contribution Guidelines
- **Code Style**: Follow existing ESLint and Prettier configurations
- **Commit Messages**: Use conventional commit format (feat:, fix:, docs:, etc.)
- **Testing**: Ensure your changes don't break existing functionality
- **Documentation**: Update README.md for any new features or changes
- **Responsive Design**: Test on multiple screen sizes and devices

### Areas for Contribution
- 🚀 **Features**: Payment integration, product reviews, wishlist functionality
- 🎨 **Design**: UI/UX improvements, animations, accessibility enhancements  
- 🔧 **Backend**: Database migration, caching, performance optimizations
- 📱 **Mobile**: PWA features, mobile-specific optimizations
- 🧪 **Testing**: Unit tests, integration tests, E2E testing
- 📚 **Documentation**: API documentation, component documentation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ **Commercial Use**: Use this project in commercial applications
- ✅ **Modification**: Modify and distribute your changes  
- ✅ **Distribution**: Share and distribute the code
- ✅ **Private Use**: Use privately without restrictions
- ❗ **Limitation**: No warranty or liability provided

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Swiper.js** - For the modern slider library
- **Remix Icons** - For the beautiful icon library
- **Community** - For inspiration and feedback

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Satyarthranjan8051/lamp-website-react/issues)
- **Email**: satyarthranjan8051@gmail.com
- **LinkedIn**: [Connect with the developer](https://linkedin.com/in/satyarthranjan8051)

---

<div align="center">

**Made with ❤️ using React, Vite, Tailwind CSS, and Node.js**

⭐ **Star this repository if you found it helpful!** ⭐

[🌟 **Live Demo**](https://your-deployed-app.vercel.app) | [📖 **Documentation**](https://github.com/Satyarthranjan8051/lamp-website-react/wiki) | [🐛 **Report Bug**](https://github.com/Satyarthranjan8051/lamp-website-react/issues)

</div>
