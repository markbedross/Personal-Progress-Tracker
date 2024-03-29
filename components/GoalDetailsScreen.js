import CheckBox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import EditModal from "./EditModal";

function GoalDetailsScreen({ navigation, route }) {
  const {
    setCurrentScreen,
    goal,
    index,
    goals,
    setGoals,
    setProgress,
    progress,
    theme,
  } = route.params.props;
  const { isSelected, setSelection } = route.params;

  // for some reason have to make copy of isSelected state for this component
  const [isSet, set] = useState(isSelected);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    setCurrentScreen("GoalDetails");
    return () => setCurrentScreen("");
  }, [isSelected, goals]);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxGoal}>
        <CheckBox
          value={isSet}
          onValueChange={(v) => {
            // set both this component's state and Goal's
            set(!isSet); 
            setSelection(!isSet);
            // if set to true, add to progress, otherwise subtract from progress
            setProgress((prev) => (v ? prev + 1 : prev - 1)); 
          }}
          color={theme}
          style={{ padding: 18 }}
        />
        <Text style={{ fontSize: 26 }}>{goal.value}</Text>
        <EditModal // Modal component for editing goal
          editModal={editModal}
          setEditModal={setEditModal}
          goals={goals}
          setGoals={setGoals}
          index={index}
          navigation={navigation}
          setSelection={setSelection}
          isSelected={isSelected}
          theme={theme}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Edit goal" onPress={() => setEditModal(true)} />
        <Button
          title="Delete Goal"
          onPress={() => {
            setGoals((prev) => prev.filter((item) => item !== goal));
            navigation.goBack();
            if (isSet && progress > 0 && progress < 100)
              setProgress((prev) => prev - 1);
          }}
        />
      </View>
    </View>
  );
}

export default GoalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxGoal: {
    flexDirection: "row",
    marginVertical: 30,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    gap: 30
  }
});
