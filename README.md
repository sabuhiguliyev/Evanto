# Evanto - Event Discovery Platform

A modern, mobile-first event discovery and booking platform built with React, TypeScript, and Supabase. Evanto helps users discover, book, and manage events and meetups in their area.

## 🚀 Features

### Core Functionality
- **Event Discovery**: Browse and search events by location, category, and date
- **Event Booking**: Secure booking system with payment processing
- **User Authentication**: Email/password and social login (Google, Apple)
- **Profile Management**: User profiles with interests and preferences
- **Favorites System**: Save and manage favorite events
- **Ticket Management**: View and manage booked tickets
- **Real-time Updates**: Live event updates and notifications

### User Experience
- **Mobile-First Design**: Optimized for mobile devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Responsive Layout**: Works seamlessly across all screen sizes
- **Smooth Animations**: Framer Motion powered interactions
- **Accessibility**: WCAG compliant with keyboard navigation support

### Event Management
- **Event Creation**: Organizers can create and manage events
- **Event Categories**: Music, Sports, Art, Tech, Food, Education, Business
- **Location Services**: GPS-based event discovery
- **Date/Time Management**: Flexible scheduling with timezone support
- **Capacity Management**: Event capacity and availability tracking

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Component library for consistent UI
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management

### Backend & Services
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Database security
- **Supabase Auth** - Authentication system
- **Supabase Storage** - File and image storage

### Payment & Integrations
- **Stripe** - Payment processing
- **Google Maps API** - Location services
- **Geolocation API** - User location detection
- **ICal Generation** - Calendar integration

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Vite** - Build tooling


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd evanto
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Database Setup**
- Create a new Supabase project
- Run the database migrations (if available)
- Set up Row Level Security policies
- Configure authentication providers

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

6. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
evanto/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── ui/
│   ├── contexts/
│   ├── features/
│   │   ├── account/
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── events/
│   │   ├── favorites/
│   │   ├── profile/
│   │   ├── search/
│   │   └── support/
│   ├── hooks/
│   ├── lib/
│   ├── stores/
│   └── types/
├── .env.local
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### Supabase Setup
1. Create a new Supabase project
2. Enable authentication providers (Email, Google, Apple)
3. Set up database tables:
   - `users` - User profiles and preferences
   - `events` - Event information
   - `bookings` - User bookings
   - `favorites` - User favorite events
4. Configure Row Level Security policies
5. Set up storage buckets for images

### Stripe Integration
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhook endpoints
4. Configure payment methods

### Google Maps
1. Enable Google Maps API
2. Set up billing account
3. Configure API restrictions


## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

### Environment Variables
Ensure all production environment variables are set:
- Supabase URL and keys
- Stripe keys
- Google Maps API key
- Domain configuration


## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component-based architecture

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure
- **Material-UI** - Component library
- **Tailwind CSS** - Styling framework
- **React Community** - Open source ecosystem

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**Built with ❤️ by the Evanto Team**
