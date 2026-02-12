import { useParams, useNavigate } from "react-router-dom";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">게시글 상세</h1>

      <div className="border rounded p-4">
        <p className="text-sm text-gray-600">postId: {postId}</p>
        <p className="text-sm text-gray-600">
          상세 내용
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 rounded border"
      >
        뒤로가기
      </button>
    </section>
  );
}
