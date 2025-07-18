# SunLight - Modern Lamp Website

A modern, responsive lamp/lighting e-commerce website built with React, Vite, Tailwind CSS, and Node.js.

## ✨ Features

- **Modern Design**: Beautiful gradients and smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Product Showcase**: Interactive product carousels with Swiper.js
- **Smooth Scrolling**: ScrollReveal animations for enhanced UX
- **Newsletter**: Email subscription functionality
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Modern slider/carousel library
- **ScrollReveal** - Scroll animations library
- **Remix Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lamp-website-react
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## 🔧 Development

1. **Start the development server (Frontend)**
   ```bash
   npm run dev
   ```

2. **Start the backend server**
   ```bash
   npm run server
   ```
   or
   ```bash
   cd server
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## 🏗️ Build

```bash
npm run build
```

## 📁 Project Structure

```
lamp-website-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Popular.jsx
│   │   ├── Choose.jsx
│   │   ├── Products.jsx
│   │   ├── Join.jsx
│   │   └── Footer.jsx
│   ├── assets/
│   │   └── img/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js
│   └── package.json
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Orange gradients (#DE5209 to #F6B571)
- **Secondary**: Warm grays and whites
- **Dark Mode**: Deep grays with orange accents

### Typography
- **Primary Font**: Poppins
- **Secondary Font**: Montserrat

## 🔌 API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/contact` - Submit contact form

## 📱 Components

- **Header**: Navigation with dark mode toggle
- **Home**: Hero section with animated elements
- **Popular**: Featured products carousel
- **Choose**: Why choose us section with features
- **Products**: Complete product showcase
- **Join**: Newsletter subscription
- **Footer**: Links and company information

## 🌙 Dark Mode

The application supports system-preferred and manual dark mode switching. Dark mode preferences are handled through Tailwind CSS dark mode classes.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ using React, Vite, and Tailwind CSS
