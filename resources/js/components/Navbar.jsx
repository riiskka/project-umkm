import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { count } = useCart()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <header className="bg-stone-900 text-amber-50 sticky top-0 z-20 shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link to="/" className="text-xl font-semibold tracking-wide">
                    🥐 Maison Bake
                </Link>

                <nav className="flex items-center gap-4 text-sm">
                    <Link to="/keranjang" className="relative hover:text-amber-300">
                        🛒 Keranjang
                        {count > 0 && (
                            <span className="absolute -top-2 -right-3 bg-amber-500 text-stone-900 text-xs rounded-full px-1.5 py-0.5">
                                {count}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <>
                            <Link to="/pesanan-saya" className="hover:text-amber-300">Pesanan Saya</Link>
                            <span className="text-amber-200 hidden md:inline">Hai, {user.name}</span>
                            <button onClick={handleLogout} className="hover:text-amber-300">Keluar</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-amber-300">Masuk</Link>
                            <Link
                                to="/register"
                                className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-3 py-1.5 rounded-md font-medium"
                            >
                                Daftar
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
