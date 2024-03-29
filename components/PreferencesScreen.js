import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function PreferencesScreen({ bgColor, setBgColor }) {
  // Color component for each color option
  const Color = (props) => (
    <Pressable
      style={[
        styles.option,
        {
          backgroundColor: props.color,
          borderColor: "black",
          borderWidth: bgColor === props.color ? 1 : 0, // if current theme is this option, put border on
        },
      ]}
      onPress={() => setBgColor(props.color)}
    >
      <Text style={{ fontSize: 18 }}>{props.text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Set theme color</Text>
      {/* List all colors */}
      <Color color={"#1ecbe1"} text={"Default"} />
      <Color color={"pink"} text={"Pink"} />
      <Color color={"lightgreen"} text={"Green"} />
      <Color color={"lightgrey"} text={"Grey"} />
      <Color color={"yellow"} text={"Yellow"} />
      <Color color={"violet"} text={"Purple"} />
    </View>
  );
}

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  option: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 30,
    borderRadius: 10,
    marginTop: 10,
  },
});
