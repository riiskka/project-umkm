import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/me')
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    async function login(email, password, remember) {
        const data = await api.post('/api/login', { email, password, remember })
        setUser(data.user)
        return data.user
    }

    async function register(name, email, password, password_confirmation) {
        const data = await api.post('/api/register', { name, email, password, password_confirmation })
        setUser(data.user)
        return data.user
    }

    async function logout() {
        await api.post('/api/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
