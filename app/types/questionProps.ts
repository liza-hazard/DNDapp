export interface CharacterAnswers {
  race: string;
  class: string;
  subclass: string;
  background: string;
  alignment: string;
  name: string;
  spels: string[] | string;
  abilityScores: Abilities;
}

export interface Abilities {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface Option {
  id: string;
  name: string;
  description?: string;
  addScores?: Partial<Abilities>;
}

export interface Question {
  id: string;
  title: string;
  type: "select" | "input" | "multiselect" | "scores";
  characterField: string;
  options?: Option[];
  resultText?: string;
  maxSelect?: number;
  dependence?: (keyof CharacterAnswers)[];
  errorMessage: string;
  filterElements?: (answers: CharacterAnswers) => Option[];
  visible: (answers: CharacterAnswers) => boolean;
  validate: (answers: CharacterAnswers) => boolean;
}

export interface UpdateAnswer {
  (
    quest: Question,
    field: keyof CharacterAnswers,
    value: string | string[],
  ): void;
}
export interface QuestionProps {
  quest: Question;
  answers: CharacterAnswers;
  updateAnswer: UpdateAnswer;
}
