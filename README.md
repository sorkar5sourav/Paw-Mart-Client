# PawMart 🐾

A modern web platform that connects local pet owners and buyers for adoption and pet care products.

## 🚀 Live Demo

**Deploy Link:** [https://paw-mart-c3eff7.netlify.app/](https://paw-mart-c3eff7.netlify.app/)

## 📋 Overview

PawMart is a full-stack web application designed to make pet adoption and pet supply shopping easier. Users can:

- Browse available pets for adoption and pet care products
- Create and manage their own listings
- Place orders for adoption or purchases
- Download order reports as PDF
- Switch between light and dark themes
- Manage their profile securely with Firebase authentication

## ✨ Key Features

- **Pet Listings & Products** - Browse and search through available pets for adoption and pet supplies
- **User Authentication** - Secure login/registration with Firebase
- **Create Listings** - Post your own pet adoption or product listings
- **Order Management** - View, track, and download your orders as PDF reports
- **Dark Mode** - Toggle between light and dark themes for better UX
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Dynamic Page Titles** - Browser tab title changes based on the current page

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind component library
- **Firebase** - Authentication and real-time updates
- **jsPDF & jsPDF-AutoTable** - PDF export functionality
- **React Hot Toast** - Toast notifications
- **React Spinners** - Loading indicators

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - REST API framework
- **MongoDB** - NoSQL database
- **Firebase Admin SDK** - Server-side authentication verification
- **Deployed on Vercel** - [https://paw-mart-server-side.vercel.app](https://paw-mart-server-side.vercel.app)

### Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar/         # Navigation bar
│   ├── Footer/         # Footer with links and contact info
│   ├── Layout/         # Main layout wrapper
│   ├── Homepage/       # Home page sections
│   ├── ListingPage/    # Listing display components
│   └── ...
├── pages/              # Full page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ListingForm.jsx
│   ├── ListingDetails.jsx
│   ├── MyListings.jsx
│   ├── MyOrders.jsx
│   ├── Pets&Supply.jsx
│   └── ErrorPage.jsx
├── routes/             # Route definitions and guards
│   ├── AppRouter.jsx
│   └── PrivateRoute.jsx
├── context/            # React Context for auth state
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx
├── api/                # API functions
│   ├── listingApi.js
│   ├── orderApi.js
│   └── userApi.js
├── firebase/           # Firebase configuration
│   └── firebaseConfig.js
├── utils/              # Utility functions
│   ├── getAuthToken.js
│   └── downloadOrdersReport.js
└── styles/             # Global and component styles

```

## 🔐 Security Features

- Firebase Authentication for secure user login
- JWT token verification on protected routes
- Environment variables for sensitive API keys
- CORS configuration for safe API communication

## 🎨 UI/UX Highlights

- **Theme Toggle** - Switch between light and dark modes
- **Responsive Layout** - Mobile-first design approach
- **Loading States** - Spinner indicators during data fetches
- **Error Handling** - User-friendly error messages with toast notifications
- **Intuitive Navigation** - Easy-to-use menu and breadcrumb trails

## 📊 Pages & Routes

| Route                  | Purpose                          | Auth Required |
| ---------------------- | -------------------------------- | ------------- |
| `/`                    | Home page with featured listings | No            |
| `/login`               | User login                       | No            |
| `/register`            | User registration                | No            |
| `/pets-supply`         | Browse all pets and supplies     | No            |
| `/listing-details/:id` | View listing details             | Yes           |
| `/add-listing`         | Create new listing               | Yes           |
| `/my-listings`         | Manage user's listings           | Yes           |
| `/my-orders`           | View user's orders               | Yes           |

## 🚀 Deployment

The project is deployed on **Netlify** with automatic builds from the main branch.

**Live URL:** [https://paw-mart-c3eff7.netlify.app/](https://paw-mart-c3eff7.netlify.app/)

## 📝 License

This project is licensed under the MIT License.

## 👨‍💼 Author

**Sourav Sarkar**

- GitHub: [@sorkar5sourav](https://github.com/sorkar5sourav)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact through the website.

---

**Made with ❤️ for pet lovers everywhere**
