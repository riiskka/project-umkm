import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ children }) {
    const { user, loading } = useAuth()

    if (loading) return <p className="text-stone-500 text-center py-12">Memuat...</p>
    if (!user) return <Navigate to="/login" replace />

    return children
}
