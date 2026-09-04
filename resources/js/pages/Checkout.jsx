import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { formatRupiah } from '../components/ProductCard'

const METHODS = ['Transfer Bank', 'E-Wallet', 'COD']

export default function Checkout() {
    const { cart, clearCart } = useCart()
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [method, setMethod] = useState(METHODS[0])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const ids = Object.keys(cart)

    useEffect(() => {
        if (ids.length === 0) {
            navigate('/keranjang')
            return
        }

        api.get(`/api/products?ids=${ids.join(',')}`)
            .then((data) => setProducts(data.products))
            .finally(() => setLoading(false))
    }, [])

    const items = products
        .filter((p) => cart[p.id])
        .map((product) => ({
            product,
            quantity: Math.min(cart[product.id], product.stock),
            subtotal: product.price * Math.min(cart[product.id], product.stock),
        }))

    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        setError('')

        try {
            const data = await api.post('/api/checkout', {
                payment_method: method,
                items: items.map((item) => ({ product_id: item.product.id, quantity: item.quantity })),
            })
            clearCart()
            navigate(`/checkout/${data.order.id}/selesai`)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <p className="text-stone-500 text-center py-12">Memuat checkout...</p>

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Checkout</h1>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-800 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <div className="grid sm:grid-cols-3 gap-8">
                <div className="sm:col-span-2 space-y-3">
                    {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-3">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl shrink-0">🍞</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{item.product.name}</p>
                                <p className="text-xs text-stone-500">{item.quantity} x {formatRupiah(item.product.price)}</p>
                            </div>
                            <p className="text-sm font-semibold">{formatRupiah(item.subtotal)}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-stone-200 rounded-xl p-4 h-fit">
                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-stone-500">Total Pembayaran</span>
                        <span className="font-semibold text-lg">{formatRupiah(total)}</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
                        <div className="space-y-2 mb-4">
                            {METHODS.map((m) => (
                                <label
                                    key={m}
                                    className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm cursor-pointer ${method === m ? 'border-amber-500 bg-amber-50' : 'border-stone-200'}`}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value={m}
                                        checked={method === m}
                                        onChange={() => setMethod(m)}
                                    />
                                    {m}
                                </label>
                            ))}
                        </div>

                        <button
                            disabled={submitting}
                            className="w-full bg-stone-900 hover:bg-stone-800 text-amber-50 py-2.5 rounded-md font-medium text-sm disabled:opacity-50"
                        >
                            {submitting ? 'Memproses...' : 'Buat Pesanan'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
