function findMax(utilityHistory: any[]) {
  let max = utilityHistory.reduce((prev, current) => {
    return prev > current.sum ? prev : current.sum;
  }, 0);
  return max;
}

export function getExpenses(utilityHistory: any[]) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < utilityHistory.length; i++) {
    sum += utilityHistory[i].sum;
    count += utilityHistory[i].count;
  }
  let averageSum = sum / utilityHistory.length;
  let averageCount = count / utilityHistory.length;
  let max = findMax(utilityHistory);
  return { sum, averageSum, averageCount, count, max };
}
