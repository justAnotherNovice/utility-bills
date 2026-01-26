import { fullMonths } from "@/src/data/chartMonths";
import {
  formatDataAsBarChart,
  getBarChartToCompare,
} from "@/src/utils/chartDisplay";
import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type Props = PropsWithChildren<{
  history: any[];
  averageSum: number;
  selectedYears: any[];
  setMonth: React.Dispatch<any>;
}>;

function HistoryBarChart({ history, averageSum, ...rest }: Props) {
  const barData = useMemo(() => {
    if (rest.selectedYears.length === 2) {
      return getBarChartToCompare(
        history[rest.selectedYears[0]],
        history[rest.selectedYears[1]],
      );
    }
    return formatDataAsBarChart(history[rest.selectedYears[0]]);
  }, [history, rest.selectedYears]);

  function selectMonth(item: any) {
    rest.setMonth({ title: fullMonths[item.index], index: item.index });
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.legendContainer,
          rest.selectedYears.length === 2 && {
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={styles.legendItem}>
          <View style={[styles.box, { backgroundColor: "#177AD5" }]}></View>
          <Text>{rest.selectedYears[0]}</Text>
        </View>
        {rest.selectedYears.length === 2 && (
          <View style={styles.legendItem}>
            <View style={[styles.box, { backgroundColor: "#CED5E1" }]}></View>
            <Text>{rest.selectedYears[1]}</Text>
          </View>
        )}
      </View>
      <BarChart
        barWidth={17}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        spacing={25}
        xAxisLabelsVerticalShift={2}
        yAxisLabelWidth={40}
        showReferenceLine1
        referenceLine1Position={averageSum}
        height={160}
        width={380}
        onPress={(item: any) => selectMonth(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "50%",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});

export default HistoryBarChart;
