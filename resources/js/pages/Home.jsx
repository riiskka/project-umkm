import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''
    const storeId = searchParams.get('store') || ''

    const [products, setProducts] = useState(null)
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState(q)

    useEffect(() => {
        setLoading(true)
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (storeId) params.set('store', storeId)

        api.get(`/api/products?${params.toString()}`)
            .then((data) => {
                setProducts(data.products)
                setStores(data.stores)
            })
            .finally(() => setLoading(false))
    }, [q, storeId])

    function handleSearch(e) {
        e.preventDefault()
        const next = new URLSearchParams()
        if (query) next.set('q', query)
        if (storeId) next.set('store', storeId)
        setSearchParams(next)
    }

    return (
        <div>
            <div className="mb-6 rounded-xl bg-stone-900 text-amber-50 px-6 py-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold">Roti &amp; kue segar, dipanggang setiap hari</h1>
                <p className="mt-2 text-amber-100/80 text-sm sm:text-base">Pesan online, ambil atau antar dari toko favoritmu.</p>
            </div>

            <form onSubmit={handleSearch} className="mb-4 flex sm:max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari roti, kue..."
                    className="w-full rounded-l-md px-3 py-2 border border-stone-300 text-sm"
                />
                <button className="bg-amber-500 text-stone-900 px-4 rounded-r-md text-sm font-medium">Cari</button>
            </form>

            {stores.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2 text-sm">
                    <Link
                        to="/"
                        className={`px-3 py-1.5 rounded-full border ${!storeId ? 'bg-stone-900 text-amber-50 border-stone-900' : 'border-stone-300 text-stone-600'}`}
                    >
                        Semua Toko
                    </Link>
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            to={`/?store=${store.id}`}
                            className={`px-3 py-1.5 rounded-full border ${String(storeId) === String(store.id) ? 'bg-stone-900 text-amber-50 border-stone-900' : 'border-stone-300 text-stone-600'}`}
                        >
                            {store.name}
                        </Link>
                    ))}
                </div>
            )}

            {loading && <p className="text-stone-500 text-center py-12">Memuat produk...</p>}

            {!loading && products && products.data.length === 0 && (
                <p className="text-stone-500 text-center py-12">Belum ada produk yang cocok. Coba kata kunci lain ya.</p>
            )}

            {!loading && products && products.data.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
