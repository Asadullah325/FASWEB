import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useUserStore()
    if (isAuthenticated && user?.isVerified) {
        return <Navigate to="/" replace />
    }
    return children

}

export default AuthenticatedUser
