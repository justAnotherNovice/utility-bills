import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = PropsWithChildren<{
  isActive: boolean;
  icon: any;
  size: number;
  onPress: () => void;
}>;

function HistoryControlsIcon({ isActive, icon, size, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.test, isActive && styles.focused]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={isActive ? "#fff" : "#000"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  test: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 15,
  },
  focused: {
    backgroundColor: "grey",
  },
});

export default HistoryControlsIcon;
