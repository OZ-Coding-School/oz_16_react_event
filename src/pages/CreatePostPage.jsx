import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePosts from "@/hooks/usePosts";
import { formatDate } from "@/utils/formatDate";

function generateId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { addPost } = usePosts();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContents = contents.trim();

    if (!trimmedTitle || !trimmedContents) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newPost = {
      id: generateId(),
      title: trimmedTitle,
      contents: trimmedContents,
      date: formatDate(new Date()),
    };

    addPost(newPost);
    navigate("/"); // 저장 후 메인으로
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">게시글 작성</h1>
        <p className="text-sm text-gray-500">제목과 내용을 입력하세요.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-black px-3 py-2 text-sm
                       focus:outline-none"
            placeholder="게시글 제목"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">내용</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="w-full border border-black px-3 py-2 text-sm
                       focus:outline-none resize-none"
            rows={8}
            placeholder="게시글 내용을 입력하세요"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white text-sm
                       hover:bg-gray-800 transition"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-black text-sm
                       hover:bg-gray-100 transition"
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}
