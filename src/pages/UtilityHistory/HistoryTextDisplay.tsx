import style from "@/src/assets/Styles/style";
import {
  labels,
  utilityTemplates,
  yearLables,
  yearTemplates,
} from "@/src/data/UtilityInfo";
import Accordion from "@/src/ui/Accordion";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import { getExpenses } from "@/src/utils/calculateUtilityExpense";
import { PropsWithChildren, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HistoryControlsIcon from "./HistoryControlsIcon";

type Props = PropsWithChildren<{
  activeTab: number;
  selectedYear: any[];
  history: any;
}>;

function HistoryTextDisplay({ activeTab, history, selectedYear }: Props) {
  let currentYear = selectedYear[0];
  let yearsBills = history[activeTab][currentYear];
  let [isAllExpanded, setIsAllExpanded] = useState(false);
  let [stats, setStats] = useState<any>({});

  useEffect(() => {
    if (yearsBills) {
      setStats(getExpenses(yearsBills));
    }
  }, [activeTab, history]);

  return (
    <ScrollView style={styles.container}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Платежі 2026</Text>
        <HistoryControlsIcon
          icon={"chevron-expand"}
          size={20}
          isActive={isAllExpanded}
          onPress={() => setIsAllExpanded(!isAllExpanded)}
        />
      </View>
      <View style={styles.billsContainer}>
        {yearsBills.map((bill: any, index: number) => (
          <Accordion key={index} title={bill?.date} isExpanded={isAllExpanded}>
            <View style={style.utilityInfo}>
              <UtilityLabels labels={labels} startFrom={0} />
              <UtilityInformation
                bill={bill}
                templates={utilityTemplates}
                startFrom={0}
                activeTab={activeTab}
              />
            </View>
          </Accordion>
        ))}
      </View>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Всього за рік</Text>
      </View>
      <View style={style.utilityInfo}>
        <UtilityLabels labels={yearLables} startFrom={0} />
        <UtilityInformation
          bill={stats}
          templates={yearTemplates}
          startFrom={0}
          activeTab={activeTab}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  billsContainer: {
    paddingHorizontal: 10,
  },
});

export default HistoryTextDisplay;
