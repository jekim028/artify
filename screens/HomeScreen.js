import { AuthContext } from "../utils";
import { getMyPlaylists, getSpotify } from "../utils/apiOptions";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const NUM_COLS = 2;
const TILE_SIZE = (screenWidth - screenWidth * 0.1) / NUM_COLS;
const USER_PLAYLISTS_GETTER = "https://api.spotify.com/v1/me/playlists";

const renderPlaylist = ({ item, index }, navigation) => {
  return (
    <View style={styles.playlistContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate("PlaylistScreen", {
            id: item.playlistId,
          })
        }
      >
        <Image
          style={styles.playlistCover}
          source={{ url: item.playlistImageUrl }}
        />
        <Text style={styles.playlistName}>{item.playlistName}</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen = ({ route, navigation }) => {
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);

  const formatter = (data) =>
    data.map((val) => {
      return {
        playlistId: val.id,
        playlistDescription: val.description,
        playlistName: val.name,
        playlistTracks: val.tracks,
        playlistImageUrl: val?.images[0]?.url ?? undefined,
      };
    });

  const fetchPlaylists = async () => {
    let res;
    res = await getSpotify(token, USER_PLAYLISTS_GETTER);
    setPlaylists(formatter(res));
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={(item) => renderPlaylist(item, navigation)}
        numColumns={NUM_COLS}
        keyExtractor={(item) => item.playlistId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  playlistContainer: {
    width: TILE_SIZE,
    height: TILE_SIZE * 1.15,
    margin: "1.5%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  playlistCover: {
    marginBottom: 4,
    resizeMode: "contain",
    width: TILE_SIZE * 0.9,
    height: TILE_SIZE * 0.9,
    marginTop: 5,
    borderRadius: 25,
    alignSelf: "center",
  },
  playlistName: {
    padding: "3%",
    textAlign: "center",
  },
});
