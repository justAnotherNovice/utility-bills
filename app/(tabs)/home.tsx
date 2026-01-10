import TabMenu from "@/src/layouts/UtilityMenu";
import UtilityTabInfo from "@/src/pages/Home/UtilityTabInfo";
import useStore from "@/src/store/useStore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [isFormVisible, setisFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(-1);
  const getLastBills = useStore(({ getLastBills }) => getLastBills);
  const saveBill = useStore(({ saveBill }) => saveBill);
  const lastBills: any = useStore(({ lastBills }) => lastBills);

  useEffect(() => {
    async function getData() {
      await getLastBills();
    }
    getData();
  }, []);

  function changeCurrentTab(tabIndex: number) {
    setActiveTab(tabIndex);
    setisFormVisible(false);
  }

  return (
    <View style={styles.container}>
      <TabMenu activeTab={activeTab} changeCurrentTab={changeCurrentTab} />
      <ScrollView style={styles.content}>
        {activeTab !== -1 ? (
          <UtilityTabInfo
            activeTab={activeTab}
            isFormVisible={isFormVisible}
            setIsFormVisible={setisFormVisible}
          />
        ) : (
          <View style={styles.info}>
            <View style={{ alignSelf: "flex-end" }}>
              <Text style={styles.text}>Оберіть послугу</Text>
              <Text style={[styles.text, { marginTop: 20 }]}>
                для відображення інформації
              </Text>
            </View>
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
  info: {
    height: 300,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
});
