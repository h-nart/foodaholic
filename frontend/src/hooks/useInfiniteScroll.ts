import { useEffect, useRef, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Hook for implementing infinite scroll with IntersectionObserver
 * @param options Configuration options for infinite scroll
 * @returns Ref to attach to the sentinel element
 */
export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollOptions): RefObject<HTMLDivElement> {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Load more when sentinel is visible and not already loading
        if (entry.isIntersecting && !loading && hasMore) {
          onLoadMore();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loading, hasMore, onLoadMore, rootMargin, threshold]);

  return sentinelRef;
}

