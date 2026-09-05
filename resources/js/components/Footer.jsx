import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-espresso-900 text-cream-100/70 mt-14 bg-grain">
            <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
                <div>
                    <p className="text-cream-50 text-lg font-semibold flex items-center gap-1.5">
                        🥐 Maison Bake
                    </p>
                    <p className="text-sm mt-2 leading-relaxed max-w-xs">
                        Roti &amp; kue segar yang dipanggang setiap hari, dari dapur kami ke meja kamu.
                    </p>
                </div>

                <div>
                    <p className="text-cream-50 text-sm font-semibold mb-3">Jelajahi</p>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-terracotta-500 transition-colors">Beranda</Link></li>
                        <li><Link to="/keranjang" className="hover:text-terracotta-500 transition-colors">Keranjang</Link></li>
                        <li><Link to="/pesanan-saya" className="hover:text-terracotta-500 transition-colors">Pesanan Saya</Link></li>
                    </ul>
                </div>

                <div>
                    <p className="text-cream-50 text-sm font-semibold mb-3">Kontak</p>
                    <ul className="space-y-2 text-sm">
                        <li>📍 Jl. Merdeka No. 10, Jakarta</li>
                        <li>📞 (021) 1234-5678</li>
                        <li>⏰ Buka setiap hari, 07.00 – 20.00</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-cream-100/10">
                <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-cream-100/50 text-center">
                    &copy; {new Date().getFullYear()} Maison Bake. Dibuat untuk tugas sekolah.
                </div>
            </div>
        </footer>
    )
}