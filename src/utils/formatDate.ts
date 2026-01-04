function formatNumber(number: number) {
  let text = number.toString();
  return text.padStart(2, "0");
}

export function getDateWithTime() {
  const date = new Date();
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  return `${date.toLocaleDateString()}, ${hours}:${minutes}`;
}
