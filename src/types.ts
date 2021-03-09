export type Sequence = "3<=" | "4>=";

export type Word = "string";

export type Vocabulary = string[];

export type Dictionary = {
  twoSyllable: Vocabulary;
  threeSyllable: Vocabulary;
  fourSyllable: Vocabulary;
  fiveSyllable: Vocabulary;
  polysyllable: Vocabulary;
};
