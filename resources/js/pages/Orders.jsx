import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { formatRupiah } from '../components/ProductCard'
import { getOrderStatus } from '../orderStatus'

export default function Orders() {
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/orders')
            .then((data) => setOrders(data.orders.data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-stone-500 text-center py-12">Memuat pesanan...</p>

    return (
        <div>
            <h1 className="text-xl font-semibold mb-6">Pesanan Saya</h1>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">🧾</div>
                    <p className="text-stone-500">Belum ada pesanan.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => {
                        const status = getOrderStatus(order.status)
                        return (
                            <Link
                                key={order.id}
                                to={`/pesanan-saya/${order.id}`}
                                className="block bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-sm">Pesanan #{order.id}</p>
                                        <p className="text-xs text-stone-400">
                                            {new Date(order.created_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.className}`}>
                                        {status.label}
                                    </span>
                                </div>
                                <p className="text-sm text-stone-500 mt-2">{order.details.length} item</p>
                                <p className="font-semibold mt-1">{formatRupiah(order.payment?.amount || 0)}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}