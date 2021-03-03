import chunk from "lodash.chunk";
import random from "lodash.random";
import shuffle from "lodash.shuffle";

const NUM_OF_COLUMNS = 3;
const NUM_OF_ELEMENTS = 48;
const NUM_OF_ROWS = NUM_OF_ELEMENTS / NUM_OF_COLUMNS;

type Sequence = "3<=" | "4>=";
type Word = "string";
type Words = Word[];
type Dictionary = {
  twoSyllable: Words;
  threeSyllable: Words;
  fourSyllable: Words;
  fiveSyllable: Words;
  polysyllable: Words;
};

export function generateRandomWords(dictionary: Dictionary) {
  const treeOrLessSyllables = [].concat(
    dictionary.twoSyllable,
    dictionary.threeSyllable
  );
  const fourOrMoreSyllables = [].concat(
    dictionary.fourSyllable,
    dictionary.fiveSyllable,
    dictionary.polysyllable
  );

  const result = [];
  let counter = 0;
  let currentSequence: Sequence = "4>=";

  do {
    for (let i = 0; i < NUM_OF_COLUMNS; i++) {
      const wordsToUse =
        currentSequence === "4>=" ? fourOrMoreSyllables : treeOrLessSyllables;

      const randomWord = getRandomWord(wordsToUse, result);

      result.push(randomWord);

      currentSequence = currentSequence === "4>=" ? "3<=" : "4>=";
    }
    counter++;
  } while (counter < NUM_OF_ROWS);

  return chunk(result, NUM_OF_COLUMNS);
}

function getRandomWord(list: Words, result: Words) {
  const randomIndex = random(list.length - 1);
  let word = shuffle(list)[randomIndex];

  if (result.includes(word)) {
    word = getRandomWord(list, result);
  }

  return word;
}
