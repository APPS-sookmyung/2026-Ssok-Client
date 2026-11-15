// Date 또는 ISO 문자열 → "YYYY-MM-DD"
export function formatDate(value: Date | string = new Date()): string {
  if (typeof value === "string") return value.slice(0, 10);
  const yyyy = value.getFullYear();
  const mm = String(value.getMonth() + 1).padStart(2, "0");
  const dd = String(value.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
