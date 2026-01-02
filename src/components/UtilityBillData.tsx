import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import useStore from "../store/useStore";

type Props = PropsWithChildren<{
  currentTabIndex: number;
}>;

export default function UtilityBillData({ currentTabIndex }: Props) {
  const lastBills: any = useStore.getState().lastBills;
  const bill: any = lastBills[currentTabIndex] ?? {};

  return (
    <View style={styles.content}>
      <Text>Тариф: {bill?.info?.rate}</Text>
      <Text>Попереднє: {bill?.info?.previous}</Text>
      <Text>Поточне: {bill?.info?.current}</Text>
      <Text>Використано: {bill?.info?.count}</Text>
      <Text>Сумма: {bill?.info?.sum}</Text>
      <Text style={styles.header}>{bill?.info?.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "flex-end",
    fontSize: 15,
  },
  content: {
    marginTop: 10,
    height: 140,
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});
