import classes from "@/constants/classes";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function CharacterItem({ char }) {
  const charLink = useRouter();
  return (
    <TouchableOpacity onPress={() => charLink.push(`/character?id=${char.id}`)}>
      <Text style={styles.character_item}>
        {classes.find((i) => i.id == char.class).name} {char.name} -{" "}
        {char.level} уровень
      </Text>
    </TouchableOpacity>
  );
}

export default CharacterItem;

const styles = StyleSheet.create({
  character_item: {
    padding: 20,
    textAlign: "center",
    borderWidth: 1,
    marginTop: 15,
    backgroundColor: "#ccc",
  },
});
