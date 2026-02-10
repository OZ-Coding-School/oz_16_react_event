export const BASE_URL = "http://localhost:3000";

// 맛집 전체 목록
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
  return data.places;
}
//찜한 맛집 목록
export async function fetchUserPlaces() {
  const response = await fetch(`${BASE_URL}/users/places`);

  // 서버 응답 실패
  if (!response.ok) {
    throw new Error("찜한 목록을 불러오는 데 실패했습니다.");
  }

  const resData = await response.json();
  return resData.places;
}

// 맛집 찜하기
export async function updateUserPlaces(place) {
  const response = await fetch(`${BASE_URL}/users/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ place }),
  });

  // 서버 응답 실패
  if (!response.ok) throw new Error("서버 저장에 실패했습니다.");

  const resData = await response.json();
  return resData.places;
}
//찜한 맛집 삭제
export async function deleteUserPlace(id) {
  const response = await fetch(`${BASE_URL}/users/places/${id}`, {
    method: "DELETE",
  });

  // 서버 응답 실패
  if (!response.ok) throw new Error("맛집 삭제에 실패했습니다.");

  return await response.json();
}
