import { CharacterAnswers, UpdateAnswer } from "@/app/types/questionProps";
import InputQuestion from "@/components/questions/InputQuestion";
import MultiSelectQuestion from "@/components/questions/MultiSelectQuestion";
import SelectQuestion from "@/components/questions/SelectQuestion";
import { ThemedText } from "@/components/themed-text";
import quiz from "@/constants/quiz";
import { CharactersContext } from "@/context/CharactersContext";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { JSX, useCallback, useContext, useState } from "react";
import { Button, View } from "react-native";

export default function QuizScreen() {
  const [answers, setAnswers] = useState<CharacterAnswers>(getEmptyAnswers());
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useFocusEffect(
    useCallback(() => {
      resetQuiz();
    }, []),
  );

  const currentQuestion = quiz[currentQuestionIndex];
  const { characters, setCharacters } = useContext(CharactersContext);
  console.log(answers);
  function getEmptyAnswers(): CharacterAnswers {
    return {
      race: "",
      class: "",
      subclass: "",
      background: "",
      alignment: "",
      name: "",
      spels: [],
    };
  }
  function resetQuiz() {
    setAnswers(getEmptyAnswers());
    setError("");
    setCurrentQuestionIndex(0);
  }
  function nextQuest() {
    if (!currentQuestion.validate(answers)) {
      setError(currentQuestion.errorMessage);
      return;
    }
    setError("");
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
    const newCharacter = {
      id: crypto.randomUUID(),
      level: 1,
      ...answers,
    };
    setCharacters([...characters, newCharacter]);
    router.push("/");
  }
  const updateAnswer: UpdateAnswer = (quest, field, value) => {
    let newAnswers: CharacterAnswers = { ...answers };
    if (quest.dependence) {
      newAnswers[field] = value;
      quest.dependence.forEach((i: keyof CharacterAnswers) => {
        newAnswers[i] = "";
      });
    } else {
      newAnswers = {
        ...answers,
        [field]: value,
      };
    }
    setAnswers(newAnswers);
    if (currentQuestion.validate(newAnswers)) {
      setError("");
    }
  };
  function renderQuestion(): JSX.Element {
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
      {error && (
        <ThemedText
          style={{
            color: "red",
          }}
        >
          {error}
        </ThemedText>
      )}
      <Button
        onPress={prevQuest}
        disabled={currentQuestionIndex == 0}
        title="Назад"
      ></Button>

      <Button
        onPress={nextQuest}
        title={
          findNextVisibleQuestion() >= quiz.length
            ? "Создать персонажа"
            : "Далее"
        }
      ></Button>
    </View>
  );
}
