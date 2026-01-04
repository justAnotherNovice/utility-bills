import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { utilityTemplates } from "../data/UtilityInfo";

type Props = PropsWithChildren<{
  bill: any;
  startFrom: number;
  activeTab: number;
}>;

function UtilityInformation({ bill, startFrom, activeTab }: Props) {
  let formatters = Object.keys(utilityTemplates).slice(startFrom);
  return (
    <View style={[styles.content]}>
      {formatters.map((key: any, index) => {
        let stringFormatter = utilityTemplates[key];
        return (
          <Text key={index}>{stringFormatter(bill?.[key], activeTab)}</Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "60%",
    height: "95%",
    justifyContent: "space-between",
  },
});

export default UtilityInformation;
