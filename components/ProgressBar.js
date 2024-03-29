import { useRef, useState, useEffect } from "react";
import { StyleSheet, Animated, View, Alert, Text} from "react-native";

function getProgress(props) {
  if (props.max === 0) return 0 // if goals.length is 0, always return 0
  return ((props.progress - props.min) / (props.max - props.min)) * 100;
}

export default function ProgressBar(props) {
  const animatedProgressValue = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);

  animatedProgressValue.addListener((callback) => {
    setProgressValue(callback.value);
  });

  useEffect(() => {
    var progress = getProgress(props);
    if (progress >= 100) {
      Alert.alert("Congratulations, you've completed all your goals!")
    }
    Animated.timing(animatedProgressValue, {
      toValue: progress,
      duration: 500,
    }).start();
  }, [animatedProgressValue, props.progress, props.max]); // props.max dependency makes bar update when new goal is added

  return (
    <View style={styles.container}>
      <View style={[styles.bar,{width: progressValue + "%", backgroundColor: props.backgroundColor}]}>
      </View>
      <Text style={{alignSelf: 'center', fontSize: 20}}>{progressValue.toFixed(0)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    padding: 0,
    overflow: "hidden",
    borderRadius: 5,
    width: "100%",
    borderColor: 'black',
    justifyContent: 'center'
  },
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 0,
    borderRadius: 4,
  },
});
