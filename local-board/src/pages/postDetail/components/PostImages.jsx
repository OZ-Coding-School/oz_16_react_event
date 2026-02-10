export function PostImages({ images, openImage }) {
  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => openImage(images[0])}
          className="relative w-full max-w-xl rounded-xl overflow-hidden border border-white/10 bg-black/30 group"
        >
          <img
            src={images[0]}
            alt="대표 이미지"
            className="w-full h-auto object-contain"
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/30 flex items-center justify-center">
            <span className="text-white/90 text-sm px-3 py-1 rounded-full bg-black/60">
              확대해서 보기
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button
        type="button"
        onClick={() => openImage(images[0])}
        className="relative md:col-span-2 rounded-xl overflow-hidden border border-white/10 bg-black/30 group"
      >
        <img
          src={images[0]}
          alt="대표 이미지"
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/30 flex items-center justify-center">
          <span className="text-white/90 text-sm px-3 py-1 rounded-full bg-black/60">
            확대해서 보기
          </span>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {images.slice(1, 5).map((url, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openImage(url)}
            className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30 group"
          >
            <img
              src={url}
              alt={`보조 이미지 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/30 flex items-center justify-center">
              <span className="text-white/90 text-xs px-2 py-1 rounded-full bg-black/60">
                확대
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
