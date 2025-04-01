import { FC } from "react";
import { useMemes } from "@/hooks/useMemes";
import MemeCard from "@/components/MemeCard";
import EditMemeModal from "@/components/EditMemeModal";
import MemeSkeleton from "@/components/MemeSkeleton";
import styles from "@/styles/Home.module.css";

const Home: FC = () => {
  const {
    memes,
    loading,
    lastMemeRef,
    editingMeme,
    setEditingMeme,
    handleSave,
  } = useMemes();

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {loading && memes.length === 0
          ? Array.from({ length: 10 }).map((_, i) => <MemeSkeleton key={i} />)
          : memes.map((meme, index) => {
              const isLast = index === memes.length - 1;
              return (
                <div key={meme._id} ref={isLast ? lastMemeRef : undefined}>
                  <MemeCard meme={meme} onEdit={setEditingMeme} />
                </div>
              );
            })}
      </div>

      {editingMeme && (
        <EditMemeModal
          meme={editingMeme}
          onClose={() => setEditingMeme(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
};

export default Home;
