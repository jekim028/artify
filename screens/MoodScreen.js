import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

const MoodData = [
  {
    id: "sad",
    title: "Sad",
  },
  {
    id: "happy",
    title: "Happy",
  },
  {
    id: "chill",
    title: "Chill",
  },
  {
    id: "energetic",
    title: "Energetic",
  },
  {
    id: "romantic",
    title: "Romantic",
  },
  {
    id: "moody",
    title: "Moody",
  },
  {
    id: "nostalgic",
    title: "Nostalgic",
  },
  {
    id: "confident",
    title: "Confident",
  },
  {
    id: "evil",
    title: "Villain Mode",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title]}>{item.title}</Text>
  </TouchableOpacity>
);

const MoodScreen = ({ route, navigation }) => {
  const { songs, id } = route.params;
  const [selectedMoodId, setSelectedId] = useState();
  const [selectedMood, setSelectedMood] = useState();

  useEffect(() => {
    console.log(selectedMood);
  }, [selectedMood]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedMoodId ? "#65A765" : "#E6FFE6";
    const borderColor = item.id === selectedMoodId ? "#E6FFE6" : "#65A765";
    const color = item.id === selectedMoodId ? "black" : "white";

    const onSelect = (item) => {
      setSelectedId(item.id);
      setSelectedMood(item.title);
    };

    return (
      <Item
        item={item}
        onPress={() => onSelect(item)}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>What's your playlist's mood?</Text>
      <FlatList
        data={MoodData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedMoodId}
      />
      <Button
        title="Next"
        onPress={() =>
          navigation.navigate("LyricsScreen", {
            songs,
            selectedMoodId,
            selectedMood,
            id,
          })
        }
        style={styles.nextButton}
      />
    </SafeAreaView>
  );
};

export default MoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  question: {
    // fontFamily: "Spotify Circular",
    marginTop: 10,
    marginLeft: 15,
    color: "black",
  },
  item: {
    backgroundColor: "#1DB954",
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    // fontFamily: 'Spotify Circular',
  },
});
