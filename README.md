# Inventory Management System Frontend

## 📝 Description

A modern, responsive inventory management system frontend built with React and TypeScript. This application provides a user-friendly interface for managing inventory items, including features for adding, viewing, updating, and deleting products. The application follows modern React patterns and best practices, with a focus on performance, type safety, and developer experience.

## 🚀 Features

- **Authentication**: Secure user authentication flow
- **Product Management**:
  - View list of products with pagination
  - Add new products
  - Edit existing products
  - Delete products
  - View product details
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **State Management**: Efficient state management with TanStack Query and Zustand
- **UI Components**: Beautiful, accessible components built with Shadcn UI
- **Type Safety**: Full TypeScript support throughout the application

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**:
  - Tailwind CSS
  - Class Variance Authority (CVA)
  - Radix UI Primitives
- **State Management**:
  - TanStack Query (React Query)
  - Zustand
- **Routing**: TanStack Router
- **Form Handling**:
  - React Hook Form
  - Zod for schema validation
- **UI Components**:
  - Shadcn UI
  - Radix UI
  - Lucide Icons
- **HTTP Client**: Axios/Redaxios
- **Testing**:
  - Vitest
  - React Testing Library
  - MSW (Mock Service Worker)
- **Code Quality**:
  - ESLint
  - Prettier
  - TypeScript
  - Husky (pre-commit hooks)

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/              # Shadcn UI components
├── lib/                 # Utility functions and configurations
├── mocks/               # Mock data for development
├── routes/              # Application routes and pages
│   ├── _productLayout/  # Layout for product-related pages
│   │   └── products/    # Product management features
│   │       ├── -api/    # API integration
│   │       ├── -components/ # Feature-specific components
│   │       ├── -hooks/  # Custom hooks
│   │       └── -types/  # TypeScript types
│   └── _publicLayout/   # Public layout (auth pages)
│       └── (auth)/      # Authentication related pages
│           ├── -api/
│           ├── -components/
│           ├── -hooks/
│           └── -types/
├── tests/               # Test files
├── types/               # Global TypeScript types
└── utils/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd technical-test-inventory-management-system-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   ```

### Development

Start the development server:

```bash
pnpm dev
```

### Building for Production

```bash
pnpm build
```

### Running Tests

Run unit tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

Generate test coverage report:
```bash
pnpm test:coverage
```

## 🧪 Testing

The project uses Vitest and React Testing Library for unit and integration testing. Mock Service Worker (MSW) is used to mock API requests during testing.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - your.email@example.com

Project Link: [https://github.com/yourusername/technical-test-inventory-management-system-frontend](https://github.com/yourusername/technical-test-inventory-management-system-frontend)
