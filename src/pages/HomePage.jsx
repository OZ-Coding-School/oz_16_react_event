import { useNavigate } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

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

function PostList({ posts }) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border rounded p-4">
          <h2 className="text-lg font-bold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const [posts] = useLocalStorage("posts", []);

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

      {posts.length === 0 ? (
        <EmptyState onCreate={() => navigate("/create")} />
      ) : (
        <PostList posts={posts} />
      )}
    </section>

  );
}
