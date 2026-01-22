import font from "@/src/assets/Styles/font";
import ModalTemplate from "@/src/components/ModalTemplate";
import ActionButton from "@/src/ui/ActionButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  history: any;
  selectedYears: any[];
  selectYear: React.Dispatch<any>;
  onClose: () => void;
  clearYears: () => void;
}>;

function UtilityYearsModal({ isVisible, history, ...rest }: Props) {
  return (
    <ModalTemplate
      header="Оберіть рік"
      isVisible={isVisible}
      onClose={rest.onClose}
    >
      <View style={styles.container}>
        <View style={styles.yearsControls}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={rest.clearYears}
          >
            <MaterialIcons name="delete" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.selectedYears}>
            {rest.selectedYears.map((year, index) => (
              <Text style={styles.selectedYear} key={index}>
                {year}
              </Text>
            ))}
          </View>
        </View>
        <ActionButton
          header="Застосувати"
          handler={() => rest.onClose()}
          customStyle={{}}
        />
        <ScrollView contentContainerStyle={styles.modalInner}>
          {Object.keys(history).map((year: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => rest.selectYear(year)}
            >
              <Text style={styles.buttonText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ModalTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  modalInner: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    padding: 8,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: "grey",
    borderRadius: 15,
    backgroundColor: "#E3E3E3",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: font.header.fontSize,
  },
  yearsControls: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginVertical: 10,
  },
  selectedYears: {
    marginLeft: 10,
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
  },
  selectedYear: {
    backgroundColor: "#E3E3E3",
    width: 90,
    padding: 10,
    fontSize: 15,
    textAlign: "center",
    borderRadius: 15,
  },
  clearButton: {
    backgroundColor: "grey",
    padding: 6,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default UtilityYearsModal;
