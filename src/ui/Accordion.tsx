import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren, ReactNode, useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = PropsWithChildren<{
  title: string;
  children: ReactNode;
}>;

export default function Accordion({ title, children }: Props) {
  let [isOpen, setIsOpen] = useState(false);

  function showContent() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }

  return (
    <TouchableOpacity
      style={[styles.item, !isOpen && { height: 50 }]}
      onPress={showContent}
      activeOpacity={1}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons
          name={isOpen ? "arrow-drop-down" : "arrow-right"}
          size={38}
          color="#fff"
        />
      </View>
      {isOpen && children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    marginLeft: 15,
    color: "#fff",
    fontSize: 16,
  },
  item: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
  },
});
