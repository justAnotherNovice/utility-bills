import ModalTemplate from "@/src/components/ModalTemplate";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  history: any;
  setSelectedYear: React.Dispatch<any>;
  onClose: () => void;
}>;

function UtilityYearsModal({ isVisible, history, ...rest }: Props) {
  function selectYear(year: number) {
    rest.setSelectedYear(year);
    rest.onClose();
  }

  return (
    <ModalTemplate
      header="Оберіть рік"
      isVisible={isVisible}
      customStyles={styles.modal}
      onClose={rest.onClose}
    >
      <ScrollView contentContainerStyle={styles.modalInner}>
        {Object.keys(history).map((year: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => selectYear(year)}
          >
            <Text style={styles.buttonText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "100%",
  },
  modalInner: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    padding: 8,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: "grey",
    borderRadius: 15,
    backgroundColor: "#E3E3E3",
    width: "95%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
  },
});

export default UtilityYearsModal;
