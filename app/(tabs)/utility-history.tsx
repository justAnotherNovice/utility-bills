import UtililityMenu from "@/src/layouts/UtilityMenu";
import HistoryChartDisplay from "@/src/pages/UtilityHistory/HistoryChartDisplay";
import HistoryControls from "@/src/pages/UtilityHistory/HistoryControls";
import HistoryTextDisplay from "@/src/pages/UtilityHistory/HistoryTextDisplay";
import UtilityYearsModal from "@/src/pages/UtilityHistory/UtilityYearsModal";
import useStore from "@/src/store/useStore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [activeTab, setActiveTab] = useState(-1);
  let [displayText, setDisplayText] = useState(true);
  let [selectedYear, setSelectedYear] = useState<any[]>([]);
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

  function selectYear(year: number) {
    if (selectedYear.length !== 2) {
      setSelectedYear([...selectedYear, year]);
    } else setSelectedYear([selectedYear[0], year]);
  }

  function changeDataView() {
    setDisplayText(!displayText);
  }

  return (
    <View style={styles.container}>
      <UtililityMenu
        activeTab={activeTab}
        changeCurrentTab={setActiveTab}
      ></UtililityMenu>
      <HistoryControls
        showModal={() => setIsModalVisible(true)}
        {...{ displayText, changeDataView }}
      />
      <View style={styles.content}>
        {displayText
          ? selectedYear.length > 0 &&
            history[activeTab] && (
              <HistoryTextDisplay
                activeTab={activeTab}
                history={history}
                selectedYear={selectedYear}
              />
            )
          : selectedYear.length > 0 &&
            history[activeTab] && (
              <HistoryChartDisplay
                activeTab={activeTab}
                history={history[activeTab]}
                selectedYears={selectedYear}
                setIsModalVisible={() => setIsModalVisible(true)}
              />
            )}
      </View>
      {isModalVisible && history[activeTab] && (
        <UtilityYearsModal
          isVisible={isModalVisible}
          history={history[activeTab]}
          setSelectedYear={selectYear}
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
