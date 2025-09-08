# Evanto 2.0 - Core Architecture Documentation

## 📋 Project Overview

**Evanto** is an event and meetup platform similar to Eventbrite, designed for both event organizers and attendees. The platform enables users to create, discover, and book events and meetups with a mobile-first approach.

### Target Users
- **Event Organizers**: Create and manage events/meetups
- **Attendees**: Discover, book, and attend events/meetups

---

## 🏗️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: 
  - Zustand (local/UI state)
  - TanStack Query (remote/server state)
- **UI Library**: Material-UI (MUI) v5
- **Styling**: MUI + Tailwind CSS
- **Routing**: React Router DOM
- **Date Handling**: date-fns + MUI X Date Pickers

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + TypeScript
- **Code Formatting**: Prettier

---

## 🎨 Design System & Styling

### Styling Approach
- **Primary**: Material-UI components with built-in theming
- **Customization**: Tailwind CSS for component-specific styling
- **Reusability**: Custom Tailwind classes in `tailwind.css` for repetitive UI elements
- **Container**: Custom `Container` component as main layout wrapper

### Design Principles
- **Mobile-First**: All components designed for mobile use
- **Responsive**: Built-in MUI responsive breakpoints
- **Consistent**: Reusable Tailwind classes for common patterns
- **Clean**: Minimal, uncluttered interface

### Example Tailwind Classes
```css
/* Custom reusable classes */
.text-input { @apply w-full px-3 py-2 border border-gray-300 rounded-md; }
.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700; }
.container-main { @apply max-w-md mx-auto p-4; }
```

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── forms/           # Form components
│   ├── icons/           # Icon components
│   └── index.ts         # Component exports
├── features/            # Feature-specific components
│   ├── auth/            # Authentication features
│   ├── events/          # Event management
│   ├── meetups/         # Meetup management
│   ├── bookings/        # Booking system
│   ├── home/            # Home page
│   ├── search/          # Search functionality
│   ├── filter/          # Filtering
│   ├── favorites/       # User favorites
│   ├── account/         # User account
│   ├── tickets/         # Ticket management
│   ├── development/     # Development tools
│   └── index.ts         # Feature exports
├── hooks/               # Custom React hooks
│   ├── useEntity.ts     # Generic CRUD hook factory
│   ├── entityConfigs.ts # Entity-specific hook configurations
│   ├── useUnifiedItems.ts # Unified event/meetup hooks
│   ├── useRealtimeUpdates.ts # Real-time updates
│   ├── useFavorite.ts   # Favorites management
│   ├── usePagination.ts # Pagination logic
│   ├── usePaymentCards.ts # Payment methods
│   ├── useSupabaseAuthSync.ts # Auth synchronization
│   └── index.ts         # Hook exports
├── lib/                 # Library configurations
│   ├── queryClient.ts   # TanStack Query configuration
│   └── ThemeContext.tsx # Theme provider
├── routes/              # Application routing
│   └── index.tsx        # Route definitions
├── services/            # API and data services
│   ├── dataService.ts   # Supabase data operations
│   └── index.ts         # Service exports
├── store/               # Zustand state management
│   ├── userStore.ts     # User authentication state
│   ├── filtersStore.ts  # Filter and search state
│   ├── dataStore.ts     # Data management state
│   ├── bookingStore.ts  # Booking flow state
│   ├── geoStore.ts      # Geolocation state
│   └── appStore.ts      # Application-wide state
├── utils/               # Utility functions
│   ├── schemas.ts       # Zod schemas and types
│   ├── supabase.ts      # Supabase client
│   ├── format.ts        # Date/time formatting
│   ├── geo.ts           # Geolocation utilities
│   ├── notifications.ts # Toast notifications
│   ├── filterUtils.ts   # Filtering utilities
│   └── index.ts         # Utility exports
├── assets/              # Static assets
│   └── icons/           # SVG icons
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── tailwind.css         # Custom Tailwind classes
```

---

## 🎯 Core Development Principles

### 1. **Centralized, Not Duplicated**
- **Single Source of Truth**: Each piece of data/logic exists in one place
- **Centralized Exports**: All modules export through index files
- **Shared Utilities**: Common functions in `src/utils/`
- **Unified Types**: All schemas in `src/utils/schemas.ts`
- **Consolidated Services**: All API calls in `src/services/`

### 2. **Built-in First Approach**
- **MUI Components**: Use MUI components before custom ones
- **MUI Theming**: Leverage MUI's built-in theming system
- **TanStack Query**: Use built-in caching, loading, error states
- **Zustand**: Use built-in state management patterns
- **Supabase**: Use built-in RLS, real-time, auth features

### 3. **Consistency Patterns**
- **Import Strategy**: Always use centralized exports (`@/hooks`, `@/services`)
- **State Management**: Clear separation (Zustand = local, TanStack = remote)
- **Component Structure**: Consistent prop patterns and naming
- **Error Handling**: Centralized error handling patterns
- **Type Safety**: Zod schemas for all data validation

### 4. **Avoid Over-Engineering**
- **Simple Solutions**: Choose simple over complex
- **Reuse Existing**: Build on what's already there
- **Minimal Dependencies**: Only add what's necessary
- **Clean Code**: Readable, maintainable, not clever

### 5. **Mobile-First Consistency**
- **Container Wrapper**: All content in custom Container component
- **Touch-Friendly**: Consistent touch target sizes
- **Responsive**: MUI breakpoints for all components
- **Performance**: Optimized for mobile devices

---

## 🏛️ Core Architecture

### 1. Data Layer (Services)
**Location**: `src/services/`

Centralized data access layer using Supabase client:

```typescript
// Core data operations
- getEvents() / createEvent() / updateEvent() / deleteEvent()
- getMeetups() / createMeetup() / updateMeetup() / deleteMeetup()
- getUsers() / createUser() / updateUser() / deleteUser()
- getUserBookings() / createBooking() / updateBookingStatus()
- getAllItems() / getItemById() // Unified events + meetups
- fetchFavorites() / addFavorite() / deleteFavorite()
- fetchUserProfile() / updateUserProfile()
- fetchPaymentCards() / createPaymentCard()
```

### 2. State Management
**Location**: `src/store/`

#### Zustand Stores (Local/UI State)
- **userStore**: Authentication, user profile
- **filtersStore**: Search filters, categories, price range
- **dataStore**: UI state for meetup creation flow
- **bookingStore**: Booking form state, selected seats
- **geoStore**: User location, city, country
- **appStore**: Modal states, loading states, navigation

#### TanStack Query (Remote/Server State)
- **useEvents**: Event CRUD operations
- **useMeetups**: Meetup CRUD operations
- **useUsers**: User management
- **useBookings**: Booking operations
- **useUnifiedItems**: Combined events + meetups
- **useRealtimeUpdates**: Real-time data synchronization

### 3. Type System
**Location**: `src/utils/schemas.ts`

Centralized Zod schemas and TypeScript types:

```typescript
// Core entities
- Event, Meetup, User, Booking, Favorite, PaymentMethod
- UnifiedItem, UnifiedItemProperties
- AuthProvider, UserProfile, BookingFormData

// Validation schemas
- eventSchema, meetupSchema, userSchema
- bookingSchema, favoriteSchema, paymentMethodSchema
```

### 4. Hooks Architecture
**Location**: `src/hooks/`

#### Generic Hook Factory
- **useEntity.ts**: Generic CRUD hook factory
- **entityConfigs.ts**: Entity-specific configurations

#### Specialized Hooks
- **useUnifiedItems**: Unified event/meetup data
- **useRealtimeUpdates**: Real-time synchronization
- **useFavorite**: Favorites management
- **usePagination**: Pagination logic
- **usePaymentCards**: Payment methods
- **useSupabaseAuthSync**: Auth state synchronization

---

## 🔄 Data Flow

### 1. Data Fetching Flow
```
Component → Hook → TanStack Query → Service → Supabase → Database
```

### 2. State Management Flow
```
User Action → Store Action → State Update → Component Re-render
```

### 3. Real-time Updates
```
Supabase Realtime → useRealtimeUpdates → TanStack Query Invalidation → UI Update
```

---

## 🎯 Key Features

### Event Management
- Create, edit, delete events
- Event categorization and filtering
- Image upload and management
- Location-based events

### Meetup Management
- Create, edit, delete meetups
- Online/offline meetups
- Participant management
- Meetup links and details

### Booking System
- Event/meetup booking
- Seat selection (for events)
- Payment integration
- Booking confirmation

### User Management
- Authentication (email, OAuth)
- User profiles
- Favorites system
- Booking history

### Search & Discovery
- Text-based search
- Category filtering
- Location-based filtering
- Date range filtering
- Price range filtering

---

## 🛠️ Development Guidelines

### Core Principles (MUST FOLLOW)
- **Centralized, Not Duplicated**: Single source of truth for all data/logic
- **Built-in First**: Use MUI, TanStack Query, Zustand built-in features before custom
- **Consistency**: Follow established patterns and naming conventions
- **Simple Over Complex**: Choose simple solutions, avoid over-engineering

### Code Organization
- **Single Responsibility**: Each file has one clear purpose
- **Separation of Concerns**: UI, logic, and data layers separated
- **DRY Principle**: Reusable components and utilities
- **Clean Code**: Readable, maintainable, well-documented

### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

### Import/Export Strategy
- **Centralized Exports**: Index files for clean imports
- **Named Exports**: Prefer named exports over default
- **Path Aliases**: Use `@/` for clean import paths

### State Management Rules
- **Zustand**: Local UI state, form state, temporary data
- **TanStack Query**: Server state, caching, synchronization
- **Avoid Duplication**: Single source of truth for each data type

---

## 🔧 Configuration Files

### Vite Configuration
- **Path Aliases**: `@/` → `src/`
- **TypeScript**: Strict mode enabled
- **React**: JSX transform

### Tailwind Configuration
- **Custom Classes**: Defined in `tailwind.css`
- **MUI Integration**: Compatible with MUI components
- **Responsive**: Mobile-first approach

---

## 🎨 Design System & Styling Guidelines

### Color Palette
**Location**: `tailwind.config.js` - colors section

#### Primary Colors
- **Primary**: `#5D9BFC` - Main brand color for buttons, links, active states
- **Secondary**: `#1C2039` - Dark gray/blue for containers, icon backgrounds
- **Neutral Light**: `#F3F4F6` - Light gray backgrounds
- **Neutral Dark**: `#666666` - Medium gray text

#### Text Colors
- **Primary Text**: `#000000` - Black for headlines and important text
- **Secondary Text**: `#888888` - Gray for paragraphs and descriptions
- **Muted Text**: `#AAAAAA` - Light gray for hints and labels
- **Label Text**: `#666666` - Dark gray for form labels

#### Dark Mode Colors
- **Dark Background**: `#1C2039` - Main dark background
- **Dark Paper**: `#1C2039` - Same as background (no separate card backgrounds)
- **Dark Text Primary**: `#FFFFFF` - White text for headlines
- **Dark Text Secondary**: `#B0B0B0` - Light gray text for content
- **Dark Text Muted**: `#808080` - Muted text in dark mode
- **Dark Border**: `#333333` - Dark borders

### Typography System
**Location**: `tailwind.config.js` - fontSize section

#### Font Families
- **Primary**: `Poppins` - Main font for all text
- **Secondary**: `Candal` - Fallback font
- **Tertiary**: `Plus Jakarta Sans` - Additional fallback

#### Font Sizes
- **H1**: `36px/44px` - Main page titles
- **H2**: `28px/36px` - Section headers
- **H3**: `22px/28px` - Subsection headers
- **H4**: `18px/24px` - Component titles
- **H5**: `16px/22px` - Small headers
- **H6**: `14px/20px` - Card titles
- **Body**: `16px/24px` - Main content text
- **Body Small**: `14px/20px` - Secondary content
- **Caption**: `12px/16px` - Small text, labels

### Component Sizing
**Location**: `tailwind.config.js` - width/height sections

#### Button Dimensions
- **Primary Button**: `335px × 50px` - Main action buttons
- **Icon Button**: `44px × 44px` - Square icon buttons
- **Social Button**: `80px × 35px` - Social media buttons

#### Border Radius
- **Button Primary**: `30px` - Main buttons (rounded)
- **Button Secondary**: `50px` - Secondary buttons (very rounded)
- **Button Icon**: `50px` - Icon buttons (circular)
- **Card**: `8px` - Card containers
- **Input**: `8px` - Form inputs

#### Navigation Heights
- **Nav Bar**: `90px` - Main navigation bar
- **Nav Center**: `62px` - Center navigation section

### Styling Rules

#### 1. Color Usage Rules
- **Primary Color**: Use for buttons, links, active states, progress indicators
- **Secondary Color**: Use for icon containers, dark backgrounds
- **Text Colors**: Follow hierarchy (primary → secondary → muted)
- **Dark Mode**: Always provide dark mode variants

#### 2. Typography Rules
- **Font Family**: Always use `font-poppins` for consistency
- **Font Sizes**: Use predefined sizes from design system
- **Font Weights**: Use `font-bold` for headers, `font-normal` for body text

#### 3. Button Design Pattern

##### Primary Button Structure
```css
/* Main Button Container */
.btn-primary {
  position: absolute;
  width: 335px;
  height: 50px;
  background: #5D9BFC;
  border-radius: 30px;
  /* Positioning varies per page */
}

/* Arrow Container */
.btn-arrow-container {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 80px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 70px;
  display: flex;
  align-items: center;
  padding: 14px 28px;
  gap: 4px;
}

/* Arrow Elements */
.btn-arrow {
  border: 1.5px solid #FFFFFF;
  border-radius: 0.5px;
}
.btn-arrow-1 { width: 6.5px; height: 13px; opacity: 1.0; }
.btn-arrow-2 { width: 5.5px; height: 11px; opacity: 0.7; }
.btn-arrow-3 { width: 4.5px; height: 9px; opacity: 0.4; }

/* Button Text */
.btn-text {
  position: absolute;
  width: 84px;
  height: 19px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: #FFFFFF;
  /* Centered in button */
}
```

##### Page-Specific Button Positioning
- **Onboarding Step 1**: `left: calc(50% - 335px/2 - 219.5px); top: 329px;`
- **Other pages**: TBD based on design requirements

#### 4. Component Spacing
- **Padding**: Use `px-6` for horizontal padding, `py-4` for vertical
- **Margins**: Use `mb-4`, `mb-6`, `mb-8` for consistent vertical spacing
- **Gaps**: Use `space-x-2`, `space-y-4` for consistent element spacing

#### 5. Dark Mode Implementation
```css
/* Light Mode */
.text-primary { @apply text-text-primary; }
.bg-surface { @apply bg-white; }

/* Dark Mode */
.dark .text-primary { @apply text-dark-text-primary; }
.dark .bg-surface { @apply bg-dark-bg; }
```

### Design System Enforcement

#### Always Use Design System Classes
- ✅ `text-h4`, `text-body`, `text-caption` instead of arbitrary sizes
- ✅ `bg-primary`, `text-primary` instead of arbitrary colors
- ✅ `w-button-primary`, `h-button-primary` instead of arbitrary dimensions
- ✅ `font-poppins` for all text elements
- ✅ `rounded-button-primary` for button corners

#### Avoid Custom Styling
- ❌ Don't use arbitrary colors like `text-gray-900`
- ❌ Don't use arbitrary sizes like `text-lg`
- ❌ Don't use arbitrary spacing like `mb-12`
- ❌ Don't use arbitrary border radius like `rounded-lg`

#### Consistency Checklist
- [ ] All colors from design system palette
- [ ] All typography from predefined scale
- [ ] All button dimensions from component sizing
- [ ] All spacing from consistent patterns
- [ ] Dark mode variants for all elements
- [ ] Font family consistency (Poppins)

### Supabase Configuration
- **Client**: Configured in `src/utils/supabase.ts`
- **RLS**: Row Level Security enabled
- **Real-time**: Subscriptions for live updates

---

## 📱 Mobile-First Design

### Container System
- **Main Container**: Custom `Container` component
- **Responsive**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for mobile interaction

### Component Guidelines
- **Touch Targets**: Minimum 44px touch targets
- **Readable Text**: Appropriate font sizes
- **Accessible**: ARIA labels and keyboard navigation
- **Performance**: Optimized for mobile devices

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation
```bash
npm install
npm run dev
```

### Environment Setup
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Material-UI](https://mui.com/)
- [Supabase](https://supabase.com/docs)

### Architecture Decisions
- **Why Zustand + TanStack Query**: Separation of local and server state
- **Why MUI + Tailwind**: Component library with custom styling flexibility
- **Why Supabase**: Full-stack solution with real-time capabilities
- **Why Centralized Architecture**: Maintainability and consistency

---

*This documentation serves as the single source of truth for Evanto 2.0's core architecture. Keep it updated as the project evolves.*
