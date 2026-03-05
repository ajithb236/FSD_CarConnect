
# Car Connect - Frontend Only

A modern, responsive car rental platform frontend built with React and Vite. This is a **frontend-only prototype** with mocked user authentication, simulated order processes, and no backend dependencies. The entire styling layer has been fully migrated to pure **Bootstrap 5**.

## Features

✨ **Core Features:**
- **Zero Backend Required:** All API calls are mocked using dynamic timeouts and `localStorage`, ensuring the UI works anywhere right out of the box.
- **Mock Authentication System:** 
  - Login system accepting dummy credentials.
  - Three distinct user roles locally persisted via `localStorage`.
- **Payment & Checkout Simulation:** Checkout routes bypass defunct payment gateways (like Razorpay) automatically processing "successful" local transactions and providing dynamic popups.
- **Browse & Filter Capabilities:** 
  - Dynamically sorted vehicle displays structured in pure Bootstrap `.card` and `.grid` components.
  - Advanced local filtering logic allowing vehicle sorting by car type (SUV, Sedan, Hatchback).
  - Responsive off-canvas vehicle search menus.
- **Dashboard Interfaces:** Interactive navigation templates and simulated profile views handling User, Admin, and Vendor workspaces fully styled in Bootstrap layout patterns.

✨ **Sample Data:**
- Comprehensive list of hardcoded vehicles complete with car categories (fuel types, seats, capacities).
- Complete simulation of "Your Bookings" / order histories replacing the Database connection with a stable local JSON array.
- Contact page with static MIT Manipal address mapping.

## Recent Architectural Migration
TailwindCSS was completely stripped away and uninstalled from this repository to standardise the client under **Bootstrap 5 / react-bootstrap**. All custom responsive grids (`flex`, `col-span`), complex sidebars (`w-72`, `h-screen`), flex mappings, and layout designs were successfully replaced using standard Bootstrap semantics (`.row-cols-*`, `.d-flex`, `.navbar`).

## Installation

Clone the repository:
```bash
git clone https://github.com/ajithb236/FSD_CarConnect.git
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

**Frontend:**
- React 18.2
- Vite 5.1 (build tool)
- Redux Toolkit (state management)
- Bootstrap 5 (Core CSS styling framework)
- React-Bootstrap (Native bootstrap components)
- React Router (navigation)
- React Hook Form (form handling)
- Zod (form validation)
- React Icons (icon library)
- Framer Motion (animations)

**UI Libraries:**
- Material-UI (form fields integration)
- Ant Design (auxiliary components)

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable Bootstrap UI components
│   │   ├── Filter.jsx       # Vehicle filtering 
│   │   ├── Sort.jsx         # Vehicle sorting
│   │   ├── Header.jsx       # Bootstrap Navigation
│   │   └── Footer.jsx       # Global Footer
│   ├── pages/               # Route endpoints
│   │   ├── admin/           # Mocked admin dashboard screens
│   │   ├── user/
│   │   │   ├── Home.jsx     # Hero landing page
│   │   │   ├── Profile.jsx  # User account dashboard
│   │   │   ├── Vehicles.jsx # Bootstrap-Card vehicle listing
│   │   │   ├── Contact.jsx  # Static locator map
│   │   │   ├── SignIn.jsx   # Mocked authentication boundary
│   │   │   ├── CheckoutPage.jsx # Local mock purchase logic
│   │   │   └── ...
│   │   └── vendor/          # Mocked vendor management panels 
│   ├── Assets/              # Local image hosting
│   ├── App.jsx              # Main app entry & routing rules
│   └── main.jsx             # React DOM loader & Bootstrap injection
├── package.json
└── vite.config.js
```

## Standalone Execution Notes
- The `node_modules` no longer contain `tailwindcss`, `postcss`, `autoprefixer`, or `flowbite-react` as they were explicitly purged for the pure Bootstrap rewrite.
- User authentication expects specific role tags inside the application's `localStorage` (via the mock `SignIn.jsx`) rather than executing actual JWT token validation to secure `PrivateRoute` boundaries.





