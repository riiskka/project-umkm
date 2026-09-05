import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

const FEATURES = [
    { icon: '🌾', title: 'Bahan Pilihan', desc: 'Tepung & mentega kualitas premium, tanpa pengawet.' },
    { icon: '⏱️', title: 'Dipanggang Tiap Hari', desc: 'Fresh from the oven, bukan stok kemarin.' },
    { icon: '🚴', title: 'Cepat Sampai', desc: 'Pesan sekarang, ambil atau diantar hari ini juga.' },
]

const TESTIMONIALS = [
    { name: 'Sarah A.', text: 'Croissant-nya juara, renyah di luar lembut di dalam. Selalu jadi langganan tiap minggu!', rating: 5 },
    { name: 'Budi P.', text: 'Sourdough loaf favorit keluarga. Pengiriman cepat dan roti masih hangat pas sampai.', rating: 5 },
    { name: 'Dinda R.', text: 'Red velvet-nya lembut banget, manisnya pas ngga eneg. Recommended buat kado ulang tahun.', rating: 4 },
]

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
            <div className="relative overflow-hidden rounded-3xl bg-espresso-900 text-cream-50 px-6 sm:px-10 py-12 sm:py-16 text-center bg-grain">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-terracotta-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl" />

                <p className="relative text-terracotta-500 text-sm font-medium tracking-wide uppercase mb-3">Maison Bake</p>
                <h1 className="relative text-3xl sm:text-4xl font-semibold leading-tight max-w-xl mx-auto">
                    Roti &amp; kue segar, dipanggang setiap hari
                </h1>
                <p className="relative mt-3 text-cream-100/70 text-sm sm:text-base max-w-md mx-auto">
                    Pesan online, ambil atau antar dari toko favoritmu — hangat dari oven ke meja kamu.
                </p>

                <form onSubmit={handleSearch} className="relative mt-6 flex max-w-md mx-auto">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari roti, kue..."
                        className="w-full rounded-l-full px-4 py-2.5 text-stone-900 text-sm focus:outline-none"
                    />
                    <button className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-5 rounded-r-full text-sm font-medium transition-colors">
                        Cari
                    </button>
                </form>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-8">
                {FEATURES.map((f) => (
                    <div key={f.title} className="flex items-start gap-3 bg-white rounded-xl border border-stone-200/70 p-4">
                        <span className="text-2xl">{f.icon}</span>
                        <div>
                            <p className="font-medium text-sm text-espresso-900">{f.title}</p>
                            <p className="text-xs text-stone-500 mt-0.5">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {stores.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2 text-sm">
                    <Link
                        to="/"
                        className={`px-3.5 py-1.5 rounded-full border transition-colors ${!storeId ? 'bg-espresso-900 text-cream-50 border-espresso-900' : 'border-stone-300 text-stone-600 hover:border-stone-400'}`}
                    >
                        Semua Toko
                    </Link>
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            to={`/?store=${store.id}`}
                            className={`px-3.5 py-1.5 rounded-full border transition-colors ${String(storeId) === String(store.id) ? 'bg-espresso-900 text-cream-50 border-espresso-900' : 'border-stone-300 text-stone-600 hover:border-stone-400'}`}
                        >
                            {store.name}
                        </Link>
                    ))}
                </div>
            )}

            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl bg-stone-100 animate-pulse aspect-[4/5]" />
                    ))}
                </div>
            )}

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

            <div className="mt-14">
                <h2 className="text-lg font-semibold text-center text-espresso-900">Apa Kata Pelanggan</h2>
                <p className="text-sm text-stone-500 text-center mt-1 mb-6">Cerita mereka yang udah nyobain Maison Bake</p>

                <div className="grid sm:grid-cols-3 gap-4">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className="bg-white rounded-xl border border-stone-200/70 p-5">
                            <div className="text-amber-400 text-sm mb-2">
                                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">"{t.text}"</p>
                            <p className="text-sm font-medium text-espresso-900 mt-3">— {t.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}