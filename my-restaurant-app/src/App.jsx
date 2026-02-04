export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
      {/* HEADER: 검색바 */}
      <header className="p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-black text-orange-500 italic tracking-tighter">EATING MARK</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="맛집 검색..."
            className="bg-zinc-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-12">
        {/* 상단 섹션: 찜한 맛집 */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-orange-400">🔥 내가 찜한 맛집</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {/* 데이터가 없을 때 보여주는 표시 */}
            <div className="min-w-[240px] h-36 bg-zinc-800 rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500">
              <span className="text-2xl">⭐</span>
              <p className="mt-2 text-sm">아직 찜한 맛집이 없네요!</p>
            </div>
          </div>
        </section>

        {/* 하단 섹션: 전체 맛집 목록 */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-zinc-400">🍴 맛집 목록 탐방</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-zinc-800 aspect-[4/3] rounded-2xl animate-pulse border border-zinc-700 flex items-center justify-center text-zinc-600"
              >
                Loading...
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER: 간단한 정보 */}
      <footer className="p-10 text-center text-zinc-600 text-sm border-t border-zinc-800">
        <p>© 2026 EATING MARK. All rights reserved.</p>
      </footer>
    </div>
  );
}
