import ModalTemplate from "@/src/components/ModalTemplate";
import useStore from "@/src/store/useStore";
import { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";
import UtilityForm from "./UtilityForm";

type Props = PropsWithChildren<{
  bill: any;
  activeTab: number;
  isVisible: boolean;
  onClose: () => void;
}>;

function EditUtilityBillModal({ bill, activeTab, isVisible, onClose }: Props) {
  const updateLastBill = useStore(({ updateLastBill }) => updateLastBill);

  async function updateBill(updatedBill: any) {
    await updateLastBill(activeTab, updatedBill);
  }

  return (
    <ModalTemplate
      header="Змінити показники"
      isVisible={isVisible}
      customStyles={styles.modal}
      onClose={onClose}
    >
      <View style={styles.modalInner}>
        <UtilityForm
          bill={bill}
          activeTab={activeTab}
          cancelForm={onClose}
          previousValue={bill.info.previous}
          currentValue={bill.info.current}
          saveBill={updateBill}
          isEdit={true}
        />
      </View>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: Platform.OS === "ios" ? "95%" : "100%",
  },
  modalInner: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default EditUtilityBillModal;
