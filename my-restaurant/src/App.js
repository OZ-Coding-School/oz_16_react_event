import React, { useEffect, useState } from "react";
import { fetchPlaces } from "./api/restaurant";
import PlaceCard from "./components/PlaceCard";

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces().then((data) => {
      setPlaces(data.places || data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-zinc-100 p-6 md:p-12 font-sans">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-2 tracking-tight">DELICIOUS LIST</h1>
        <p className="text-zinc-500 text-sm">오늘 당신을 행복하게 할 최고의 맛집</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">⭐</span>
          <h2 className="text-xl font-bold border-b-2 border-zinc-700 pb-1">ALL STORES</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-32 py-10 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>맛있는 기록, 함께 나누는 즐거움</p>
        <p className="mt-2 text-[10px] tracking-widest uppercase opacity-50">© 2026 Delicious Grub List</p>
      </footer>
    </div>
  );
}

export default App;
