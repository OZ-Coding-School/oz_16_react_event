export const BASE_URL = "http://localhost:3000";

// 맛집 정보를 가져오는 함수
export async function fetchPlaces() {
  const response = await fetch(`${BASE_URL}/places`);

  // 서버 응답이 실패했을 때 에러 처리
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("요청하신 페이지를 찾을 수 없어요. (404)");
    }
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data;
}

export async function fetchUserPlaces() {
  const response = await fetch(`${BASE_URL}/users/places`);
  if (!response.ok) throw new Error("찜 목록을 가져오지 못했습니다.");
  return await response.json();
}

// 찜한 목록
export async function updateUserPlaces(places) {
  const response = await fetch(`${BASE_URL}/users/places`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ places }),
  });
  if (!response.ok) throw new Error("서버 저장에 실패했습니다.");
  return await response.json();
}
