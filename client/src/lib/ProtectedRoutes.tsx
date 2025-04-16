import { useUserStore } from "@/store/useUserStore"
import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useUserStore()
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (!user?.isVerified) {
        return <Navigate to="/verify-email" replace />
    }
    return children
}

export default ProtectedRoutes
