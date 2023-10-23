import { Pressable, Text, StyleSheet } from "react-native";

const SpotifyAuthButton = ({ authenticationFunction }) => {
  return (
    <Pressable style={styles.authButton} onPress={authenticationFunction}>
      <Text style={styles.authText}>Connect with Spotify</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 999999,
    margin: 100,
    alignContent: "Center",
    alignItems: "center",
  },
  authText: {
    color: "white",
  },
});

export default SpotifyAuthButton;
