import { Abilities, Option, QuestionProps } from "@/app/types/questionProps";
import abilities from "@/constants/abilities";
import races from "@/constants/races";
import { Button } from "@react-navigation/elements";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

function ScoresQuestion({ quest, answers, updateAnswer }: QuestionProps) {
  const currentValue: Abilities = answers[quest.characterField];
  let pointsLeft = 27 - calculateSpentPoints(currentValue);
  const abilityBonuses = calculateBonuses();
  console.log(currentValue);
  function decrease(ability: keyof Abilities) {
    updateAnswer(quest, quest.characterField, {
      ...currentValue,
      [ability]: currentValue[ability] - 1,
    });
  }
  function increase(ability: keyof Abilities) {
    updateAnswer(quest, quest.characterField, {
      ...currentValue,
      [ability]: currentValue[ability] + 1,
    });
  }
  function calculateSpentPoints(abilities: Abilities) {
    let sum =
      getAbilityCost(abilities.STR) +
      getAbilityCost(abilities.DEX) +
      getAbilityCost(abilities.CON) +
      getAbilityCost(abilities.INT) +
      getAbilityCost(abilities.WIS) +
      getAbilityCost(abilities.CHA);
    return sum;
  }
  function getAbilityCost(value: number) {
    if (value >= 8 && value <= 13) {
      return value - 8;
    } else if (value > 13) {
      return (value - 13) * 2 + 5;
    }
  }
  function canIncrease(value: number): boolean {
    let price = getAbilityCost(value + 1) - getAbilityCost(value);
    if (value >= 15) {
      return false;
    } else if (pointsLeft < price) {
      return false;
    }
    return true;
  }
  function calculateBonuses() {
    const bonuses = {
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
    };
    const raceBonuses: Partial<Abilities> = races.find(
      (i: Option) => i.id == answers.race,
    ).addScores;
    return raceBonuses ? raceBonuses : bonuses;
  }
  return (
    <View style={{ height: 320 }}>
      <ThemedText>Осталось {pointsLeft}</ThemedText>
      <FlatList
        data={abilities}
        renderItem={({ item }) => (
          <View>
            <ThemedText>{item.name}</ThemedText>
            {abilityBonuses[item.id] ? (
              <ThemedText>Рассовый бонус +{abilityBonuses[item.id]}</ThemedText>
            ) : (
              ""
            )}

            <Button
              onPress={() => {
                decrease(item.id);
              }}
              disabled={currentValue[item.id] <= 8}
            >
              -
            </Button>
            <ThemedText>
              {currentValue[item.id] > 0 ? "+ " : ""}
              {currentValue[item.id]}
            </ThemedText>
            <Button
              onPress={() => {
                increase(item.id);
              }}
              disabled={!canIncrease(currentValue[item.id])}
            >
              +
            </Button>
          </View>
        )}
      />
    </View>
  );
}

export default ScoresQuestion;

const styles = StyleSheet.create({});
