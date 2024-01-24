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
import Notification from "./UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import ReactGA from "react-ga4";
import ErrorPage from "./pages/ErrorPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Products = lazy(() => import("./pages/Products"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <LoginPage />
          </Suspense>
        ),
        loader: () =>
          import("./components/LoginForm").then((module) =>
            module.loginLoader()
          ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SignUpPage />
          </Suspense>
        ),
        action: signUpAction,
      },
      {
        index: "/",
        element: <RouteProtection />,
        loader: checkAuthLoader,
        children: [
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "user-profile",
            id: "single-user",
            element: (
              <Suspense fallback={<p>loading...</p>}>
                <ProfilePage />
              </Suspense>
            ),
            loader: () =>
              import("./components/SignUpForm").then((module) =>
                module.singleUserLoader()
              ),
            action: changeUserDataAction,
            // loader: checkAuthLoader
          },
          {
            path: "products",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>loading...</p>}>
                    <Products />
                  </Suspense>
                ),
                loader: () =>
                  import("./components/ProductList").then((module) =>
                    module.productsLoader()
                  ),
              },
              {
                path: ":id",
                element: <ProductDetail />,
                loader: loadEachProduct,
                // loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "cart",
            element: <CartPage />,
            loader: () =>
              import("./components/SignUpForm").then((module) =>
                module.singleUserLoader()
              ),
            action: changeUserDataAction,
            // loader: checkAuthLoader
          },
        ],
      },
    ],
  },
]);

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const TRACKING_ID = "G-Z3G658MLHM";
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/login",
      title: "Custom Title",
    });
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <div>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
