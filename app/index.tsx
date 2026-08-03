import CharacterItem from "@/components/CharacterItem";
import { router } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CharactersContext } from "../context/CharactersContext";

const IndexScreen = () => {
  const { characters, setCharacters } = useContext(CharactersContext);
  const createCharacter = () => {
    // const newCharacter = {
    //   id: Date.now(), // простой уникальный id
    //   name: "Безымянный персонаж",
    //   level: 1,
    //   class: "",
    // };
    // setCharacters([newCharacter, ...characters]);
    router.push("/character/create");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Список персонажей</Text>
      <TouchableOpacity onPress={createCharacter} style={styles.button}>
        <Text style={styles.buttonText}>+ Создать персонажа</Text>
      </TouchableOpacity>
      <FlatList
        data={characters}
        renderItem={({ item }) => <CharacterItem char={item} />}
      />
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 30,
  },
  button: {
    padding: 16,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
