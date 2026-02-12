export function parseDateString(dateStr) {
  const [ymd, hm] = (dateStr ?? "").split(" ");
  if (!ymd || !hm) return 0;

  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hm.split(":").map(Number);

  const dt = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0);
  return dt.getTime();
}
