import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

const SelectQuestion = ({ quest, answers, updateAnswer }) => {
  const currentValue = answers[quest.characterField];
  let currentAnswer = quest.options.find((i: object) => i.id == currentValue);
  return (
    <View>
      <FlatList
        data={
          quest.filterElements ? quest.filterElements(answers) : quest.options
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              updateAnswer(quest, quest.characterField, item.id);
            }}
            style={{
              backgroundColor: currentValue == item.id ? "darkgreen" : "#ccc",
            }}
          >
            <ThemedText>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />
      <ThemedText>
        {quest.resultText}: {currentAnswer ? currentAnswer.name : ""}
      </ThemedText>
      <ThemedText>{currentAnswer ? currentAnswer.description : ""}</ThemedText>
    </View>
  );
};

export default SelectQuestion;

const styles = StyleSheet.create({});
