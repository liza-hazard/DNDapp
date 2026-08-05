import alignments from "./alignments";
import backgrounds from "./backgrounds";
import classes from "./classes";
import races from "./races";
import spels from "./spels";
import subclasses from "./subclasses";

const quiz = [
  {
    id: "race",
    title: "Выберите расу",
    type: "select",
    characterField: "race",
    options: races,
    resultText: "Выбранная раса",
    visible: (answers) => true,
  },
  {
    id: "class",
    title: "Выберите класс",
    type: "select",
    characterField: "class",
    options: classes,
    resultText: "Выбранный класс",
    dependence: ["subclass"],
    visible: (answers) => true,
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
  },
  {
    id: "spels",
    title: "Выберите заклинания",
    type: "select",
    maxSelect: 2,
    characterField: "spels",
    options: spels,
    resultText: "Выбранный подкласс",
    visible: (answers) =>
      answers.class == "wizard" || answers.class == "cleric",
  },

  {
    id: "background",
    title: "Выберите предысторию",
    type: "select",
    characterField: "background",
    options: backgrounds,
    resultText: "Выбранная предыстория",
    visible: (answers) => true,
  },

  {
    id: "alignment",
    title: "Выберите мировоззрение",
    type: "select",
    characterField: "alignment",
    options: alignments,
    resultText: "Выбранное мировоззрение",
    visible: (answers) => true,
  },
  {
    id: "name",
    title: "Введите имя персонажа",
    type: "input",
    characterField: "name",
    visible: (answers) => true,
  },
];

export default quiz;
