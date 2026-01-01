import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputField from "./TextInputField";

type Props = PropsWithChildren<{
  cancelForm: React.Dispatch<any>;
}>;

function UtilityServiceForm({ cancelForm }: Props) {
  let [previous, setPrevious] = useState(1);
  let [current, setCurrent] = useState<number>(1);
  let [billData, setBillData] = useState({ sum: 0, count: 0 });
  let [hiddenText, setHiddenText] = useState(false);

  function onChangeCurrent(currentValue: string) {
    let count = +currentValue - previous;
    setBillData({ sum: count * 7.99, count });
    setCurrent(+currentValue);
  }

  function onChangePrevious(currentValue: string) {
    let count = current - +currentValue;
    setBillData({ sum: count * 7.99, count });
    setPrevious(+currentValue);
  }

  function saveBillData() {
    if (billData.sum > 0) {
      console.log("success");
    } else setHiddenText(true);
  }
  return (
    <View>
      <TextInputField
        header="Попереднє"
        value={previous}
        inputHandler={onChangePrevious}
      />
      <TextInputField
        header="Поточне"
        value={current}
        inputHandler={onChangeCurrent}
      />
      <View style={styles.result}>
        <Text style={styles.resultText}>Використано: {billData.count}</Text>
        <Text style={styles.resultText}>Сумма: {billData.sum}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={saveBillData}>
            <Text style={styles.controlText}>Зберегти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => cancelForm(false)}
          >
            <Text style={styles.controlText}>Скасувати</Text>
          </TouchableOpacity>
        </View>
        {hiddenText ? (
          <Text style={styles.hiddenText}>Сума повинна бути більше 0</Text>
        ) : undefined}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  controlsContainer: {},
  controlButton: {
    paddingVertical: 15,
    width: "49%",
    backgroundColor: "grey",
    borderRadius: 15,
  },
  controlText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },
  result: {
    justifyContent: "space-evenly",
    height: 60,
  },
  hiddenText: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  resultText: {},
});

export default UtilityServiceForm;
