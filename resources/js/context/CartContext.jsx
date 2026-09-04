import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'maison-bake-cart'

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch (e) {
        return {}
    }
}

export function CartProvider({ children }) {
    // cart shape: { [productId]: quantity }
    const [cart, setCart] = useState(loadCart)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    }, [cart])

    function addItem(productId, quantity = 1, maxStock = Infinity) {
        setCart((prev) => {
            const current = prev[productId] || 0
            const next = Math.min(current + quantity, maxStock)
            return { ...prev, [productId]: next }
        })
    }

    function updateItem(productId, quantity, maxStock = Infinity) {
        setCart((prev) => {
            const next = { ...prev }
            if (quantity <= 0) {
                delete next[productId]
            } else {
                next[productId] = Math.min(quantity, maxStock)
            }
            return next
        })
    }

    function removeItem(productId) {
        setCart((prev) => {
            const next = { ...prev }
            delete next[productId]
            return next
        })
    }

    function clearCart() {
        setCart({})
    }

    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

    return (
        <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCart, count }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
