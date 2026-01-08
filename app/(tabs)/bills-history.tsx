import UtililityMenu from "@/src/layouts/UtilityMenu";
import HistoryChartDisplay from "@/src/pages/BillHistory/HistoryChartDisplay";
import UtilityHistoryControls from "@/src/pages/BillHistory/HistoryControls";
import HistoryTextDisplay from "@/src/pages/BillHistory/HistoryTextDisplay";
import UtilityYearsModal from "@/src/pages/BillHistory/UtilityYearsModal";
import useStore from "@/src/store/useStore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [activeTab, setActiveTab] = useState(-1);
  let [displayText, setDisplayText] = useState(true);
  let [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const history: any = useStore(({ history }) => history);
  let getHistory = useStore(({ getHistory }) => getHistory);
  let [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function getData() {
      if (!history[activeTab] && activeTab !== -1) {
        await getHistory(activeTab);
      }
    }
    getData();
  }, [activeTab]);
  return (
    <View style={styles.container}>
      <UtililityMenu
        activeTab={activeTab}
        changeCurrentTab={setActiveTab}
      ></UtililityMenu>
      <UtilityHistoryControls
        setIsModalVisible={() => setIsModalVisible(true)}
        {...{ displayText, setDisplayText }}
      />
      <View style={styles.content}>
        {displayText
          ? selectedYear &&
            history[activeTab] && (
              <HistoryTextDisplay
                activeTab={activeTab}
                history={history}
                selectedYear={selectedYear}
              />
            )
          : selectedYear && (
              <HistoryChartDisplay
                activeTab={activeTab}
                history={history[activeTab][selectedYear]}
              />
            )}
      </View>
      {isModalVisible && (
        <UtilityYearsModal
          isVisible={isModalVisible}
          history={history[activeTab]}
          setSelectedYear={setSelectedYear}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
