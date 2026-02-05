import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>

      <button
        onClick={() => navigate("/create")}
        className="px-4 py-2 rounded bg-black text-white"
      >
        게시글 작성
      </button>

      <div className="border rounded p-4 text-sm text-gray-600">
        게시글 목록
      </div>
    </section>
  );
}
