import { Alert } from "react-native";

function showConfirmationDialog(description: string, action: any) {
  return Alert.alert("Підтвердіть операцію", description, [
    {
      text: "Підтвердити",
      onPress: async () => await action(),
    },
    {
      text: "Скасувати",
    },
  ]);
}

export default showConfirmationDialog;
