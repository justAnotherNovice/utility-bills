import style from "@/src/assets/Styles/style";
import {
  labels,
  utilityTemplates,
  yearLables,
  yearTemplates,
} from "@/src/data/UtilityInfo";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import { getExpenses } from "@/src/utils/calculateUtilityExpense";
import { formatDataAsBarChart } from "@/src/utils/chartDisplay";
import { PropsWithChildren, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HistoryBarChart from "./HistoryBarChart";

type Props = PropsWithChildren<{
  activeTab: number;
  history: any[];
}>;

function HistoryChartDisplay({ activeTab, history }: Props) {
  let [selectedMonth, setSelectedMonth] = useState({
    title: "Місяць",
    index: -1,
  });
  const yearInfo = useMemo(() => getExpenses(history), [history]);
  const barData = useMemo(() => {
    return formatDataAsBarChart(history, yearInfo.averageSpent);
  }, [history]);

  return (
    <View style={{ flex: 1 }}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Витрати 2026</Text>
      </View>
      <View style={styles.chartContainer}>
        <HistoryBarChart
          barData={barData}
          averageSum={yearInfo.averageSpent}
          setMonth={setSelectedMonth}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.headerContainer}>
          <Text style={style.headerText}>{selectedMonth.title}</Text>
        </View>
        {history[selectedMonth.index] ? (
          <View style={style.utilityInfo}>
            <UtilityLabels labels={labels} startFrom={0} />
            <UtilityInformation
              bill={history[selectedMonth.index]}
              templates={utilityTemplates}
              startFrom={0}
              activeTab={activeTab}
            />
          </View>
        ) : (
          <Text style={styles.emptyMonth}>Відомості відсутні</Text>
        )}
        <View style={style.headerContainer}>
          <Text style={style.headerText}>Всього за рік</Text>
        </View>
        <View style={style.utilityInfo}>
          <UtilityLabels labels={yearLables} startFrom={0} />
          <UtilityInformation
            bill={yearInfo}
            templates={yearTemplates}
            startFrom={0}
            activeTab={activeTab}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  emptyMonth: {
    textAlign: "center",
    fontSize: 16,
    borderColor: "grey",
    borderWidth: 2,
    borderCurve: "continuous",
    borderRadius: 15,
    paddingVertical: 75,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "lightgrey",
  },
});

export default HistoryChartDisplay;
