import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Tab from "./Tab";

type Props = PropsWithChildren<{
  tabs: any;
  changeCurrentTab: (tabIndex: number) => void;
}>;

const tabsInfo = [
  {
    title: "Світло",
    tabIndex: 0,
    isFocused: false,
    icon: (isFocused: boolean) => (
      <FontAwesome
        name="bolt"
        size={24}
        color={isFocused ? "yellow" : "black"}
      />
    ),
  },
  {
    title: "Вода",
    tabIndex: 1,
    isFocused: false,
    icon: (isFocused: boolean) => (
      <Ionicons
        name="water"
        size={24}
        color={isFocused ? "#0a22aaff" : "black"}
      />
    ),
  },
  {
    title: "Газ",
    tabIndex: 2,
    isFocused: false,
    icon: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="gas-burner"
        size={24}
        color={isFocused ? "yellow" : "black"}
      />
    ),
  },
];

function TabMenu({ tabs, changeCurrentTab }: Props) {
  return (
    <View style={styles.menuContainer}>
      {tabsInfo.map((tab, index) => (
        <Tab
          title={tab.title}
          tabIndex={tab.tabIndex}
          isFocused={tabs.states[index]}
          key={tab.tabIndex}
          changeCurrentTab={changeCurrentTab}
        >
          {tab.icon(tabs.states[index])}
        </Tab>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default TabMenu;
