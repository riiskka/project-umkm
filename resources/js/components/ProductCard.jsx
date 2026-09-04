import React from 'react'
import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'

function formatRupiah(value) {
    return 'Rp' + Number(value).toLocaleString('id-ID')
}

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/produk/${product.id}`}
            className="group card-hover bg-white rounded-2xl border border-stone-200/70 overflow-hidden block"
        >
            <div className="aspect-square overflow-hidden relative">
                <ProductImage
                    name={product.name}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-white/90 text-terracotta-600 text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                        Sisa {product.stock}
                    </span>
                )}
            </div>
            <div className="p-3.5">
                <p className="text-xs text-stone-400">{product.store?.name}</p>
                <h3 className="font-medium text-sm leading-snug mt-0.5 group-hover:text-terracotta-600 transition-colors">
                    {product.name}
                </h3>
                <p className="mt-1.5 font-semibold text-espresso-900">{formatRupiah(product.price)}</p>
            </div>
        </Link>
    )
}

export { formatRupiah }