import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CharactersProvider from "../context/CharactersContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CharactersProvider>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Мои персонажи",
              title: "Мои персонажи",
            }}
          />
          <Drawer.Screen
            name="shop"
            options={{
              drawerLabel: "Магазин",
              title: "Магазин",
            }}
          />
          <Drawer.Screen
            name="knowledge"
            options={{
              drawerLabel: "База знаний",
              title: "База знаний",
            }}
          />
          <Drawer.Screen
            name="support"
            options={{
              drawerLabel: "Поддержать",
              title: "Поддержать",
            }}
          />
          <Drawer.Screen
            name="about"
            options={{
              drawerLabel: "О нас",
              title: "О нас",
            }}
          />
          <Drawer.Screen
            name="character"
            options={{
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
        </Drawer>
      </CharactersProvider>
    </GestureHandlerRootView>
  );
}
