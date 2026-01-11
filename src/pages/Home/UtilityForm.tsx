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
  currentTabIndex: number;
  cancelForm: React.Dispatch<any>;
}>;

function UtilityForm({ bill, currentTabIndex, cancelForm }: Props) {
  let [previous, setPrevious] = useState<string>(
    bill?.info?.current.toString() ?? "0"
  );
  let [current, setCurrent] = useState<string>("0");
  let [billData, setBillData] = useState({ count: 0, sum: 0 });
  const updateLastBills = useStore(({ updateLastBills }) => updateLastBills);
  const saveLastBills = useStore(({ saveLastBills }) => saveLastBills);
  const saveBill = useStore(({ saveBill }) => saveBill);
  let [message, setMessage] = useState({ isVisible: false, text: "" });

  function onChangeCurrent(currentValue: string) {
    let count = +currentValue - +previous;
    onChange(count, currentValue, setCurrent);
  }

  function onChangePrevious(currentValue: string) {
    if (bill?.info?.previous) return;
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
          previous,
          current,
          ...billData,
          rate: bill.rate,
          date: getDateWithTime(),
        },
      };
      updateLastBills(currentTabIndex, resultData);
      await saveBill(currentTabIndex, resultData.info);
      await saveLastBills();
      cancelForm(false);
    } else setMessage({ isVisible: true, text: "Сума повинна бути більше 0" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Нові показники</Text>
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
          activeTab={currentTabIndex}
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
    paddingHorizontal: 5,
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
  header: {
    marginTop: 20,
    fontSize: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  test: {
    height: 70,
  },
  utilityInfo: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    marginLeft: 5,
  },
  resultText: {},
});

export default UtilityForm;
