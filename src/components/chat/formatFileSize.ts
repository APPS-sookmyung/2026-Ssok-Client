// byte → "3.2mb" / "512kb" 형태로 변환
export function formatFileSize(bytes: number) {
  const KB = 1024;
  const MB = KB * 1024;
  if (bytes >= MB) return `${(bytes / MB).toFixed(1)}mb`;
  if (bytes >= KB) return `${Math.round(bytes / KB)}kb`;
  return `${bytes}b`;
}
