import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import { useState } from "react";
import PreferencesScreen from "./components/PreferencesScreen";

const Drawer = createDrawerNavigator();

export default function App() {

  // state variable for theme
  const [bgColor, setBgColor] = useState("#1ecbe1");

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home">
          {({ navigation }) => (
            <HomeScreen
              bgColor={bgColor}
              setBgColor={setBgColor}
              navigation={navigation}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Preferences">
          {() => (
            <PreferencesScreen bgColor={bgColor} setBgColor={setBgColor} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
