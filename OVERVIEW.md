# React Tanstack - Project Template

## 🎯 Purpose
This file serves as a template and documentation for creating new projects based on the React Tanstack architecture. It's designed to be used with Windsurf for scaffolding new products platform applications with similar structure and features.

## 📋 Project Description
This template represents a modern web application built with React and TypeScript, designed for products platforms. It features a role-based access control system with different interfaces for public and registered users, and can be used as a starting point for similar applications.

## 🚀 Key Features

- **Authentication System** (User)
- **Responsive Design** with mobile support
- **Modern UI Components** built with Radix UI and Tailwind CSS
- **State Management** with Zustand
- **Data Fetching** with React Query
- **Form Handling** with React Hook Form and Zod validation
- **Internationalization** support (i18n)
- **Theme Support** (light/dark mode)

## 🛠️ Tech Stack

### Core Technologies
- **React** (v19+)
- **TypeScript**
- **Vite** (Build tool)
- **TanStack Router** (Client-side routing)
- **Tailwind CSS** (Styling)
- **Radix UI** (Primitive UI components)
- **Zustand** (State management)
- **React Query** (Data fetching and caching)
- **React Hook Form** (Form handling)
- **Zod** (Schema validation)

### Development Tools
- **ESLint** (Code linting)
- **Prettier** (Code formatting)
- **Husky** (Git hooks)
- **lint-staged** (Run linters on git staged files)
- **Vitest** (Testing)

## 📁 Project Structure

```
src/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components (buttons, inputs, etc.)
│   └── ...
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── routes/            # Application routes and pages
│   ├── _publicLayout/ # Public-facing routes
│   └── _productLayout/# Users section routes
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔐 Authentication & Authorization

The application uses a role-based access control (RBAC) system with the following roles:
1. **User (Estudiante)**: Access to products

## 🎨 UI/UX

- **Design System**: Custom design system built on top of Radix UI primitives
- **Theming**: Support for light/dark mode using `next-themes`
- **Responsive**: Fully responsive design that works on all device sizes
- **Accessibility**: Built with accessibility in mind (WAI-ARIA compliant)

## 📦 Dependencies

### Main Dependencies
- `@tanstack/react-query`: Data fetching and state synchronization
- `@tanstack/react-router`: Client-side routing
- `react-hook-form`: Form state management and validation
- `zod`: Schema validation
- `zustand`: State management
- `tailwindcss`: Utility-first CSS framework
- `@radix-ui/*`: Primitive UI components
- `lucide-react`: Icons

### Development Dependencies
- `typescript`: Type checking
- `eslint`: Code linting
- `prettier`: Code formatting
- `vite`: Build tool
- `@vitejs/plugin-react`: Vite plugin for React

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   pnpm dev
   ```

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier
- `pnpm test`: Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.
