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
import HistoryControlsIcon from "./HistoryControlsIcon";
import HistoryPieChart from "./HistoryPieChart";

type Props = PropsWithChildren<{
  activeTab: number;
  selectedYears: any[];
  history: any[];
  setIsModalVisible: () => void;
}>;

function HistoryChartDisplay({ activeTab, history, ...rest }: Props) {
  let [selectedMonth, setSelectedMonth] = useState({
    title: "Місяць",
    index: -1,
  });
  let [isPieVisible, setIsPieVisible] = useState(false);
  let currentYear = rest.selectedYears[0];
  let yearsBills = history[currentYear];

  const yearInfo = useMemo(
    () => yearsExpenses(),
    [history, rest.selectedYears]
  );
  const barData = useMemo(() => {
    return formatDataAsBarChart(yearsBills, yearInfo[0].averageSpent);
  }, [history]);

  function yearsExpenses(): any[] {
    let year = getExpenses(yearsBills);
    if (rest.selectedYears.length === 2) {
      let yearToCompare = getExpenses(history[rest.selectedYears[1]]);
      return [year, yearToCompare];
    }
    return [year];
  }

  function showPieChart() {
    if (rest.selectedYears.length === 2) {
      setIsPieVisible(!isPieVisible);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Витрати {rest.selectedYears[0]}</Text>
        <HistoryControlsIcon
          icon={"git-compare"}
          isActive={false}
          size={22}
          onPress={rest.setIsModalVisible}
        />
      </View>
      <View style={styles.chartContainer}>
        <HistoryBarChart
          barData={barData}
          averageSum={yearInfo[0].averageSpent}
          setMonth={setSelectedMonth}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.headerContainer}>
          <Text style={style.headerText}>{selectedMonth.title}</Text>
        </View>
        {yearsBills[selectedMonth.index] ? (
          <View style={style.utilityInfo}>
            <UtilityLabels labels={labels} startFrom={0} />
            <UtilityInformation
              bill={yearsBills[selectedMonth.index]}
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
          <HistoryControlsIcon
            icon={"pie-chart"}
            isActive={false}
            size={22}
            onPress={showPieChart}
          />
        </View>
        {isPieVisible ? (
          <HistoryPieChart
            yearsExpenses={yearInfo}
            selectedYears={rest.selectedYears}
          />
        ) : (
          <View style={[style.utilityInfo]}>
            <UtilityLabels labels={yearLables} startFrom={0} />
            <UtilityInformation
              bill={yearInfo[0]}
              templates={yearTemplates}
              startFrom={0}
              activeTab={activeTab}
            />
            {yearInfo[1] && (
              <UtilityInformation
                bill={yearInfo[1]}
                templates={yearTemplates}
                startFrom={0}
                activeTab={activeTab}
              />
            )}
          </View>
        )}
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
    paddingVertical: 60,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "lightgrey",
  },
});

export default HistoryChartDisplay;
