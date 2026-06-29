import { useParams } from 'react-router-dom'

export default function CharacterDetailsPage() {
    const { id } = useParams()
    return <h1 className="p-8 text-2xl font-bold">Detalhes do personagem #{id}</h1>
}