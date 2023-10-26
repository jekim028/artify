import { View, Text } from "react-native";
import { AuthContext } from "./utils";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import MoodScreen from "./screens/MoodScreen";

export default function App() {
  const [token, setToken] = useState(null);
  const Stack = createStackNavigator();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
          <Stack.Screen name="MoodScreen" component={MoodScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
