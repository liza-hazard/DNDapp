import { ThemedText } from "@/components/themed-text";
import classes from "@/constants/classes";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function QuizScreen() {
  const [selectedClass, setSelectedClass] = useState(null);
  const allClasses = classes;
  return (
    <View>
      <ThemedText type="title">Quiz</ThemedText>
      <FlatList
        data={allClasses}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedClass(item.id);
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <ThemedText>Выбранный класс: {selectedClass}</ThemedText>
    </View>
  );
}
