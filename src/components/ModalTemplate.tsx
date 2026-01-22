import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren, ReactNode } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  header: string;
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}>;

function ModalTemplate({ header, isVisible, onClose, ...rest }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {rest.children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: Platform.OS === "ios" ? "95%" : "100%",
    backgroundColor: "#f4f4f4ff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
  },
  headerContainer: {
    height: 50,
    backgroundColor: "grey",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: font.section.fontSize,
  },
});

export default ModalTemplate;
