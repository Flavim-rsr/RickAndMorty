import { useEffect, useRef } from "react";

/**
 * Observa um elemento "sentinela" e chama onLoadMore quando ele aparece
 * na tela (ou seja, quando o usuário rolou até o fim da lista).
 * Retorna a ref que deve ser colocada nesse elemento sentinela.
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  canLoadMore: boolean,
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !canLoadMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, canLoadMore]);

  return sentinelRef;
}
