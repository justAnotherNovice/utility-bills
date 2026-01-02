import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useStore from "../store/useStore";
import ActionButton from "./ActionButton";
import TextInputField from "./TextInputField";

type Props = PropsWithChildren<{
  lastBill: any;
  currentTabIndex: number;
  cancelForm: React.Dispatch<any>;
}>;

function UtilityServiceForm({ lastBill, currentTabIndex, cancelForm }: Props) {
  let [previous, setPrevious] = useState(lastBill?.info?.current ?? 1);
  let [current, setCurrent] = useState<number>(0);
  let count = current - previous;
  let [billData, setBillData] = useState({
    sum: lastBill?.rate ? lastBill.rate * count : count,
    count,
  });
  const updateLastBills = useStore(({ updateLastBills }) => updateLastBills);
  const saveLastBills = useStore(({ saveLastBills }) => saveLastBills);
  const saveBill = useStore(({ saveBill }) => saveBill);
  let [message, setMessage] = useState({ isVisible: false, text: "" });

  function onChange(current: string, count: number, setValue: any) {
    if (lastBill?.rate) {
      setBillData({ sum: count * lastBill?.rate, count });
      setValue(+current);
    } else setMessage({ isVisible: true, text: "Потрібно встановити тариф" });
  }

  function onChangeCurrent(currentValue: string) {
    let count = +currentValue - previous;
    onChange(currentValue, count, setCurrent);
  }

  function onChangePrevious(currentValue: string) {
    let count = current - +currentValue;
    onChange(currentValue, count, setPrevious);
  }

  async function saveBillData() {
    if (billData.sum > 0) {
      const resultData = {
        info: {
          previous,
          current,
          ...billData,
          rate: lastBill.rate,
          date: new Date().toLocaleDateString(),
        },
      };
      updateLastBills(currentTabIndex, resultData);
      await saveBill(currentTabIndex, resultData.info);
      await saveLastBills();
      cancelForm(false);
    } else setMessage({ isVisible: true, text: "Сума повинна бути більше 0" });
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
        <Text style={styles.resultText}>Тариф: {lastBill?.rate}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <ActionButton
            header="Зберегти"
            customStyle={styles.controlButton}
            handler={() => saveBillData()}
          />
          <ActionButton
            header="Скасувати"
            customStyle={styles.controlButton}
            handler={() => cancelForm(false)}
          />
        </View>
        {message.isVisible ? (
          <Text style={styles.hiddenText}>{message.text}</Text>
        ) : undefined}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    marginTop: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlButton: {
    width: "49%",
  },
  result: {
    justifyContent: "space-evenly",
    height: 70,
  },
  hiddenText: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  resultText: {},
});

export default UtilityServiceForm;
