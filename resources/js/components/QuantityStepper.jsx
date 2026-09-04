import React from 'react'

export default function QuantityStepper({ value, min = 1, max = 99, onChange, size = 'md' }) {
    const isSmall = size === 'sm'
    const btnClass = isSmall ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base'

    function dec() {
        onChange(Math.max(min, value - 1))
    }

    function inc() {
        onChange(Math.min(max, value + 1))
    }

    return (
        <div className="inline-flex items-center border border-stone-300 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={dec}
                disabled={value <= min}
                className={`${btnClass} flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}
            >
                −
            </button>
            <span className={`${isSmall ? 'w-8 text-sm' : 'w-10 text-sm'} text-center font-medium select-none`}>
                {value}
            </span>
            <button
                type="button"
                onClick={inc}
                disabled={value >= max}
                className={`${btnClass} flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}
            >
                +
            </button>
        </div>
    )
}