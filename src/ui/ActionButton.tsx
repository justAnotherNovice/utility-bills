import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  header: string;
  handler: () => void;
  customStyle: any;
}>;

export default function ActionButton({ header, handler, customStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={handler}>
      <Text style={styles.text}>{header}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    paddingVertical: 10,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    fontSize: font.header.fontSize,
    color: "#fff",
  },
});
