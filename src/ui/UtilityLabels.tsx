import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { labels } from "../data/UtilityInfo";

type Props = PropsWithChildren<{
  startFrom: number;
}>;

export default function UtilityLabels({ startFrom }: Props) {
  return (
    <View style={[styles.content]}>
      {labels.slice(startFrom).map((label: string, index) => {
        return <Text key={index}>{label}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "50%",
    height: "95%",
    justifyContent: "space-between",
  },
});
