import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    if (raw == null) return initialValue;
    try {
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (next) => {
    setValue((prev) => {
      const nextValue = typeof next === "function" ? next(prev) : next;
      localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  };

  return [value, setStoredValue];
}
