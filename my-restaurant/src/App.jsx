import React, { useState, useEffect } from "react";
import { fetchPlaces, fetchUserPlaces, updateUserPlaces } from "./api/restaurant";
import { sortPlacesByDistance } from "./utils/loc";
import PlaceCard from "./components/PlaceCard";

function App() {
  const [stores, setStores] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const allData = await fetchPlaces();
        const userData = await fetchUserPlaces();

        const initialPlaces = allData.places || allData;
        setUserPlaces(userData.places || []);

        // 브라우저 API로 내 위치 갖고오기
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sorted = sortPlacesByDistance(initialPlaces, position.coords.latitude, position.coords.longitude);
            setStores(sorted);
            setLoading(false);
          },
          (geoError) => {
            // 위치 정보 거부
            console.error("위치 획득 실패", geoError);
            setStores(initialPlaces);
            setError("위치 확인이 안 되어 기본 순서로 보여드립니다.");
            setLoading(false);
          },
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleTogglePlace(selectedPlace) {
    const isPicked = userPlaces.some((p) => p.id === selectedPlace.id);
    let updatedList;

    if (isPicked) {
      updatedList = userPlaces.filter((p) => p.id !== selectedPlace.id);
    } else {
      updatedList = [selectedPlace, ...userPlaces];
    }

    // 화면(상태) 업데이트
    setUserPlaces(updatedList);

    try {
      // 서버에도 바뀐 목록 저장
      await updateUserPlaces(updatedList);
    } catch (err) {
      console.error("서버 업데이트 에러", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-zinc-100 p-6 md:p-12 font-sans">
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 mb-2">DELICIOUS LIST</h1>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </header>

      <main className="max-w-6xl mx-auto space-y-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium text-zinc-400">맛집 정보를 불러오는 중입니다.</p>
          </div>
        ) : (
          <>
            {/* 내가 찜한 목록 */}
            <section>
              <h2 className="text-xl font-bold border-b-2 border-orange-500 pb-1 mb-8 inline-block">MY FAVORITES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {userPlaces.map((place) => (
                  <PlaceCard key={`fav-${place.id}`} place={place} onSelect={handleTogglePlace} isFavorite={true} />
                ))}
              </div>
            </section>

            {/* 전체 맛집 목록 */}
            <section>
              <h2 className="text-xl font-bold border-b-2 border-zinc-700 pb-1 mb-8 inline-block">ALL STORES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stores.map((store) => (
                  <PlaceCard
                    key={store.id}
                    place={store}
                    onSelect={handleTogglePlace}
                    isFavorite={userPlaces.some((p) => p.id === store.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
