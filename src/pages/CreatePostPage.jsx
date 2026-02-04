import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">게시글 작성</h1>

      <div className="border rounded p-4 text-sm text-gray-600">
        (1단계) 폼 UI는 다음 단계에서 구현합니다.
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 rounded border"
      >
        홈으로
      </button>
    </section>
  );
}
