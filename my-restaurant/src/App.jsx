import React from "react";

function App() {
  const stores = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-[#0f0f10] text-zinc-100 p-6 md:p-12 font-sans">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-2 tracking-tight">DELICIOUS LIST</h1>
        <p className="text-zinc-500 text-sm">오늘 당신을 행복하게 할 최고의 맛집</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-20">
        {/* 찜한 맛집 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">😋</span>
            <h2 className="text-xl font-bold border-b-2 border-orange-500 pb-1">PICKED FAVORITES</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center group hover:border-orange-500/50 transition-all cursor-pointer shadow-xl"
              >
                <span className="text-zinc-700 font-bold group-hover:text-orange-500 transition-colors">
                  SLOT {num}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 맛집 목록 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">⭐</span>
            <h2 className="text-xl font-bold border-b-2 border-zinc-700 pb-1">ALL STORES</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 flex flex-col items-center shadow-lg hover:shadow-orange-500/5 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-3xl font-black shadow-inner mb-6">
                  {store.name}
                </div>

                <h3 className="text-lg font-bold mb-6 text-zinc-300">맛집 리스트 {store.name}</h3>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-orange-500/20">
                  VIEW DETAIL
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-32 py-10 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>맛있는 기록, 함께 나누는 즐거움</p>
        <p className="mt-2 text-[10px] tracking-widest uppercase opacity-50">© 2026 Delicious Grub List</p>
      </footer>
    </div>
  );
}

export default App;
