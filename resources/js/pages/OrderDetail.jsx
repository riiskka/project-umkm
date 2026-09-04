import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api'
import { formatRupiah } from '../components/ProductCard'

export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        api.get(`/api/orders/${id}`).then((data) => setOrder(data.order))
    }, [id])

    if (!order) return <p className="text-stone-500 text-center py-12">Memuat...</p>

    return (
        <div>
            <Link to="/pesanan-saya" className="text-sm text-stone-500 hover:text-stone-800">&larr; Pesanan Saya</Link>

            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h1 className="text-xl font-semibold">Pesanan #{order.id}</h1>
                    <p className="text-xs text-stone-400">{new Date(order.created_at).toLocaleString('id-ID')}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 capitalize">
                    {order.status}
                </span>
            </div>

            <div className="mt-6 bg-white border border-stone-200 rounded-xl p-4">
                {order.details.map((detail) => (
                    <div key={detail.id} className="flex justify-between text-sm py-2 border-b border-stone-100 last:border-0">
                        <span>{detail.product.name} x{detail.quantity}</span>
                        <span>{formatRupiah(detail.unit_price * detail.quantity)}</span>
                    </div>
                ))}

                <div className="flex justify-between text-sm pt-3 mt-2 border-t border-stone-200 font-semibold">
                    <span>Total ({order.payment?.method || '-'})</span>
                    <span>{formatRupiah(order.payment?.amount || 0)}</span>
                </div>
            </div>
        </div>
    )
}
