import ActionButton from "@/src/ui/ActionButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = PropsWithChildren<{
  showform: () => void;
  showModal: () => void;
}>;

function UtilityFormControls({ showform, showModal }: Props) {
  return (
    <View style={styles.controls}>
      <ActionButton
        header="Додати показники"
        customStyle={styles.addUtilityButton}
        handler={showform}
      />
      <TouchableOpacity style={styles.settingsButton} onPress={showModal}>
        <Ionicons name="settings-outline" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addUtilityButton: {
    width: "80%",
  },
  controls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  settingsButton: {
    backgroundColor: "grey",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
});

export default UtilityFormControls;
