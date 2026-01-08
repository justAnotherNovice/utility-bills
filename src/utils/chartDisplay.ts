import { shortMonths } from "../data/chartMonths";

export function formatDataAsBarChart(history: any[], averageSum?: number) {
  return shortMonths.map((month, index) => {
    let value = history[index] ? history[index].sum : 0;
    let barInfo: any = { value, label: month };
    if (averageSum && history[index]) {
      barInfo.frontColor =
        history[index].sum > averageSum ? "#177AD5" : "#CED5E1";
    }
    return barInfo;
  });
}
