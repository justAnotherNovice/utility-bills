import { utilityTemplates } from "@/src/data/UtilityInfo";
import Accordion from "@/src/ui/Accordion";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import { getExpenses } from "@/src/utils/calculateUtilityExpense";
import { PropsWithChildren, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HistoryControlsIcon from "./HistoryControlsIcon";

type Props = PropsWithChildren<{
  activeTab: number;
  selectedYear: number;
  history: any;
}>;

function HistoryTextDisplay({ activeTab, history, selectedYear }: Props) {
  let [isAllExpanded, setIsAllExpanded] = useState(false);
  let [stats, setStats] = useState<any>({});

  useEffect(() => {
    if (history[activeTab][selectedYear]) {
      setStats(getExpenses(history[activeTab][selectedYear]));
    }
  }, [activeTab]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Платежі 2026</Text>
        <HistoryControlsIcon
          icon={"chevron-expand"}
          size={20}
          isActive={isAllExpanded}
          onPress={() => setIsAllExpanded(!isAllExpanded)}
        />
      </View>
      <View style={styles.billsContainer}>
        {history[activeTab][selectedYear].map((bill: any, index: number) => (
          <Accordion key={index} title={bill?.date} isExpanded={isAllExpanded}>
            <View style={styles.utilityInfo}>
              <UtilityLabels startFrom={0} />
              <UtilityInformation
                bill={bill}
                startFrom={0}
                activeTab={activeTab}
              />
            </View>
          </Accordion>
        ))}
      </View>
      <View style={styles.stats}>
        <Text style={styles.statsHeader}>Всього за рік</Text>
        <View style={styles.statsInner}>
          <Text>Витрачено {stats.sum} грн.</Text>
          <Text>Середні витрати {stats.averageSum} грн.</Text>
          <Text>Найбільше витрачено {stats.max} грн.</Text>
          <Text>
            Використано {utilityTemplates.count(stats.count, activeTab)}
          </Text>
          <Text>
            Середнє використання{" "}
            {utilityTemplates.count(stats.averageCount, activeTab)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
  },
  billsContainer: {
    paddingHorizontal: 10,
  },
  utilityInfo: {
    marginLeft: 5,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  date: {
    alignSelf: "flex-end",
  },
  monthHeader: {
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 15,
    color: "#fff",
    marginBottom: 10,
  },
  stats: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statsInner: {
    marginTop: 10,
    justifyContent: "space-between",
    height: 140,
  },
  statsHeader: {
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: "grey",
  },
});

export default HistoryTextDisplay;
