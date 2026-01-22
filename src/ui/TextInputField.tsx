import { PropsWithChildren } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import font from "../assets/Styles/font";

type Props = PropsWithChildren<{
  header: string;
  value: string;
  keyboard?: KeyboardTypeOptions;
  inputHandler: React.Dispatch<any>;
}>;

function TextInputField({ value, keyboard = "number-pad", ...rest }: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.header}>{rest.header}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={(value) => rest.inputHandler(value)}
        keyboardType="number-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: font.header.fontSize,
    marginLeft: 5,
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 5,
    borderWidth: 0.7,
    borderRadius: 15,
  },
});

export default TextInputField;
