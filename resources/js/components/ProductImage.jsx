import React, { useState, useEffect } from 'react'
import { getProductImage, DEFAULT_IMAGE } from '../productImages'

export default function ProductImage({ name, className = '' }) {
    const [src, setSrc] = useState(() => getProductImage(name))

    useEffect(() => {
        setSrc(getProductImage(name))
    }, [name])

    return (
        <img
            src={src}
            alt={name}
            loading="lazy"
            onError={() => setSrc(DEFAULT_IMAGE)}
            className={`object-cover ${className}`}
        />
    )
}