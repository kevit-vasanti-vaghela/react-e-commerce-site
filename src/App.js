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
import { action as signUpAction } from "./pages/SignUpPage";
import { loader as loginLoader} from "./components/LoginForm";
import ProductRootPage from "./pages/ProductRootPage";
import { loader as productLoader} from "./components/ProductList";
import { loadEachProduct } from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />, loader: loginLoader},
      {path: 'signup', element: <SignUpPage />, action: signUpAction},
    ]
  },
  {
    path:'/&/products', 
    element: <ProductRootPage />,
    children: [
      {index: true, element: <Products />, loader: productLoader },
      {path: ':id', element: <ProductDetail />, loader: loadEachProduct},
      {path: 'cart', element: <CartPage />},
      {path: 'checkout', element: <CheckoutPage />},
    ]
  },
  
  {path: '/user-profile', element: <ProfilePage />},
 
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
