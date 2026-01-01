import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = PropsWithChildren<{
  title: string;
  tabIndex: number;
  isFocused: boolean;
  changeCurrentTab: (tabIndex: number) => void;
  children: ReactNode;
}>;

function Tab({ title, tabIndex, isFocused, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.tab, isFocused ? styles.focusedTab : ""]}
      onPress={() => rest.changeCurrentTab(tabIndex)}
    >
      <View style={styles.tabInner}>
        {rest.children}
        <Text style={styles.tabText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: "33%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  focusedTab: {
    backgroundColor: "grey",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tabInner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 15,
    textAlign: "center",
    marginLeft: 5,
  },
});

export default Tab;
