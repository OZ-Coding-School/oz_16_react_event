import React from "react";
import { BASE_URL } from "../api/restaurant";

function PlaceCard({ place, onSelect, isFavorite }) {
  return (
    <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col hover:border-orange-500/20 transition-all">
      <div className="relative h-48 w-full">
        {/* 서버 기본 주소, 이미지 경로  */}
        <img src={`${BASE_URL}/${place.image.src}`} alt={place.image.alt} className="w-full h-full object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{place.title}</h3>
        <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{place.description}</p>

        {/* 찜에 따라 색상 변경 */}
        <button
          onClick={() => onSelect(place)}
          className={`w-full py-3 rounded-xl font-bold transition-colors ${
            isFavorite ? "bg-zinc-700 text-zinc-300" : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {isFavorite ? "찜 해제" : "맛집 찜하기"}
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;
