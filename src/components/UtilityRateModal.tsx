import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useStore from "../store/useStore";
import ActionButton from "./ActionButton";
import ModalTemplate from "./ModalTemplate";
import TextInputField from "./TextInputField";

type Props = PropsWithChildren<{
  lastBill: any;
  modalVisibility: boolean;
  currentTabIndex: number;
  closeModal: () => void;
}>;

function UtilityRateModal({ lastBill, ...rest }: Props) {
  let [rate, setRate] = useState(lastBill?.rate ?? 0);
  const updateLastBills = useStore(({ updateLastBills }) => updateLastBills);

  function saveRateValue() {
    updateLastBills(rest.currentTabIndex, { rate });
    rest.closeModal();
  }

  return (
    <ModalTemplate
      header="Змінити тариф"
      isVisible={rest.modalVisibility}
      customStyles={styles.modal}
      onClose={rest.closeModal}
    >
      <View style={styles.modaInner}>
        <TextInputField
          header="Введіть тариф"
          value={rate}
          inputHandler={setRate}
        />
        <Text style={styles.smallText}>Поточний тариф: {lastBill?.rate}</Text>
        <ActionButton
          header="Зберегти"
          customStyle={styles.button}
          handler={saveRateValue}
        />
      </View>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "30%",
  },
  modaInner: {
    marginHorizontal: 10,
  },
  headerText: {
    color: "#fff",
  },
  smallText: {
    marginTop: 2,
    fontSize: 13,
    marginBottom: 15,
  },
  button: {
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default UtilityRateModal;
