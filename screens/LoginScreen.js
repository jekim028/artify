import { useSpotifyAuth } from "../utils";
import { Text, View } from "react-native";
import SpotifyAuthButton from "../components/SpotifyAuthButton";
import { useEffect } from "react";

const LoginScreen = ({ route, navigation }) => {
  const { token, getSpotifyAuth } = useSpotifyAuth();

  //   if (token) {
  //     contentDisplayed = <Text>Logged In</Text>;
  //   } else {
  //     contentDisplayed = (
  //       <SpotifyAuthButton authenticationFunction={getSpotifyAuth} />
  //     );
  //   }

  useEffect(() => {
    if (token) {
      // If token exists, navigate to a different screen
      navigation.navigate("HomeScreen");
    }
  }, [token, navigation]);

  return <SpotifyAuthButton authenticationFunction={getSpotifyAuth} />;
};

export default LoginScreen;
