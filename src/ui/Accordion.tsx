import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  title: string;
  isExpanded?: boolean;
  children: ReactNode;
}>;

function Accordion({ title, children, isExpanded = false }: Props) {
  let [isOpen, setIsOpen] = useState(isExpanded);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  function showContent() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }

  return (
    <View>
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
      </TouchableOpacity>
      {isOpen && children}
    </View>
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
    fontSize: font.section.fontSize,
  },
  item: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
  },
});

export default Accordion;
