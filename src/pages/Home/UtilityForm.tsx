import { labels, utilityTemplates } from "@/src/data/UtilityInfo";
import UtilityInformation from "@/src/ui/UtilityInformation";
import UtilityLabels from "@/src/ui/UtilityLabels";
import { getDateWithTime } from "@/src/utils/formatDate";
import { roundNumber } from "@/src/utils/roundNumber";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useStore from "../../store/useStore";
import ActionButton from "../../ui/ActionButton";
import TextInputField from "../../ui/TextInputField";

type Props = PropsWithChildren<{
  bill: any;
  previousValue: number;
  currentValue: number;
  activeTab: number;
  cancelForm: React.Dispatch<any>;
  saveBill: (bill: any) => Promise<void>;
  isEdit: boolean;
}>;

function UtilityForm({ bill, activeTab, cancelForm, ...rest }: Props) {
  let [previous, setPrevious] = useState(rest.previousValue.toString() ?? "0");
  let [current, setCurrent] = useState(rest.currentValue.toString());
  let [billData, setBillData] = useState(initExpenses());
  const updateLastBills = useStore(({ updateLastBills }) => updateLastBills);
  const saveLastBills = useStore(({ saveLastBills }) => saveLastBills);
  const saveBill = useStore(({ saveBill }) => saveBill);
  let [message, setMessage] = useState({ isVisible: false, text: "" });

  function initExpenses() {
    if (rest.isEdit) {
      let count = bill.info.current - bill.info.previous;
      if (count > 0) {
        let sum = roundNumber(count * bill?.rate);
        return { count, sum };
      }
    }
    return { count: 0, sum: 0 };
  }

  function onChangeCurrent(currentValue: string) {
    let count = +currentValue - +previous;
    onChange(count, currentValue, setCurrent);
  }

  function onChangePrevious(currentValue: string) {
    let previous = bill?.info?.previous;
    if (previous && previous !== "0") return;
    let count = +current - +currentValue;
    onChange(count, currentValue, setPrevious);
  }

  function onChange(count: number, currentValue: string, handler: any) {
    if (count > 0 && currentValue) {
      let sum = roundNumber(count * bill?.rate);
      setBillData({ count, sum });
    } else setBillData({ count: 0, sum: 0 });
    if (count || currentValue.length === 0) handler(currentValue);
  }

  async function saveBillData() {
    if (billData.count > 0) {
      const resultData = {
        info: {
          previous: parseInt(previous),
          current: parseInt(current),
          sum: billData.sum,
          count: billData.count,
          rate: bill.rate,
          date: getDateWithTime(),
        },
      };
      updateLastBills(activeTab, resultData);
      await saveLastBills();
      await rest.saveBill(resultData.info);
      cancelForm(false);
    } else setMessage({ isVisible: true, text: "Сума повинна бути більше 0" });
  }

  return (
    <View style={styles.container}>
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
      <View style={styles.utilityInfo}>
        <UtilityLabels labels={labels} startFrom={2} />
        <UtilityInformation
          bill={{
            ...billData,
            rate: bill?.rate,
          }}
          templates={utilityTemplates}
          startFrom={2}
          activeTab={activeTab}
        />
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
  container: {
    marginTop: 10,
    flex: 1,
  },
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
  hiddenText: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  utilityInfo: {
    width: "90%",
    flexDirection: "row",
    height: 80,
    marginLeft: 5,
  },
});

export default UtilityForm;
