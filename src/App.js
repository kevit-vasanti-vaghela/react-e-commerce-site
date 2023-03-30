import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
// import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
// import Products from "./pages/Products";
// import ProfilePage, { changeUserDataAction, singleUserLoader } from "./pages/ProfilePage";
import RootPage from "./pages/RootPage";
// import SignUpPage, { action as signUpAction } from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
// import { loader as loginLoader} from "./components/LoginForm";
// import { loader as productLoader} from "./components/ProductList";
import { loadEachProduct } from "./pages/ProductDetail";
import { changeUserDataAction } from "./pages/ProfilePage";
import { signUpAction } from "./pages/SignUpPage";

const LoginPage = lazy(() => import('./pages/LoginPage'))
const Products = lazy(() => import('./pages/Products'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootPage />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'login', 
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        ), 
        loader: () => import('./components/LoginForm').then(module => module.loginLoader())
      },
      {
        path: 'signup', 
        element: 
          <Suspense fallback={<p>Loading...</p>}>
            <SignUpPage />
          </Suspense>
        , 
        action: signUpAction
      },
      {path: 'checkout', element: <CheckoutPage />},
      {
        path: 'user-profile', 
        element: 
          <Suspense fallback={<p>loading...</p>}>
            <ProfilePage />
          </Suspense>, 
        loader: () => import('./pages/ProfilePage').then(module => module.singleUserLoader()) , 
        action: changeUserDataAction
      },
      {
        path:'products', 
        children: [
              {
                index: true, 
                element: <Suspense fallback={<p>loading...</p>}>
                            <Products />
                          </Suspense>,  
                loader: () => import('./components/ProductList').then(module => module.productsLoader()) ,
              },
              {
                path: ':id', 
                element: <ProductDetail />, 
                loader: loadEachProduct
              },
        ]
      },
      {path: 'cart', element: <CartPage />},
    ]
  },
 
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
