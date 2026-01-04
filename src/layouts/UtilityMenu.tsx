import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Tab from "../components/UtilityTab";
import { utilityIcons } from "../data/UtilityInfo";

type Props = PropsWithChildren<{
  activeTab: number;
  changeCurrentTab: (tabIndex: number) => void;
}>;

function TabMenu({ activeTab, changeCurrentTab }: Props) {
  return (
    <View style={styles.menuContainer}>
      {utilityIcons.map((tab) => (
        <Tab
          title={tab.title}
          tabIndex={tab.tabIndex}
          activeTab={activeTab}
          icon={tab.getIcon(tab.tabIndex === activeTab)}
          key={tab.tabIndex}
          changeCurrentTab={changeCurrentTab}
        />
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
