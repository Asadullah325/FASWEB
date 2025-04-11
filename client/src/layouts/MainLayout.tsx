import Footer from "@/components/custom/Footer"
import Navbar from "@/components/custom/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-[calc(100vh-110px)] flex-grow bg-gray-50">
      <Outlet />
      </div>
      <div className="flex items-center sticky bottom-0 border-t-2 justify-center w-full h-10 bg-white">
        <Footer /> 
      </div>
    </div>
  )
}

export default MainLayout
