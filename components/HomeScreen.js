import { Button, FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import Goal from "../components/Goal";
import AddModal from "../components/AddModal";
import { createStackNavigator } from "@react-navigation/stack";
import GoalDetailsScreen from "./GoalDetailsScreen";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Animated:", "Non-serializable values"]); // Ignore useNativeDriver log

export default function HomeScreen({ bgColor, navigation }) {

  const Stack = createStackNavigator();

  const [currentScreen, setCurrentScreen] = useState("");
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState([]);

  // variable to show "new goal" modal or not
  const [newGoalModal, setNewGoalModal] = useState(false);

  const renderGoals = ({ item, index }) => { // renderGoals function for FlatList
    return (
      <Goal // most of these props are for GoalDetailsScreen (couldn't get initial params to work)
        goal={item}
        index={index}
        progress={progress}
        setProgress={setProgress}
        theme={bgColor}
        navigation={navigation}
        setCurrentScreen={setCurrentScreen}
        setGoals={setGoals}
        goals={goals}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: currentScreen === "GoalDetails" ? true : false, // removes Header when not on Goal Details screen
      }}
    >
      <Stack.Screen name="HomeScreen">
        {() => (
          <View style={styles.container}>
            <View style={{ width: "90%" }}>
              <ProgressBar
                progress={progress}
                min={0}
                max={goals.length}
                backgroundColor={bgColor}
              />
            </View>
            <View style={{ flex: 1, width: "90%" }}>
              <FlatList
                keyExtractor={(item) => item.key}
                data={goals}
                renderItem={renderGoals}
              />
              <AddModal // Modal component for adding a new goal
                newGoalModal={newGoalModal}
                setNewGoalModal={setNewGoalModal}
                goals={goals}
                setGoals={setGoals}
                theme={bgColor}
              />
              <Button title="Add Goal" onPress={() => setNewGoalModal(true)} />
            </View>
          </View>
        )}
      </Stack.Screen>

      {/* Goal Details screen - clicking on a Goal will bring you here */}
      <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
  modalContainer: {
    backgroundColor: "grey",
    marginTop: 100,
    width: 200,
    alignSelf: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 200,
  },
});
