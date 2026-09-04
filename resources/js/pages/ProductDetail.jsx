import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { formatRupiah } from '../components/ProductCard'
import ProductImage from '../components/ProductImage'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addItem } = useCart()

    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [qty, setQty] = useState(1)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setLoading(true)
        api.get(`/api/products/${id}`)
            .then((data) => {
                setProduct(data.product)
                setRelated(data.related)
                setQty(1)
            })
            .catch(() => navigate('/'))
            .finally(() => setLoading(false))
    }, [id])

    function handleAdd(e) {
        e.preventDefault()
        addItem(product.id, qty, product.stock)
        setMessage(`${product.name} ditambahkan ke keranjang.`)
        setTimeout(() => setMessage(''), 2500)
    }

    if (loading) return <p className="text-stone-500 text-center py-12">Memuat produk...</p>
    if (!product) return null

    return (
        <div>
            <Link to="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Kembali</Link>

            {message && (
                <div className="mt-4 rounded-md bg-green-100 border border-green-300 text-green-800 px-4 py-2 text-sm">
                    {message}
                </div>
            )}

            <div className="mt-4 grid sm:grid-cols-2 gap-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                    <ProductImage name={product.name} className="w-full h-full" />
                </div>

                <div>
                    <p className="text-sm text-stone-400">{product.store?.name}</p>
                    <h1 className="text-2xl font-semibold mt-1">{product.name}</h1>
                    <p className="text-xl font-semibold text-amber-600 mt-2">{formatRupiah(product.price)}</p>

                    {product.detail && (
                        <>
                            <p className="text-stone-600 mt-4 text-sm leading-relaxed">{product.detail.description}</p>
                            <p className="text-stone-400 text-xs mt-2">Berat: {product.detail.weight} gram</p>
                        </>
                    )}

                    <p className={`text-sm mt-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? `Stok tersedia: ${product.stock}` : 'Stok habis'}
                    </p>

                    {product.stock > 0 ? (
                        <form onSubmit={handleAdd} className="mt-5 flex items-center gap-3">
                            <input
                                type="number"
                                min={1}
                                max={product.stock}
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="w-20 border border-stone-300 rounded-md px-2 py-1.5 text-sm"
                            />
                            <button className="bg-stone-900 text-amber-50 px-5 py-2 rounded-md text-sm font-medium hover:bg-stone-800">
                                + Tambah ke Keranjang
                            </button>
                        </form>
                    ) : (
                        <button disabled className="mt-5 bg-stone-200 text-stone-400 px-5 py-2 rounded-md text-sm font-medium">
                            Stok Habis
                        </button>
                    )}
                </div>
            </div>

            {related.length > 0 && (
                <div className="mt-12">
                    <h2 className="font-semibold mb-4">Produk lain dari {product.store?.name}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {related.map((item) => (
                            <Link
                                key={item.id}
                                to={`/produk/${item.id}`}
                                className="card-hover bg-white rounded-xl border border-stone-200 overflow-hidden"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <ProductImage name={item.name} className="w-full h-full" />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                                    <p className="text-sm font-semibold">{formatRupiah(item.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}