const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content

async function request(url, options = {}) {
    const res = await fetch(url, {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken,
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers,
        },
        ...options,
    })

    let data = null
    try {
        data = await res.json()
    } catch (e) {
        data = null
    }

    if (!res.ok) {
        const message = data?.message || 'Terjadi kesalahan. Coba lagi ya.'
        const error = new Error(message)
        error.status = res.status
        error.errors = data?.errors
        throw error
    }

    return data
}

export const api = {
    get: (url) => request(url),
    post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
    patch: (url, body) => request(url, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (url) => request(url, { method: 'DELETE' }),
}
