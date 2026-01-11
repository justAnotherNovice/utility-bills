function findMax(utilityHistory: any[]) {
  let max = utilityHistory.reduce((prev, current) => {
    return prev > current.sum ? prev : current.sum;
  }, 0);
  return max;
}

export function getExpenses(utilityHistory: any[]) {
  let spent = 0;
  let count = 0;
  if (utilityHistory.length > 0) {
    for (let i = 0; i < utilityHistory.length; i++) {
      spent += utilityHistory[i].sum;
      count += utilityHistory[i].count;
    }
    let averageSpent = spent / utilityHistory.length;
    let averageCount = count / utilityHistory.length;
    let maxSpent = findMax(utilityHistory);
    return { spent, averageSpent, averageCount, count, maxSpent };
  }
  return { spent, averageSpent: 0, maxSpent: 0, count, averageCount: 0 };
}
