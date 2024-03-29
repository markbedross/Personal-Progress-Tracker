import { useState } from "react";
import { Modal, StyleSheet, View, Button, Text, TextInput } from "react-native";

function EditModal({
  editModal,
  setEditModal,
  goals,
  setGoals,
  index,
  navigation,
  theme
}) {
    // save current goal in constant
  const current = goals[index].value;
  const [newName, setNewName] = useState();

  // function to change the goal name
  const changeGoal = (input) => {
    // copies goals array into new variable
    const tempGoals = [...goals];
    // changes index value, keeps key the same as prev
    tempGoals[index] = {value: input, key: tempGoals[index].key};
    // sets goals array to the one with the changed index
    setGoals([...tempGoals]);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={editModal}
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
          <Text>New goal name:</Text>
          <TextInput
            defaultValue={current}
            title="text"
            onChangeText={(text) => setNewName(text)}
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
          <Button title="Cancel" onPress={() => setEditModal(false)} />
          <Button
            title="Save"
            onPress={() => {
              if (newName) {
                changeGoal(newName);
                setEditModal(false);
                // sets text input state back to empty
                setNewName("");
                navigation.goBack();
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default EditModal;

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
