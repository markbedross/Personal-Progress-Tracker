import {useEffect, useState} from "react";
import { Modal, StyleSheet, View, Button, Text, TextInput } from "react-native";

function AddModal({newGoalModal, setNewGoalModal, goals, setGoals, theme}) {

  // state variable for text field
  const [newGoal, setNewGoal] = useState("");

  // function to add a new goal to the goal list
  const addGoal = (input) => {
    // key is for Flatlist to use later - can't use index or goal name itself since both can change with editing and deleting
    setGoals([...goals, {value: input, key: Math.random()}]);
  };

  return (
    <Modal // returns Modal view
      animationType="fade"
      transparent={true}
      visible={newGoalModal}
    >
      <View style={[styles.modalView, {backgroundColor: theme}]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            gap: 5,
          }}
        >
          <Text>Add new goal:</Text>
          <TextInput
            title="text"
            onChangeText={(text) => setNewGoal(text)}
            style={{
              backgroundColor: "white",
              width: "50%",
              borderRadius: 5,
              height: 50,
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Button title="Cancel" onPress={() => setNewGoalModal(false)} />
          <Button
            title="Save"
            onPress={() => {
              if (newGoal) {
                addGoal(newGoal);
                setNewGoalModal(false);
                setNewGoal("")
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default AddModal;

const styles = StyleSheet.create({
  modalView: {
    width: "80%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 200,
  },
});
