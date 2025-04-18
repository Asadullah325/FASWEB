import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login"
import MainLayout from "./layouts/MainLayout"
import SignUp from "./auth/SignUp"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import HeroSection from "./components/custom/HeroSection"
import Profile from "./components/custom/Profile"
import SearchPage from "./components/custom/SearchPage"
import ResturantDetails from "./components/custom/ResturantDetails"
import Cart from "./components/custom/Cart"
import Resturant from "./admin/Resturant"
import Menu from "./admin/Menu"
import Orders from "./admin/Orders"
import Success from "./components/custom/Success"
import ProtectedRoutes from "./lib/ProtectedRoutes"
import AuthenticatedUser from "./lib/AuthenticatedUser"
import AuthenticateAdmin from "./lib/AuthenticateAdmin"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import Loading from "./components/custom/Loading"
import { useThemeStore } from "./store/useThemeStore"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes> <MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "profile",
        element: <Profile />,
      }, 
      {
        path: "search/:searchText",
        element: <SearchPage />,
      },
      {
        path: "restaurant/:id",
        element: <ResturantDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/status",
        element: <Success />,
      },

      // admin routes
      {
        path: "admin/resturant",
        element: <AuthenticateAdmin><Resturant /></AuthenticateAdmin>,
      },
      {
        path: "admin/menu",
        element: <AuthenticateAdmin> <Menu /></AuthenticateAdmin>,
      },
      {
        path: "admin/orders",
        element: <AuthenticateAdmin><Orders /></AuthenticateAdmin>,
      }
    ],
  },
  {
    path: "login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>,
  },
  {
    path: "signup",
    element: <AuthenticatedUser><SignUp /></AuthenticatedUser>,
  },
  {
    path: "forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "verify-email",
    element: <VerifyEmail />,
  }
])

const App = () => {
  const { checkAuthentication, isCheckingAuth } = useUserStore()
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);

  useEffect(() => {
    checkAuthentication()
    initializeTheme()
  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
