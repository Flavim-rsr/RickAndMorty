import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import CharactersPage from './pages/CharactersPage'
import CharacterDetailsPage from './pages/CharacterDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import ThemeToggle from './components/ThemeToggle'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeToggle />
                <Routes>
                    <Route path="/" element={<CharactersPage />} />
                    <Route path="/character/:id" element={<CharacterDetailsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)