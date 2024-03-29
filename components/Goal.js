import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckBox from "expo-checkbox";

function Goal(props) {

  const { goal, setProgress, theme, navigation } = props;

  // state variable for checkbox selection
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={(v) => {
          setSelection(!isSelected);
          setProgress((prev) => (v ? prev + 1 : prev - 1)); // 
        }}
        color={theme}
      />
      <Pressable
        onPress={() =>
          navigation.navigate("GoalDetails", { // go to goal deatils screen when click on Text
            props,
            setSelection,
            isSelected,
          })
        }
        style={{ width: '100%', paddingVertical: 8}}
      >
        <Text style={{ fontSize: 16 }}>{goal.value}</Text>
      </Pressable>
    </View>
  );
}

export default Goal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    height: 50,
    alignItems: "center",
  },
});
