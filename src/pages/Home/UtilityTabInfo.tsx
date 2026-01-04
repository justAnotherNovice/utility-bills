import Accordion from "@/src/ui/Accordion";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import useStore from "../../store/useStore";
import UtilityForm from "./UtilityForm";
import UtilityFormControls from "./UtilityFormControls";
import UtilityRateModal from "./UtilityRateModal";

type Props = PropsWithChildren<{
  activeTab: number;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<any>;
}>;

function UtilityTabInfo({ activeTab, isFormVisible, setIsFormVisible }: Props) {
  let [modalVisibility, setModalVisibility] = useState(false);
  const lastBills: any = useStore(({ lastBills }) => lastBills);
  const bill = lastBills[activeTab];
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 90}
      behavior="position"
    >
      {bill && (
        <View style={{ marginTop: 30 }}>
          <Accordion title="Останні показники">
            <View style={styles.container}>
              <View style={styles.utilityInfo}>
                <UtilityLabels startFrom={0} />
                <UtilityInformation
                  bill={bill?.info}
                  startFrom={0}
                  activeTab={activeTab}
                />
              </View>
              <View style={styles.dateField}>
                <Text style={styles.date}>{bill?.info?.date}</Text>
              </View>
            </View>
          </Accordion>
        </View>
      )}
      {isFormVisible ? (
        <UtilityForm
          currentTabIndex={activeTab}
          bill={bill}
          cancelForm={setIsFormVisible}
        />
      ) : (
        <UtilityFormControls
          showform={() => setIsFormVisible(true)}
          showModal={() => setModalVisibility(true)}
        />
      )}
      {modalVisibility && (
        <UtilityRateModal
          lastBill={bill}
          modalVisibility={modalVisibility}
          currentTabIndex={activeTab}
          closeModal={() => setModalVisibility(false)}
        ></UtilityRateModal>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  utilityInfo: {
    marginLeft: 5,
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    marginBottom: 25,
  },
  date: {
    alignSelf: "flex-end",
  },
  dateField: {
    position: "absolute",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "grey",
    bottom: 0,
    right: 5,
    paddingTop: 35,
  },
});

export default UtilityTabInfo;
