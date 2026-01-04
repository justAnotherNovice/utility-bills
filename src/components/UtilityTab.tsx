import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = PropsWithChildren<{
  title: string;
  icon: ReactNode;
  tabIndex: number;
  activeTab: number;
  changeCurrentTab: (tabIndex: number) => void;
}>;

function Tab({ title, tabIndex, activeTab, ...rest }: Props) {
  const isFocused = activeTab === tabIndex;
  return (
    <TouchableOpacity
      style={[styles.tab, isFocused ? styles.focusedTab : ""]}
      onPress={() => rest.changeCurrentTab(tabIndex)}
    >
      <View style={styles.tabInner}>
        {rest.icon}
        <Text style={[styles.text, isFocused ? styles.focusedText : ""]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: "34%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRightWidth: 1.5,
    borderRightColor: "grey",
    borderLeftWidth: 1.5,
    borderLeftColor: "grey",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  focusedTab: {
    backgroundColor: "grey",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  tabInner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 5,
  },
  focusedText: {
    color: "#fff",
  },
});

export default Tab;
