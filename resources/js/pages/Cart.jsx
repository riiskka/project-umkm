import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatRupiah } from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import QuantityStepper from '../components/QuantityStepper'

export default function Cart() {
    const { cart, updateItem, removeItem } = useCart()
    const { user } = useAuth()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const ids = Object.keys(cart)

    useEffect(() => {
        if (ids.length === 0) {
            setProducts([])
            setLoading(false)
            return
        }

        setLoading(true)
        api.get(`/api/products?ids=${ids.join(',')}`)
            .then((data) => setProducts(data.products))
            .finally(() => setLoading(false))
    }, [ids.join(',')])

    const items = products
        .filter((p) => cart[p.id])
        .map((product) => ({
            product,
            quantity: Math.min(cart[product.id], product.stock),
            subtotal: product.price * Math.min(cart[product.id], product.stock),
        }))

    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    if (loading) return <p className="text-stone-500 text-center py-12">Memuat keranjang...</p>

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Keranjang Belanja</h1>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">🛒</div>
                    <p className="text-stone-500">Keranjangmu masih kosong.</p>
                    <Link to="/" className="inline-block mt-4 bg-stone-900 text-amber-50 px-5 py-2 rounded-md text-sm">
                        Mulai Belanja
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl p-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                    <ProductImage name={item.product.name} className="w-full h-full" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <Link to={`/produk/${item.product.id}`} className="font-medium text-sm hover:text-amber-600">
                                        {item.product.name}
                                    </Link>
                                    <p className="text-sm text-stone-500">{formatRupiah(item.product.price)}</p>
                                </div>

                                <QuantityStepper
                                    value={item.quantity}
                                    max={item.product.stock}
                                    size="sm"
                                    onChange={(qty) => updateItem(item.product.id, qty, item.product.stock)}
                                />

                                <p className="font-semibold text-sm w-24 text-right shrink-0">{formatRupiah(item.subtotal)}</p>

                                <button onClick={() => removeItem(item.product.id)} className="text-red-500 text-sm hover:underline">
                                    Hapus
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
                        <p className="text-stone-600">Total</p>
                        <p className="text-xl font-semibold">{formatRupiah(total)}</p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        {user ? (
                            <Link to="/checkout" className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-6 py-2.5 rounded-md font-medium">
                                Lanjut ke Checkout
                            </Link>
                        ) : (
                            <Link to="/login" className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-6 py-2.5 rounded-md font-medium">
                                Masuk untuk Checkout
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}