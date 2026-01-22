import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  section: {
    fontSize: Platform.OS === "ios" ? 20 : 17,
  },
  header: {
    fontSize: Platform.OS === "ios" ? 19 : 16,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 18 : 15,
  },
});
