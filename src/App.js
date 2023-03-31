import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductDetail";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import { loadEachProduct } from "./pages/ProductDetail";
import { changeUserDataAction } from "./components/SignUpForm";
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
        id:'single-user',
        element: 
          <Suspense fallback={<p>loading...</p>}>
            <ProfilePage />
          </Suspense>, 
        loader: () => import('./components/SignUpForm').then(module => module.singleUserLoader()) , 
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
      {
        path: 'cart', 
        element: <CartPage />,
        loader: () => import('./components/SignUpForm').then(module => module.singleUserLoader()) , 
        action: changeUserDataAction
      },
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
