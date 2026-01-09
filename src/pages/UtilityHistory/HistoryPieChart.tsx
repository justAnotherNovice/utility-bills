import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type Props = PropsWithChildren<{
  yearsExpenses: any[];
  selectedYears: any[];
}>;

function HistoryPieChart({ yearsExpenses, selectedYears }: Props) {
  const pieData = useMemo(() => createPieData(), [yearsExpenses]);

  function createPieData() {
    let sum = yearsExpenses[0].spent + yearsExpenses[1].spent;
    let per1 = Math.floor((yearsExpenses[0].spent * 100) / sum);
    let per2 = Math.floor((yearsExpenses[1].spent * 100) / sum);
    return [
      { value: yearsExpenses[0].spent, color: "#177AD5", text: `${per1}%` },
      {
        value: yearsExpenses[1].spent,
        color: "#79D2DE",
        text: `${per2}%`,
      },
    ];
  }

  function renderRectangle(color: string) {
    return (
      <View style={[style.legendRectangle, { backgroundColor: color }]}></View>
    );
  }

  function renderLegendComponent(index: number) {
    return (
      <View style={{ flexDirection: "row" }}>
        {renderRectangle(pieData[index].color)}
        <Text>
          {selectedYears[index]} ({pieData[index].value} грн.)
        </Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <PieChart
        donut
        showText
        textColor="#fff"
        radius={85}
        textSize={16}
        data={pieData}
      />
      <View style={style.legendContainer}>
        {renderLegendComponent(0)}
        {renderLegendComponent(1)}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  legendContainer: {
    height: "35%",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: 35,
  },
  legendRectangle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default HistoryPieChart;
