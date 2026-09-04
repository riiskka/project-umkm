import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        setError('')

        try {
            await login(email, password, remember)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="max-w-sm mx-auto py-8">
            <h1 className="text-xl font-semibold text-center mb-6">Masuk ke Akun</h1>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-800 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Kata Sandi</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>
                <label className="flex items-center gap-2 text-sm text-stone-500">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    Ingat saya
                </label>
                <button
                    disabled={submitting}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-amber-50 py-2.5 rounded-md text-sm font-medium disabled:opacity-50"
                >
                    {submitting ? 'Memproses...' : 'Masuk'}
                </button>
            </form>

            <p className="text-center text-sm text-stone-500 mt-4">
                Belum punya akun?{' '}
                <Link to="/register" className="text-amber-600 font-medium hover:underline">Daftar di sini</Link>
            </p>
        </div>
    )
}
