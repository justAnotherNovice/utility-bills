import ModalTemplate from "@/src/components/ModalTemplate";
import useStore from "@/src/store/useStore";
import ActionButton from "@/src/ui/ActionButton";
import TextInputField from "@/src/ui/TextInputField";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  lastBill: any;
  modalVisibility: boolean;
  currentTabIndex: number;
  closeModal: () => void;
}>;

function UtilityRateModal({ lastBill, ...rest }: Props) {
  let [rate, setRate] = useState("");
  const updateLastBills = useStore(({ updateLastBills }) => updateLastBills);

  function saveRateValue() {
    let decimalRate = parseFloat(rate);
    if (decimalRate) {
      updateLastBills(rest.currentTabIndex, { rate: decimalRate });
      rest.closeModal();
    }
  }

  return (
    <ModalTemplate
      header="Змінити тариф"
      isVisible={rest.modalVisibility}
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
  modaInner: {
    marginHorizontal: 10,
  },
  smallText: {
    marginTop: 2,
    fontSize: 13,
    marginBottom: 15,
    marginLeft: 5,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
});

export default UtilityRateModal;
