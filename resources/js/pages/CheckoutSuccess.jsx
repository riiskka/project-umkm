import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api'
import { formatRupiah } from '../components/ProductCard'

export default function CheckoutSuccess() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        api.get(`/api/orders/${id}`).then((data) => setOrder(data.order))
    }, [id])

    if (!order) return <p className="text-stone-500 text-center py-12">Memuat...</p>

    return (
        <div className="max-w-lg mx-auto text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-xl font-semibold">Pesanan #{order.id} berhasil dibuat!</h1>
            <p className="text-stone-500 mt-1 text-sm">Terima kasih sudah belanja di Maison Bake.</p>

            <div className="mt-6 bg-white border border-stone-200 rounded-xl p-4 text-left">
                {order.details.map((detail) => (
                    <div key={detail.id} className="flex justify-between text-sm py-1.5 border-b border-stone-100 last:border-0">
                        <span>{detail.product.name} x{detail.quantity}</span>
                        <span>{formatRupiah(detail.unit_price * detail.quantity)}</span>
                    </div>
                ))}

                <div className="flex justify-between text-sm pt-3 mt-2 border-t border-stone-200 font-semibold">
                    <span>Total ({order.payment.method})</span>
                    <span>{formatRupiah(order.payment.amount)}</span>
                </div>
            </div>

            <Link to="/" className="inline-block mt-6 bg-stone-900 text-amber-50 px-6 py-2.5 rounded-md text-sm">
                Belanja Lagi
            </Link>
        </div>
    )
}
