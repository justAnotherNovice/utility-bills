import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  labels: any[];
  startFrom: number;
}>;

export default function UtilityLabels({ labels, startFrom }: Props) {
  return (
    <View style={[styles.content]}>
      {labels.slice(startFrom).map((label: string, index) => {
        return (
          <Text style={font.text} key={index}>
            {label}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "35%",
    height: "95%",
    justifyContent: "space-between",
  },
});
