import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { getSpotify } from "../utils/apiOptions";
import { AuthContext } from "../utils";

const screenWidth = Dimensions.get("window").width;

const TrackArtists = ({ TrackArtists }) => {
  return (
    <Text style={styles.trackArtists} numberOfLines={1}>
      {TrackArtists.map(({ name }) => `${name}`).join(", ")}
    </Text>
  );
};

export default PlaylistScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { token } = useContext(AuthContext);
  const [playlistTracks, setPlaylistsTracks] = useState([]);

  let PLAYLIST_TRACK_GETTER = (playlistId) =>
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const formatter = (data) =>
    data.map((val) => {
      const artists = val.track.artists?.map((artist) => ({
        name: artist.name,
      }));
      return {
        trackName: val.track.name,
        trackAlbum: val.track.album.name,
        trackArtists: artists,
        trackDuration: val.track.duration_ms,
        trackImageUrl: val.track.album.images[0]?.url ?? undefined,
        trackId: val.track.id,
      };
    });

  const fetchPlaylistTracks = async () => {
    let res;
    res = await getSpotify(token, PLAYLIST_TRACK_GETTER(id));
    setPlaylistsTracks(formatter(res));
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Make Cover"
        onPress={() =>
          navigation.navigate("MoodScreen", { songs: playlistTracks, id })
        }
      />
      <Text>Playlist Details</Text>
      <FlatList
        data={playlistTracks}
        renderItem={(item) => renderTrack(item)}
        keyExtractor={(item) => item.trackId}
      />
    </View>
  );
};

const renderTrack = ({ item }) => {
  return (
    <View style={styles.trackContainer}>
      <Image style={styles.trackImg} source={{ uri: item.trackImageUrl }} />
      <View style={styles.infoContainer}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.trackName}
        </Text>
        <View style={styles.artistAlbumContainer}>
          <TrackArtists
            style={styles.artists}
            TrackArtists={item.trackArtists}
          />
          <Text style={styles.dot} numberOfLines={1}>
            ·
          </Text>
          <Text style={styles.albumName} numberOfLines={1}>
            {item.trackAlbum}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    padding: 5,
  },
  trackContainer: {
    width: "98%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "1%",
  },
  infoContainer: {
    flex: 7,
    marginHorizontal: 5,
  },
  trackName: {
    color: "black",
  },
  artistAlbumContainer: {
    width: "100%",
    flexDirection: "row",
  },
  trackImg: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  albumName: {
    flex: 1,
  },
  artists: {
    flex: 1,
  },
  dot: {
    marginHorizontal: 5,
  },
});
