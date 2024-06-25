export type CardMetaData = Record<number, string>;

export interface CardWithNames {
  manaCost: number;
  className: string;
  cardSet: string;
  cardType: string;
}

export interface CardsComparison {
  classCorrect: boolean;
  typeCorrect: boolean;
  manaCostCorrect: "higher" | "lower" | true;
  setCorrect: boolean;
}

export interface CardsComparisonAndNames
  extends CardWithNames,
    CardsComparison {}
