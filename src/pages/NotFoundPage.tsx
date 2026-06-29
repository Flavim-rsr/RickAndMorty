import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">404 — Oops!</h1>
            <p className="mt-2">Página não encontrada</p>
            <Link to="/" className="mt-4 inline-block text-blue-500 underline">Voltar ao início</Link>
        </div>
    )
}