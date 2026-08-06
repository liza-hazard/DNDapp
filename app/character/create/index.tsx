import InputQuestion from "@/components/questions/InputQuestion";
import MultiSelectQuestion from "@/components/questions/MultiSelectQuestion";
import SelectQuestion from "@/components/questions/SelectQuestion";
import { ThemedText } from "@/components/themed-text";
import quiz from "@/constants/quiz";
import { useState } from "react";
import { Button, View } from "react-native";

interface CharacterAnswers {
  race: string;
  class: string;
  subclass: string;
  background: string;
  alignment: string;
  name: string;
  spels: string[];
}

export default function QuizScreen() {
  const [answers, setAnswers] = useState<CharacterAnswers>({
    race: "",
    class: "",
    subclass: "",
    background: "",
    alignment: "",
    name: "",
    spels: [],
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quiz[currentQuestionIndex];
  const currentValue = answers[currentQuestion.characterField];
  console.log(answers);
  function nextQuest() {
    let next: number = findNextVisibleQuestion();
    if (next >= quiz.length) {
      createChar();
      return;
    }
    setCurrentQuestionIndex(next);
  }
  function findNextVisibleQuestion() {
    let next: number = currentQuestionIndex + 1;
    while (next <= quiz.length - 1) {
      if (quiz[next].visible(answers)) {
        break;
      }
      next++;
    }
    return next;
  }
  function findPreviousVisibleQuestion() {
    let prev: number = currentQuestionIndex - 1;
    while (prev >= 0) {
      if (quiz[prev].visible(answers)) {
        break;
      }
      prev--;
    }
    return prev;
  }
  function prevQuest() {
    let prev: number = findPreviousVisibleQuestion();
    setCurrentQuestionIndex(prev);
  }
  function createChar() {
    console.log(answers);
  }
  function updateAnswer(quest, field: string, value) {
    if (quest.dependence) {
      const newAnswers = { ...answers };
      newAnswers[field] = value;
      quest.dependence.forEach((i: string) => {
        newAnswers[i] = "";
      });
      setAnswers(newAnswers);
    } else {
      setAnswers({
        ...answers,
        [field]: value,
      });
    }
  }
  function renderQuestion() {
    switch (currentQuestion.type) {
      case "select":
        return (
          <SelectQuestion
            quest={currentQuestion}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        );
      case "input":
        return (
          <InputQuestion
            quest={currentQuestion}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        );
      case "multiselect":
        return (
          <MultiSelectQuestion
            quest={currentQuestion}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        );
      default:
        return <ThemedText>Неизвестный типо вопроса</ThemedText>;
    }
  }
  return (
    <View>
      <ThemedText type="title">Quiz</ThemedText>
      <ThemedText>{currentQuestion.title}</ThemedText>
      {renderQuestion()}
      <Button
        onPress={prevQuest}
        disabled={currentQuestionIndex == 0}
        title="Назад"
      ></Button>

      <Button onPress={nextQuest} title="Далее"></Button>
    </View>
  );
}
