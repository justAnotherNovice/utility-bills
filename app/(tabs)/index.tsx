import TabInfo from "@/src/components/TabInfo";
import TabMenu from "@/src/components/TabMenu";
import useStore from "@/src/store/useStore";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [tabs, setTabs] = useState({
    currentTabIndex: -1,
    states: [false, false, false],
  });
  const tabStatesRef = useRef([false, false, false]);
  const [isFormVisible, setisFormVisible] = useState(false);
  const getLastBills = useStore(({ getLastBills }) => getLastBills);

  useEffect(() => {
    async function getData() {
      await getLastBills();
    }
    getData();
  }, []);

  function changeCurrentTab(tabIndex: number) {
    const states = [...tabStatesRef.current];
    states[tabIndex] = true;
    setTabs({
      currentTabIndex: tabIndex,
      states,
    });
    setisFormVisible(false);
  }

  return (
    <View style={styles.container}>
      <TabMenu tabs={tabs} changeCurrentTab={changeCurrentTab} />
      <ScrollView style={styles.content}>
        {tabs.currentTabIndex !== -1 ? (
          <TabInfo
            tabs={tabs}
            isFormVisible={isFormVisible}
            setIsFormVisible={setisFormVisible}
          />
        ) : (
          <View style={{ marginTop: 50 }}>
            <Text style={{ textAlign: "center" }}>Оберіть послугу</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 15,
  },
});
