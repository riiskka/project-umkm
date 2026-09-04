export const ORDER_STATUS = {
    pending: { label: 'Menunggu Pembayaran', className: 'bg-amber-100 text-amber-700' },
    paid: { label: 'Lunas', className: 'bg-green-100 text-green-700' },
    processing: { label: 'Sedang Disiapkan', className: 'bg-blue-100 text-blue-700' },
    shipped: { label: 'Dikirim', className: 'bg-indigo-100 text-indigo-700' },
    completed: { label: 'Selesai', className: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-700' },
}

export function getOrderStatus(status) {
    return ORDER_STATUS[status] || { label: status, className: 'bg-stone-100 text-stone-600' }
}