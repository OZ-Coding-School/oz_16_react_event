import { useRef } from "react";

const MAX_IMAGES = 5;
export function PostEditView({
  editImages,
  removeImage,
  addImages,
  title,
  contents,
  onChangeEditTitle,
  onChangeEditContent
}) {
  const fileInputRef = useRef(null);

  if (editImages?.length > 0) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border-2 border-dashed border-emerald-400/30 p-7 text-center transition pointer-events-auto">
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden pointer-events-auto">
            {editImages.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-emerald-400/40 text-emerald-400 text-2xl transition hover:border-emerald-400 hover:bg-emerald-400/10 shrink-0 w-36 h-[150px] pointer-events-auto"
              >
                +
              </button>
            )}

            {editImages.map((img, idx) => (
              <div
                key={img.preview}
                className="relative group shrink-0 w-[164px] h-[150px]"
              >
                <img
                  src={img.preview}
                  alt={`preview-${idx}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-1 right-1 hidden h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white text-sm group-hover:flex"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => addImages(Array.from(e.target.files))}
          />
          <div className="pointer-events-none">
            {/* 빈 영역 pointer-events-none 처리 */}
          </div>
        </div>
        <input
          className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-md font-semibold"
          value={title}
          onChange={onChangeEditTitle}
        />
        {/* 내용 */}
        <textarea
          className="w-full min-h-[300px] rounded-xl border border-white/10 bg-transparent px-4 py-3 resize-none"
          value={contents}
          onChange={onChangeEditContent}
        />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="block cursor-pointer rounded-xl border-2 border-dashed border-emerald-400/30 p-7 text-center transition hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] pointer-events-auto"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400 text-emerald-400 text-2xl">
            +
          </div>
          <strong>이미지를 드래그하거나 클릭해 첨부하세요(최대 5장)</strong>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => addImages(Array.from(e.target.files))}
      />
      <input
        className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-md font-semibold"
        value={title}
        onChange={onChangeEditTitle}
      />

      <textarea
        className="w-full min-h-[300px] rounded-xl border border-white/10 bg-transparent px-4 py-3 resize-none"
        value={contents}
        onChange={onChangeEditContent}
      />
    </div>
  );
}
