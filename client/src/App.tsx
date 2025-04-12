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


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "search/:searchText",
        element: <SearchPage/>,
      },
      {
        path:"restaurant/:restaurantId",
        element: <ResturantDetails/>,
      },
      {
        path: "cart",
        element: <Cart/>,
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
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
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
