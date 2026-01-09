import ActionButton from "@/src/ui/ActionButton";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import HistoryControlsIcon from "./HistoryControlsIcon";

type Props = PropsWithChildren<{
  displayText: boolean;
  changeDataView: () => void;
  showModal: () => void;
}>;

function HistoryControls({ displayText, showModal, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <ActionButton
        header="Оберіть рік"
        customStyle={styles.button}
        handler={showModal}
      ></ActionButton>
      <HistoryControlsIcon
        icon={"document-text"}
        size={22}
        isActive={displayText}
        onPress={rest.changeDataView}
      />
      <HistoryControlsIcon
        icon={"stats-chart"}
        size={22}
        isActive={!displayText}
        onPress={rest.changeDataView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "70%",
  },
  test: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 15,
  },
  focused: {
    backgroundColor: "grey",
  },
});

export default HistoryControls;
