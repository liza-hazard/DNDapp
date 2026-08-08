import { Question } from "@/app/types/questionProps";
import alignments from "./alignments";
import backgrounds from "./backgrounds";
import classes from "./classes";
import races from "./races";
import spels from "./spels";
import subclasses from "./subclasses";

const quiz: Question[] = [
  {
    id: "race",
    title: "Выберите расу",
    type: "select",
    characterField: "race",
    options: races,
    resultText: "Выбранная раса",
    visible: (answers) => true,
    errorMessage: "Выберите расу",
    validate: (answers) => answers.race !== "",
  },
  {
    id: "class",
    title: "Выберите класс",
    type: "select",
    characterField: "class",
    options: classes,
    resultText: "Выбранный класс",
    dependence: ["subclass", "spels"],
    visible: (answers) => true,
    errorMessage: "Выберите класс",
    validate: (answers) => answers.class !== "",
  },

  {
    id: "subclass",
    title: "Выберите подкласс",
    type: "select",
    characterField: "subclass",
    options: subclasses,
    resultText: "Выбранный подкласс",
    filterElements: (answers) =>
      subclasses.filter((el) => answers.class == el.class),
    visible: (answers) => true,
    errorMessage: "Выберите подкласс",
    validate: (answers) => answers.subclass !== "",
  },
  {
    id: "spels",
    title: "Выберите заклинания",
    type: "multiselect",
    maxSelect: 2,
    characterField: "spels",
    options: spels,
    resultText: "Выбранный подкласс",
    visible: (answers) =>
      answers.class == "wizard" || answers.class == "cleric",
    errorMessage: "Выберите 2 заклинания",
    validate: (answers) => answers.spels.length == 2,
  },

  {
    id: "background",
    title: "Выберите предысторию",
    type: "select",
    characterField: "background",
    options: backgrounds,
    resultText: "Выбранная предыстория",
    visible: (answers) => true,
    errorMessage: "Выберите предысторию",
    validate: (answers) => answers.background !== "",
  },

  {
    id: "alignment",
    title: "Выберите мировоззрение",
    type: "select",
    characterField: "alignment",
    options: alignments,
    resultText: "Выбранное мировоззрение",
    visible: (answers) => true,
    errorMessage: "Выберите мировоззрение",
    validate: (answers) => answers.alignment !== "",
  },
  {
    id: "name",
    title: "Введите имя персонажа",
    type: "input",
    characterField: "name",
    resultText: "Ваше имя:",
    visible: (answers) => true,
    errorMessage: "Введите имя",
    validate: (answers) => answers.name !== "",
  },
];

export default quiz;
