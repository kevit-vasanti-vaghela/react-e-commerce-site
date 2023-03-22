import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {path: '/login', element: <LoginPage />},
  {path: '/&/product', element: <Products />},
  {path: '/product/:id', element: <ProductDetail />},
  {path: '/user-profile', element: <ProfilePage />},
  {path: '/cart', element: <CartPage />},
  {path: '/checkout', element: <CheckoutPage />},
]);

function App() {
  return (
    <div>
      <h1>E-commerce Site</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
