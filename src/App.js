import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";
import RootPage from "./pages/RootPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: '/login', element: <LoginPage />},
      {path: '/signup', element: <SignUpPage />},
    ]
  },
  {path: '/&/products', element: <Products />},
  {path: '/product/:id', element: <ProductDetail />},
  {path: '/user-profile', element: <ProfilePage />},
  {path: '/cart', element: <CartPage />},
  {path: '/checkout', element: <CheckoutPage />},
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
