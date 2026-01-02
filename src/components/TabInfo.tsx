import Ionicons from "@expo/vector-icons/Ionicons";
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStore from "../store/useStore";
import ActionButton from "./ActionButton";
import UtilityBillData from "./UtilityBillData";
import UtilityRateModal from "./UtilityRateModal";
import UtilityServiceForm from "./UtilityServiceForm";

type lastBill = {
  rate: number;
  previous: number;
  current: number;
  sum: number;
  date: string;
};

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
  const lastBills: any = useStore(({ lastBills }) => lastBills);
  const bill: lastBill = lastBills[tabs.currentTabIndex] ?? {};
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 90}
      behavior="position"
      style={{ flex: 1 }}
    >
      <Text style={styles.header}>Останні показання</Text>
      <UtilityBillData currentTabIndex={tabs.currentTabIndex}></UtilityBillData>
      {isFormVisible ? (
        <View>
          <Text style={styles.header}>Нові показання</Text>
          <UtilityServiceForm
            currentTabIndex={tabs.currentTabIndex}
            lastBill={bill}
            cancelForm={setIsFormVisible}
          />
        </View>
      ) : (
        <View style={styles.controls}>
          <ActionButton
            header="Додати показники"
            customStyle={styles.addUtilityButton}
            handler={() => setIsFormVisible(true)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}
            onPress={() => setModalVisibility(true)}
          >
            <Ionicons name="settings-outline" size={40} color="#fcf0f0ff" />
          </TouchableOpacity>
        </View>
      )}
      <UtilityRateModal
        lastBill={bill}
        modalVisibility={modalVisibility}
        currentTabIndex={tabs.currentTabIndex}
        closeModal={() => setModalVisibility(false)}
      ></UtilityRateModal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  addUtilityButton: {
    width: "80%",
  },
  header: {
    marginTop: 30,
    fontSize: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  controls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default TabInfo;
