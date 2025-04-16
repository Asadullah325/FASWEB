import { useUserStore } from "@/store/useUserStore"
import React from "react"
import { Navigate } from "react-router-dom"

const AuthenticateAdmin = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useUserStore()
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (!user?.isAdmin) {
        return <Navigate to="/" replace />
    }
    return children
}

export default AuthenticateAdmin
