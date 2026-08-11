import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import alignments from "@/constants/alignments";
import backgrounds from "@/constants/backgrounds";
import classes from "@/constants/classes";
import races from "@/constants/races";
import { Fonts } from "@/constants/theme";
import { useContext } from "react";
import { CharactersContext } from "../../context/CharactersContext";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const { characters } = useContext(CharactersContext);

  const currentCharacter = characters.find((c: { id: string }) => c.id == id);
  function findNameOfOption(arr, id) {
    console.log();
    return arr.find((i) => i.id == id).name;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        Основные данные персонажа
      </ThemedText>
      <Text>Имя: {currentCharacter.name}</Text>
      <Text>Раса: {findNameOfOption(races, currentCharacter.race)}</Text>
      <Text>Уровень: {currentCharacter.level}</Text>
      <Text>Класс: {findNameOfOption(classes, currentCharacter.class)}</Text>
      <Text>
        Предыстория:{" "}
        {findNameOfOption(backgrounds, currentCharacter.background)}
      </Text>
      <Text>
        Мировозрение: {findNameOfOption(alignments, currentCharacter.alignment)}
      </Text>
      <Text>Заклинания: {currentCharacter.spels.join(",")}</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
