import { useEffect, useState, useRef, useCallback } from "react";
import { getMemes, updateMeme } from "@/services/memeApi";
import { Meme } from "@/types/memes.types";

export const useMemes = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingMeme, setEditingMeme] = useState<Meme | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMemeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchMemes = async () => {
      setLoading(true);
      const data = await getMemes(page, 10);
      setMemes((prev) => [...prev, ...data.data]);
      setHasMore(page < data.totalPages);
      setLoading(false);
    };

    fetchMemes();
  }, [page]);

  const handleSave = async (updates: { name: string }) => {
    if (!editingMeme) return;

    const updated = await updateMeme(editingMeme._id, updates);
    setMemes((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
    setEditingMeme(null);
  };

  return {
    memes,
    loading,
    lastMemeRef,
    editingMeme,
    setEditingMeme,
    handleSave,
  };
};
