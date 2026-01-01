import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalTemplate from "./ModalTemplate";
import TextInputField from "./TextInputField";

type Props = PropsWithChildren<{
  currentRate: number;
  modalVisibility: boolean;
  closeModal: () => void;
}>;

function UtilityRateModal({ currentRate, modalVisibility, closeModal }: Props) {
  let [rate, setRate] = useState(currentRate);
  let [isChanged, setIsChanged] = useState(false);

  function saveRateValue() {
    setIsChanged(true);
  }
  return (
    <ModalTemplate
      header="Змінити тариф"
      isVisible={modalVisibility}
      customStyles={styles.modal}
      onClose={closeModal}
    >
      <View style={styles.modaInner}>
        <TextInputField
          header="Введіть тариф"
          value={rate}
          inputHandler={setRate}
        />
        <Text style={{ marginTop: 2, fontSize: 13, marginBottom: 15 }}>
          Поточний тариф: {isChanged ? rate : currentRate}
        </Text>
        <TouchableOpacity
          style={styles.addUtilityButton}
          onPress={saveRateValue}
        >
          <Text style={styles.buttonText}>Зберегти</Text>
        </TouchableOpacity>
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
    color: "black",
    fontSize: 15,
  },
  addUtilityButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default UtilityRateModal;
