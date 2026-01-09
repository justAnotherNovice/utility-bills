import { fullMonths } from "@/src/data/chartMonths";
import { PropsWithChildren } from "react";
import { BarChart } from "react-native-gifted-charts";

type Props = PropsWithChildren<{
  barData: any[];
  averageSum: number;
  setMonth: React.Dispatch<any>;
}>;

function HistoryBarChart({ barData, averageSum, setMonth }: Props) {
  return (
    <BarChart
      barWidth={17}
      noOfSections={3}
      barBorderRadius={4}
      frontColor="lightgray"
      data={barData}
      yAxisThickness={0}
      xAxisThickness={0}
      spacing={25}
      xAxisLabelsVerticalShift={-2}
      showReferenceLine1
      referenceLine1Position={averageSum}
      height={160}
      width={390}
      onPress={(item: any, index: number) =>
        setMonth({ title: fullMonths[index], index })
      }
    />
  );
}

export default HistoryBarChart;
