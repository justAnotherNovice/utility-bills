import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const utilityIcons = [
  {
    title: "Світло",
    tabIndex: 0,
    getIcon: (isFocused: boolean) => (
      <FontAwesome
        name="bolt"
        size={24}
        color={isFocused ? "yellow" : "black"}
      />
    ),
  },
  {
    title: "Вода",
    tabIndex: 1,
    getIcon: (isFocused: boolean) => (
      <Ionicons
        name="water"
        size={24}
        color={isFocused ? "#0a22aaff" : "black"}
      />
    ),
  },
  {
    title: "Газ",
    tabIndex: 2,
    getIcon: (isFocused: boolean) => (
      <MaterialCommunityIcons
        name="gas-burner"
        size={24}
        color={isFocused ? "yellow" : "black"}
      />
    ),
  },
];

const utilityUnits = ["кВт-год", "куб. м.", "куб. м."];

const labels = ["Попереднє", "Поточне", "Використано", "Тариф", "Сума"];

const utilityTemplates: any = {
  previous: format,
  current: format,
  count: format,
  rate: (value: number, tabIndex: number) =>
    `${value} грн. (1 ${utilityUnits[tabIndex]})`,
  sum: (value: number, tabIndex: number) => `${value} грн.`,
};

function format(value: number, tabIndex: number) {
  return `${value} ${utilityUnits[tabIndex]}`;
}

export { labels, utilityIcons, utilityTemplates };
