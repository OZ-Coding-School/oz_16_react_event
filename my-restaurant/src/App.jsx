import React, { useState, useEffect } from "react";
import { fetchPlaces } from "./api/restaurant";
import PlaceCard from "./components/PlaceCard";

function App() {
  // 맛집 데이터, 로딩 상태 관리
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    fetchPlaces()
      .then((data) => {
        setStores(data.places || data);
      })
      .catch((error) => {
        console.error("데이터 로딩 실패:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-zinc-100 p-6 md:p-12 font-sans">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-2 tracking-tight">DELICIOUS LIST</h1>
        <p className="text-zinc-500 text-sm">오늘 당신을 행복하게 할 최고의 맛집</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-20">
        {/* 로딩상태 조건부 렌더링 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium text-zinc-400">맛집을 불러오는 중입니다...</p>
          </div>
        ) : (
          <>
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
                  <PlaceCard key={store.id} place={store} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-32 py-10 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>맛있는 기록, 함께 나누는 즐거움</p>
        <p className="mt-2 text-[10px] tracking-widest uppercase opacity-50">© 2026 Delicious Grub List</p>
      </footer>
    </div>
  );
}

export default App;
