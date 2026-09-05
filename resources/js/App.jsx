import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
                    <div className="bg-cream-50 text-espresso-900 min-h-screen flex flex-col">
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

                        <Footer />
                    </div>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App