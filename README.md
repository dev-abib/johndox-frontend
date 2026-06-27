# TerraLink

A modern real estate marketplace built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. TerraLink connects property buyers and sellers with verified listings, secure messaging, and advanced search tools.

## Tech Stack

| Technology          | Purpose                           |
| ------------------- | --------------------------------- |
| **Next.js 16**      | React framework (App Router, SSR) |
| **TypeScript**      | Type safety                       |
| **Tailwind CSS v4** | Utility-first styling             |
| **TanStack Query**  | Server state management           |
| **Zod**             | Schema validation                 |
| **React Hook Form** | Form handling                     |
| **Socket.IO**       | Real-time messaging               |
| **Google OAuth**    | Authentication                    |
| **Google Maps**     | Property location maps            |
| **Recharts**        | Analytics & charts                |
| **AOS**             | Scroll animations                 |
| **Axios**           | HTTP client                       |

## Features

### For Buyers
- **Browse Properties** — Filter and search through verified listings
- **Featured Listings** — Curated properties on the homepage
- **Interactive Maps** — View property locations with Google Maps
- **Currency Converter** — Convert prices to your preferred currency
- **Loan Calculator** — Estimate mortgage payments
- **Tour Requests** — Schedule property viewings
- **Favorites & Saved Searches** — Bookmark listings and save search filters

### For Sellers
- **List Properties** — Step-by-step listing wizard with photos and details
- **My Listings** — Manage and track all your properties
- **Analytics Dashboard** — View listing views, leads, and engagement
- **Direct Messaging** — Communicate with verified buyers in real time
- **Subscription Plans** — Choose from pricing tiers to promote listings
- **Edit Listings** — Update property information anytime

### General
- **Google OAuth** — One-click sign-in
- **Email/Password Auth** — Traditional registration and login
- **Password Reset** — Forgot password flow with OTP verification
- **Google Translate** — Built-in language translation
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Notifications** — Real-time alerts for messages and listing updates

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd johndox-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Public pages (home, browse, about, etc.)
│   ├── auth/               # Authentication pages (login, register, etc.)
│   ├── buyerlayout/        # Buyer dashboard pages
│   └── seller/             # Seller dashboard pages
├── Components/
│   ├── Common/             # Shared UI components (Button, Modal, etc.)
│   ├── Listing/            # Listing creation wizard steps
│   ├── PageComponents/     # Page-specific components
│   │   ├── mainPages/      # Components for public pages
│   │   ├── buyerPages/     # Components for buyer dashboard
│   │   └── sellerPages/    # Components for seller dashboard
│   ├── Auth/               # Authentication components
│   ├── Skeleton/           # Loading skeleton components
│   └── Svg/                # SVG icon components
├── Hooks/
│   ├── api/                # API hooks (auth, cms, dashboard, etc.)
│   ├── useAuth.tsx         # Authentication hook
│   ├── useAxiosPublic.tsx  # Public axios instance
│   └── useAxiosSecure.tsx  # Secure axios instance (with auth tokens)
├── lib/                    # Utility functions & API configuration
├── Provider/               # React context providers
│   ├── AuthProvider/
│   ├── QueryProvider/
│   ├── SocketProvider/
│   └── AosProvider/
├── Shared/                 # Shared layout components (Navbar, Footer)
└── Types/                  # TypeScript type definitions
```

## Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm start`       | Start production server    |
| `npm run lint`    | Run ESLint                 |

## API Integration

TerraLink connects to a backend CMS API with the following main endpoints:

- **Properties** — `/all-listings`, `/get-featured-properties`
- **Auth** — Registration, login, password management
- **CMS Pages** — Hero banners, about sections, pricing plans, FAQ
- **Messaging** — Real-time chat via Socket.IO
- **Payments** — Subscription plan purchases

Data is fetched using **TanStack Query** for client-side data and server-side `fetch` calls (SSR) for critical pages.

## License

This project is private and proprietary.
