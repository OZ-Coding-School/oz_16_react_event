const BASE_URL = "http://localhost:3000";

// 전체 맛집
export const fetchPlaces = async () => {
  try {
    const response = await fetch(`${BASE_URL}/places`);

    if (!response.ok) {
      throw new Error("데이터 로드 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
