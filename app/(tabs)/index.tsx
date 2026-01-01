import TabInfo from "@/src/components/TabInfo";
import TabMenu from "@/src/components/TabMenu";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [tabs, setTabs] = useState({
    currentTabIndex: -1,
    states: [false, false, false],
  });
  const tabStatesRef = useRef([false, false, false]);
  const [isFormVisible, setisFormVisible] = useState(false);
  const height = useHeaderHeight();

  function changeCurrentTab(tabIndex: number) {
    const states = [...tabStatesRef.current];
    states[tabIndex] = true;
    setTabs({
      currentTabIndex: tabIndex,
      states,
    });
    setisFormVisible(false);
  }

  return (
    <View style={styles.container}>
      <TabMenu tabs={tabs} changeCurrentTab={changeCurrentTab} />
      <ScrollView style={styles.content}>
        {tabs.currentTabIndex !== -1 ? (
          <KeyboardAvoidingView
            keyboardVerticalOffset={height + 90}
            behavior="position"
            style={{ flex: 1 }}
          >
            <TabInfo
              tabs={tabs}
              isFormVisible={isFormVisible}
              setIsFormVisible={setisFormVisible}
            />
          </KeyboardAvoidingView>
        ) : (
          <View>
            <Text>Оберіть послугу</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 15,
  },
});
