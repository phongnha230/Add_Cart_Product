# Hooks Shop

A modern e-commerce application built with **React 19**, **Vite**, and **Tailwind CSS**. This project demonstrates manual state management using React Hooks and Context API, featuring a responsive and beautiful UI.

## 🚀 Features

- **Product Catalog**: Browse a list of featured products with images and prices.
- **Shopping Cart**:
  - Add items to the cart.
  - View cart summary (items, total price).
  - Real-time updates without page reload.
  - Sticky sidebar layout on desktop for easy access.
- **Responsive Design**: Fully responsive UI that works seamlessly on mobile, tablet, and desktop.
- **Modern UI/UX**:
  - Glassmorphism effects (backdrop blur).
  - Smooth gradients and transitions.
  - Interactive elements with hover states.
- **State Management**: Built using `useContext` and `useReducer` (via `ShopProvider`) to manage global application state.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge` for dynamic class names.
- **Linting**: ESLint

## 📂 Project Structure

```bash
src/
├── components/         # UI Components
│   ├── ui/             # Reusable UI primitives (Input, Button, etc.)
│   ├── Cart.jsx        # Shopping Cart component
│   ├── CartIcon.jsx    # Cart indicator in header
│   ├── ProductCard.jsx # Individual product display
│   └── ProductList.jsx # Grid of available products
├── context/            # Global State
│   └── ShopContext.jsx # React Context for cart & product data
├── hooks/              # Custom React Hooks
├── lib/                # Utility functions
├── App.jsx             # Main application layout
└── main.jsx            # Entry point
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have **Node.js** installed on your machine.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder:

    ```bash
    cd hooks-shop
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the development server**:

    ```bash
    npm run dev
    ```

4.  **Open your browser**:
    Navigate to `http://localhost:5173` to view the app.

## 📜 Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Builds the application for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code quality and errors.
- `npm run preview`: Locally previews the production build.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
