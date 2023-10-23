import { useSpotifyAuth } from "../utils";
import { Text, View } from "react-native";
import SpotifyAuthButton from "../components/SpotifyAuthButton";

export default function LoginScreen(props) {
  const { token, getSpotifyAuth } = useSpotifyAuth();

  if (token) {
    contentDisplayed = <Text>Logged In</Text>;
  } else {
    contentDisplayed = (
      <SpotifyAuthButton authenticationFunction={getSpotifyAuth} />
    );
  }

  return <View>{contentDisplayed}</View>;
}
