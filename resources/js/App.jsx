import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="bg-amber-50 text-stone-800 min-h-screen flex flex-col">
                        <Navbar />

                        <main className="flex-1">
                            <div className="max-w-6xl mx-auto px-4 py-6">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/produk/:id" element={<ProductDetail />} />
                                    <Route path="/keranjang" element={<Cart />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route
                                        path="/checkout"
                                        element={
                                            <RequireAuth>
                                                <Checkout />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route
                                        path="/checkout/:id/selesai"
                                        element={
                                            <RequireAuth>
                                                <CheckoutSuccess />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route
                                        path="/pesanan-saya"
                                        element={
                                            <RequireAuth>
                                                <Orders />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route
                                        path="/pesanan-saya/:id"
                                        element={
                                            <RequireAuth>
                                                <OrderDetail />
                                            </RequireAuth>
                                        }
                                    />
                                </Routes>
                            </div>
                        </main>

                        <footer className="bg-stone-900 text-amber-100/70 text-sm mt-10">
                            <div className="max-w-6xl mx-auto px-4 py-6 text-center">
                                &copy; {new Date().getFullYear()} Maison Bake. Dibuat untuk tugas sekolah.
                            </div>
                        </footer>
                    </div>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
