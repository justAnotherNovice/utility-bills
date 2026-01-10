import { shortMonths } from "../data/chartMonths";

export function formatDataAsBarChart(history: any[]) {
  return shortMonths.map((month, index) => {
    let value = history[index] ? history[index].sum : 0;
    return { value, label: month, frontColor: "#177AD5", index };
  });
}

function createChartValue(year: any, index: number, month?: string) {
  let value = year[index] ? year[index].sum : 0;
  if (month) {
    return {
      value,
      spacing: 2,
      frontColor: "#177AD5",
      labelWidth: 35,
      labelTextStyle: { color: "black" },
      label: month,
      index,
    };
  }
  return { value, frontColor: "#CED5E1", index };
}

export function getBarChartToCompare(year1: any[], year2: any[]) {
  let longest = year1.length > year2.length ? year1 : year2;
  let barChart = [];
  for (let i = 0; i < longest.length; i++) {
    barChart.push(createChartValue(year1, i, shortMonths[i]));
    barChart.push(createChartValue(year2, i));
  }
  return barChart;
}
