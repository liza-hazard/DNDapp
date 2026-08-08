import { QuestionProps } from "@/app/types/questionProps";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputQuestion = ({ quest, answers, updateAnswer }: QuestionProps) => {
  const currentValue = answers[quest.characterField];
  return (
    <TextInput
      onChangeText={(text) => {
        updateAnswer(quest, quest.characterField, text);
      }}
      value={currentValue}
    />
  );
};

export default InputQuestion;

const styles = StyleSheet.create({});
