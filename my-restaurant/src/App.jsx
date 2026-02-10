import React, { useState, useEffect, useCallback } from "react";
import { fetchPlaces, fetchUserPlaces, updateUserPlaces, deleteUserPlace } from "./api/restaurant";
import { sortPlacesByDistance } from "./utils/loc";
import PlaceCard from "./components/PlaceCard";
import Modal from "./components/Modal";

function App() {
  const [stores, setStores] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const allData = await fetchPlaces();
        const userData = await fetchUserPlaces();

        const initialPlaces = allData.places || allData;
        setUserPlaces(userData || []);

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

  // 맛집 찜하기
  async function handleSelectPlace(selectedPlace) {
    const isPicked = userPlaces.some((p) => p.id === selectedPlace.id);
    if (isPicked) return;

    setUserPlaces((prev) => [selectedPlace, ...prev]);

    try {
      await updateUserPlaces(selectedPlace);
    } catch (err) {
      console.error("서버 업데이트 에러", err);
    }
  }

  // 삭제 전 모달 띄우기
  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    setSelectedPlaceId(id);
  }

  // 찜한 맛집 삭제
  const handleRemovePlace = useCallback(
    async function () {
      setUserPlaces((prev) => prev.filter((p) => p.id !== selectedPlaceId));
      setIsModalOpen(false);

      try {
        await deleteUserPlace(selectedPlaceId);
      } catch (err) {
        console.error("삭제 실패", err);
      }
    },
    [selectedPlaceId],
  );

  return (
    <div className="min-h-screen bg-[#0f0f10] text-zinc-100 p-6 md:p-12 font-sans">
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center text-zinc-900">
          <h2 className="text-2xl font-bold mb-4">삭제할까요?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 bg-zinc-200 rounded text-black font-bold"
            >
              취소
            </button>
            <button onClick={handleRemovePlace} className="px-6 py-2 bg-orange-500 text-white rounded font-bold">
              확인
            </button>
          </div>
        </div>
      </Modal>
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
                  <PlaceCard
                    key={`fav-${place.id}`}
                    place={place}
                    onSelect={() => handleStartRemovePlace(place.id)}
                    isFavorite={true}
                  />
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
                    onSelect={() => handleSelectPlace(store)}
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
