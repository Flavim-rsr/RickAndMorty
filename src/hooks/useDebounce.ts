import { useEffect, useState } from "react";

/**
 * Retorna o valor só depois que ele para de mudar por `delay` ms.
 * Evita disparar uma requisição a cada tecla digitada na busca.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
