export interface CharacterAnswers {
  race: string;
  class: string;
  subclass: string;
  background: string;
  alignment: string;
  name: string;
  spels: string[] | string;
}

interface Option {
  id: string;
  name: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  type: "select" | "input" | "multiselect";
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
