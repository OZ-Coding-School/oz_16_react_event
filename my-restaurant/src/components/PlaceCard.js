import React from "react";
import { BASE_URL } from "../api/restaurant";

function PlaceCard({ place }) {
  return (
    <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col shadow-lg hover:shadow-orange-500/10 transition-all group">
      {/* 이미지 */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={`${BASE_URL}/${place.image.src}`}
          alt={place.image.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 텍스트 */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-zinc-100 group-hover:text-orange-500 transition-colors">
          {place.title}
        </h3>
        <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">{place.description}</p>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-orange-500/20">
          VIEW DETAIL
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;
