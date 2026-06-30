import { useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

// lê os favoritos salvos no localStorage na primeira renderização
function getInitialFavorites(): number[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(getInitialFavorites);

  // sempre que a lista mudar, persiste no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}
