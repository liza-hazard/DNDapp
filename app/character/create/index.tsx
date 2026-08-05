import { ThemedText } from "@/components/themed-text";
import quiz from "@/constants/quiz";
import { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CharacterAnswers {
  race: string;
  class: string;
  subclass: string;
  background: string;
  alignment: string;
  name: string;
  spels: string;
}

export default function QuizScreen() {
  const [answers, setAnswers] = useState<CharacterAnswers>({
    race: "",
    class: "",
    subclass: "",
    background: "",
    alignment: "",
    name: "",
    spels: "",
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quiz[currentQuestionIndex];
  const currentValue = answers[currentQuestion.characterField];
  console.log(answers);
  function nextQuest() {
    let vis = false;
    let next = currentQuestionIndex;
    console.log(next);
    while (vis) {}
    setCurrentQuestionIndex((prev) => prev + 1);
  }
  function prevQuest() {
    setCurrentQuestionIndex((prev) => prev - 1);
  }
  function createChar() {
    console.log(answers);
  }
  function updateAnswer(quest, field, value) {
    if (quest.dependence) {
      const newAnswers = { ...answers };
      newAnswers[field] = value;
      quest.dependence.forEach((i) => {
        newAnswers[i] = "";
      });
      console.log(newAnswers);
      setAnswers(newAnswers);
    } else {
      setAnswers({
        ...answers,
        [field]: value,
      });
    }
  }
  let currentAnswer =
    currentQuestion.type == "select"
      ? currentQuestion.options.find((i) => i.id == currentValue)
      : null;
  return (
    <View>
      <ThemedText type="title">Quiz</ThemedText>
      <ThemedText>{currentQuestion.title}</ThemedText>
      {currentQuestion.type == "select" ? (
        <View>
          <FlatList
            data={
              currentQuestion.filterElements
                ? currentQuestion.filterElements(answers)
                : currentQuestion.options
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  updateAnswer(
                    currentQuestion,
                    currentQuestion.characterField,
                    item.id,
                  );
                }}
                style={{
                  backgroundColor:
                    currentValue == item.id ? "darkgreen" : "#ccc",
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <ThemedText>
            {currentQuestion.resultText}:{" "}
            {currentAnswer ? currentAnswer.name : ""}
          </ThemedText>
          <ThemedText>
            {currentAnswer ? currentAnswer.description : ""}
          </ThemedText>
        </View>
      ) : (
        <TextInput
          onChangeText={(text) => {
            updateAnswer(currentQuestion, currentQuestion.characterField, text);
          }}
          value={currentValue}
        />
      )}

      <Button
        onPress={prevQuest}
        disabled={currentQuestionIndex == 0}
        title="Назад"
      ></Button>

      <Button onPress={nextQuest} title="Далее"></Button>
    </View>
  );
}
