import { View, Text } from "react-native";
import { AuthContext } from "./utils";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [token, setToken] = useState(null);
  const Stack = createStackNavigator();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
