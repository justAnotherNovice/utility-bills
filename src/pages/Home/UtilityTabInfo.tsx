import font from "@/src/assets/Styles/font";
import { labels, utilityTemplates } from "@/src/data/UtilityInfo";
import Accordion from "@/src/ui/Accordion";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import showConfirmationDialog from "@/src/utils/showConfirmationDialog";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStore from "../../store/useStore";
import EditUtilityBillModal from "./EditUtilityBillModal";
import UtilityForm from "./UtilityForm";
import UtilityFormControls from "./UtilityFormControls";
import UtilityRateModal from "./UtilityRateModal";

type Props = PropsWithChildren<{
  activeTab: number;
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<any>;
}>;

const confirmDialogText = "Ви впевнені що хочете видалити останні показники?";

function UtilityTabInfo({ activeTab, isFormVisible, setIsFormVisible }: Props) {
  let [modalVisibility, setModalVisibility] = useState(false);
  let [editBillModal, setEditBillVisibility] = useState(false);
  const lastBills: any = useStore(({ lastBills }) => lastBills);
  const deleteLastBill = useStore(({ deleteLastBill }) => deleteLastBill);
  const saveBill = useStore(({ saveBill }) => saveBill);
  const bill = lastBills[activeTab];
  const height = useHeaderHeight();

  function deleteBill() {
    showConfirmationDialog(confirmDialogText, () => deleteLastBill(activeTab));
  }

  async function saveBillInfo(resultData: any) {
    await saveBill(activeTab, resultData);
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 90}
      behavior="position"
    >
      {bill?.info && (
        <View style={{ marginTop: 30 }}>
          <Accordion title="Останні показники">
            <View style={styles.container}>
              <View style={styles.utilityInfo}>
                <UtilityLabels labels={labels} startFrom={0} />
                <UtilityInformation
                  bill={bill?.info}
                  templates={utilityTemplates}
                  startFrom={0}
                  activeTab={activeTab}
                />
                <View style={styles.lastBillControls}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setEditBillVisibility(true)}
                  >
                    <MaterialIcons
                      name="edit-document"
                      size={26}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={deleteBill}>
                    <MaterialIcons name="delete" size={26} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.date}>{bill?.info?.date}</Text>
            </View>
          </Accordion>
        </View>
      )}
      {isFormVisible ? (
        <View>
          <Text style={styles.header}>Нові показники</Text>
          <UtilityForm
            bill={bill}
            activeTab={activeTab}
            cancelForm={setIsFormVisible}
            previousValue={bill?.info?.current}
            currentValue={0}
            saveBill={saveBillInfo}
            isEdit={false}
          />
        </View>
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
      {editBillModal && (
        <EditUtilityBillModal
          bill={bill}
          activeTab={activeTab}
          isVisible={editBillModal}
          onClose={() => setEditBillVisibility(false)}
        />
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    marginBottom: 10,
  },
  date: {
    fontSize: font.text.fontSize,
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  lastBillControls: {
    height: "60%",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 10,
  },
  header: {
    marginTop: 20,
    fontSize: font.section.fontSize,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

export default UtilityTabInfo;
