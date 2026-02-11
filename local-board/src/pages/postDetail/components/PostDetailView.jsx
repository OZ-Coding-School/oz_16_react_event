import { PostImages } from "./PostImages";

const INPUT_BASE_CLASS = `w-full text-md font-semibold focus:outline-none rounded-xl 
border border-white/10 bg-transparent px-4 py-3`;

export function PostDetailView({ currentPost, openImage }) {
  const { title, contents, images } = currentPost;

  return (
    <>
      {images.length > 0 && (
        <PostImages images={images} openImage={openImage} />
      )}
      {/* 제목 */}
      <input className={`${INPUT_BASE_CLASS}`} value={title} readOnly />
      {/* 내용 */}
      <textarea
        className={`${INPUT_BASE_CLASS} min-h-[300px] resize-none`}
        value={contents}
        readOnly
      />
    </>
  );
}
