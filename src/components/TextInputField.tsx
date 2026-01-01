import { PropsWithChildren } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = PropsWithChildren<{
  header: string;
  value: number;
  inputHandler: React.Dispatch<any>;
}>;

function TextInputField({ header, value, inputHandler }: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.header}>{header}</Text>
      <TextInput
        style={styles.textInput}
        value={value.toString()}
        onChangeText={(value) => inputHandler(value)}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: 15,
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    borderWidth: 0.7,
    borderRadius: 15,
  },
});

export default TextInputField;
