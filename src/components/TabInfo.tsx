import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LastUtilityBillData from "./LastUtilityBillData";
import UtilityRateModal from "./UtilityRateModal";
import UtilityServiceForm from "./UtilityServiceForm";

type Props = PropsWithChildren<{
  tabs: {
    currentTabIndex: number;
    states: boolean[];
  };
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<any>;
}>;

function TabInfo({ tabs, isFormVisible, setIsFormVisible }: Props) {
  let [modalVisibility, setModalVisibility] = useState(false);
  useEffect(() => {
    async function getTabData() {
      const data = await AsyncStorage.getItem(tabs.currentTabIndex.toString());
    }
    getTabData;
  }, []);

  return (
    <View>
      <Text style={styles.header}>Останні показання</Text>
      <LastUtilityBillData></LastUtilityBillData>
      {isFormVisible ? (
        <View>
          <Text style={styles.header}>Нові показання</Text>
          <UtilityServiceForm cancelForm={setIsFormVisible} />
        </View>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.addUtilityButton}
            onPress={() => setIsFormVisible(true)}
          >
            <Text style={styles.buttonText}>Додати показники</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisibility(true)}>
            <Ionicons name="settings-outline" size={40} color="black" />
          </TouchableOpacity>
        </View>
      )}
      <UtilityRateModal
        modalVisibility={modalVisibility}
        closeModal={() => setModalVisibility(false)}
        currentRate={8}
      ></UtilityRateModal>
    </View>
  );
}

const styles = StyleSheet.create({
  addUtilityButton: {
    width: "80%",
    backgroundColor: "grey",
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
  header: {
    marginTop: 30,
    fontSize: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
});

export default TabInfo;
