import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  bill: any;
  templates: any[];
  startFrom: number;
  activeTab: number;
}>;

function UtilityInformation({ bill, templates, startFrom, activeTab }: Props) {
  let formatters = Object.keys(templates).slice(startFrom);
  return (
    <View style={[styles.content]}>
      {formatters.map((key: any, index) => {
        let stringFormatter = templates[key];
        return (
          <Text style={font.text} key={index}>
            {stringFormatter(bill?.[key], activeTab)}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 160,
    height: "95%",
    justifyContent: "space-between",
  },
});

export default UtilityInformation;
