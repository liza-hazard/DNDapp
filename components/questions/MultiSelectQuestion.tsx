import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

const MultiSelectQuestion = ({ quest, answers, updateAnswer }) => {
  const [maxSelected, setMaxSelected] = useState(quest.maxSelect);
  const currentValue = answers[quest.characterField];
  function updateArr(id) {
    let multiArr = [...currentValue];
    if (multiArr.includes(id)) {
      multiArr = multiArr.filter((i) => i != id);
      setMaxSelected((prev) => prev + 1);
    } else {
      if (multiArr.length < quest.maxSelect) {
        multiArr.push(id);
        setMaxSelected((prev) => prev - 1);
      } else {
        console.log("no");
      }
    }
    updateAnswer(quest, quest.characterField, multiArr);
  }
  return (
    <View>
      <ThemedText>Можно выбрать: {maxSelected}</ThemedText>
      <FlatList
        data={
          quest.filterElements ? quest.filterElements(answers) : quest.options
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              updateArr(item.id);
            }}
            style={{
              backgroundColor: currentValue.includes(item.id)
                ? "darkgreen"
                : "#ccc",
            }}
          >
            <ThemedText>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectQuestion;

const styles = StyleSheet.create({});
