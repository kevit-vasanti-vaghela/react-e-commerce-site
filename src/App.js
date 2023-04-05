import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetail from "./pages/ProductDetail";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import { loadEachProduct } from "./pages/ProductDetail";
import { changeUserDataAction } from "./components/SignUpForm";
import { signUpAction } from "./pages/SignUpPage";
import { checkAuthLoader } from "./util/auth";
import RouteProtection from "./pages/RouteProtection";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./UI/Notification";

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
      {
        index: '/',
        element: <RouteProtection />,
        loader: checkAuthLoader,
        children:[
          {
            path: 'checkout', 
            element: <CheckoutPage />,
            
          },
          {
            path: 'user-profile',
            id:'single-user',
            element: 
              <Suspense fallback={<p>loading...</p>}>
                <ProfilePage />
              </Suspense>, 
            loader: () => import('./components/SignUpForm').then(module => module.singleUserLoader()) , 
            action: changeUserDataAction,
            // loader: checkAuthLoader
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
                    loader: loadEachProduct,
                    // loader: checkAuthLoader,
                  },
            ]
          },
          {
            path: 'cart', 
            element: <CartPage />,
            loader: () => import('./components/SignUpForm').then(module => module.singleUserLoader()) , 
            action: changeUserDataAction,
            // loader: checkAuthLoader
    
          },
        ]
      },
      
    ]
  },
 
]);

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async() => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }))
      const response = await fetch('https://react-e-commerce-site-af1e7-default-rtdb.firebaseio.com/cart.json',{
      method: 'PUT',
      body: JSON.stringify(cart)
      })

      if(!response.ok) {
        throw new Error('Sending cart data failed')
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      }))
       
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      }))
    })
    
  },[cart, dispatch])

  return (
    <>
      {
        notification && 
        <Notification 
          title={notification.title}
          status={notification.status}
          message={notification.message}

        />
      }
      <RouterProvider router={router} />
    </>
  );
}

export default App;
