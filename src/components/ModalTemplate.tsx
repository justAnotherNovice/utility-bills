import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren, ReactNode } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = PropsWithChildren<{
  header: string;
  customStyles: any;
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}>;

function ModalTemplate({ header, isVisible, onClose, ...rest }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={[styles.modalContent, rest.customStyles]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
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
    backgroundColor: "grey",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
  },
  headerContainer: {
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "black",
    fontSize: 15,
  },
});

export default ModalTemplate;
