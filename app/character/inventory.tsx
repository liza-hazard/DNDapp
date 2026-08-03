import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Инвентарь
        </ThemedText>
      </ThemedView>
      <Collapsible title="Деньги">
        <ThemedText>10 золотых</ThemedText>
      </Collapsible>
      <Collapsible title="Оружие">
        <ThemedText>Кинжал</ThemedText>
      </Collapsible>
      <Collapsible title="Еда">
        <ThemedText>Вяленое мясо</ThemedText>
      </Collapsible>
      <Collapsible title="Бытовое">
        <ThemedText>Спальный мешок</ThemedText>
      </Collapsible>
      <Collapsible title="Квестовые предметы">
        <ThemedText>Кольцо</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
