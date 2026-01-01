import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{}>;

export default function LastUtilityBillData() {
  return (
    <View style={styles.content}>
      <Text style={styles.header}>2025-12-31</Text>
      <Text>Тариф</Text>
      <Text>Сумма</Text>
      <Text>Попереднє</Text>
      <Text>Поточне</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: "flex-end", fontSize: 15 },
  content: {
    height: 140,
    justifyContent: "space-between",
  },
});
