import { useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useMemo } from "react";

function EmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded">
      <p className="mb-4 text-gray-500">아직 작성된 게시글이 없습니다.</p>
      <button
        onClick={onCreate}
        className="px-4 py-2 rounded bg-black text-white"
      >
        첫 번째 게시글 작성
      </button>
    </div>
  );
}

function PostList({ posts, onOpen }) {
  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li
          key={post.id}
          onClick={() => onOpen(post.id)}
          className="border border-black p-4 cursor-pointer
                     hover:bg-gray-50 transition"
        >
          <h2 className="text-base font-medium">{post.title}</h2>
          <p className="text-xs text-gray-500 mt-1">{post.date}</p>

        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const goCreate = () => navigate("/create");

  const [posts] = useLocalStorage("posts", []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  }, [posts]);

  const hasPosts = sortedPosts.length > 0;

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">게시글 목록</h1>

        {posts.length !== 0 && (
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 bg-black text-white text-sm
                      hover:bg-gray-800 transition"
          >
            게시글 작성
          </button>
        )}
      </header>

      {hasPosts ? (
        <PostList
          posts={sortedPosts}
          onOpen={(id) => navigate(`/posts/${id}`)}
        />
      ) : (
        <EmptyState onCreate={goCreate} />
      )}
    </section>
  );
}
