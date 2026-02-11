import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { PostDetailView } from "../postDetail/components/PostDetailView";
import { PostEditView } from "../postDetail/components/PostEditView";
const MAX_IMAGES = 5;

export default function PostDetail({ posts, updatePost, deletePost }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // 게시글 찾기
  const post = posts.find((p) => String(p.id) === id);

  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  // 편집 상태 및 입력값 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [editImages, setEditImages] = useState([]); // { file?: File|null, preview: string }[]

  // 편집 모드 진입 시 기존 게시글 데이터 복사
  useEffect(() => {
    if (!isEditing || !currentPost) return;

    setEditTitle(currentPost.title);
    setEditContent(currentPost.contents);

    if (!currentPost.images.length) return;

    const editImages = currentPost.images.map((url) => ({
      file: null,
      preview: url
    }));

    setEditImages();
    setEditImages(editImages);
  }, [isEditing, currentPost]);

  // 이미지 확대 모달 상태
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // 이미지 추가/삭제 핸들러
  const addImages = (files) => {
    const remain = MAX_IMAGES - editImages.length;
    if (remain <= 0) return;

    const next = files.slice(0, remain).map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setEditImages((prev) => [...prev, ...next]);
  };

  const removeImage = (idx) => {
    setEditImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // 이미지 확대 모달 열기/닫기
  const openImage = (url) => {
    setActiveImage(url);
    setIsImageOpen(true);
  };
  const closeImage = () => {
    setIsImageOpen(false);
    setActiveImage(null);
  };

  // 편집 취소: 원본 상태로 복구
  // const handleCancel = () => {
  //   setIsEditing(false);
  //   if (!currentPost) return;

  //   setEditTitle(currentPost.title);
  //   setEditContent(currentPost.contents);
  //   setEditImages(
  //     (currentPost.images || []).map((url) => ({
  //       file: null,
  //       preview: url
  //     }))
  //   );
  // };

  // 편집 저장: FormData로 서버에 전송
  const handleSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("contents", editContent);

    // 기존 이미지 URL만 추출해서 JSON 문자열로 전송
    const existingImages = editImages
      .filter((img) => img.file === null)
      .map((img) => img.preview);

    // 추가
    const isImagesCleared = existingImages.length === 0;

    formData.append("existingImages", JSON.stringify(existingImages));
    formData.append("imagesCleared", String(isImagesCleared));

    // 새 이미지 파일 추가
    editImages.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    // 서버 업데이트 및 UI 반영
    await updatePost(currentPost.id, formData);
    setIsEditing(false);
  };

  // 게시글 삭제 및 메인으로 이동
  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    await deletePost(currentPost.id);
    navigate("/");
  };

  const handleEditTitle = (e) => setEditTitle(e.target.value);
  const handleEditContent = (e) => setEditContent(e.target.value);
  if (!currentPost) {
    return (
      <div className="p-8 text-center text-white/60">
        게시글을 불러오는 중입니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center px-4">
        <div className="w-full max-w-5xl flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8">
          {/* 헤더 */}
          <div className="relative flex items-center justify-center mb-2">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 p-2 text-white/60 hover:text-gray-200"
            >
              ← 뒤로가기
            </button>
            <h1 className="text-2xl font-extrabold">게시물 상세</h1>
          </div>

          {/* 읽기모드 편집 모드 */}
          {!isEditing ? (
            <PostDetailView currentPost={currentPost} openImage={openImage} />
          ) : (
            <PostEditView
              addImages={addImages}
              removeImage={removeImage}
              editImages={editImages}
              title={editTitle}
              contents={editContent}
              onChangeEditTitle={handleEditTitle}
              onChangeEditContent={handleEditContent}
            />
          )}
          {/* 작성일 */}
          <span className="text-xs">
            작성일: {dayjs(currentPost.date).format("YYYY-MM-DD HH:mm")}
          </span>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-3 pointer-events-auto">
            <Button
              onClick={() => setIsEditing((pre) => !pre)}
              className={`px-3 py-2 pointer-events-auto `}
              variant={!isEditing ? "default" : "cancel"}
            >
              {!isEditing ? "수정" : "취소"}
            </Button>

            <Button
              className={"px-3 py-2"}
              variant="danger"
              onClick={!isEditing ? handleDelete : handleSave}
            >
              {!isEditing ? "삭제" : "저장"}
            </Button>
          </div>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeImage}
        >
          <div
            className="bg-[#1a1a1a] rounded-xl p-12 w-[90vw] h-[94vh] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeImage}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
              aria-label="닫기"
            >
              ✕
            </button>
            <img src={activeImage} alt="확대 이미지" className="object-cover" />
          </div>
        </div>
      )}
    </>
  );
}
