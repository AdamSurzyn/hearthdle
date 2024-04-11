export interface CardCommonAttributes {
  artistName: string;
  cardSetId: number;
  cardTypeId: number;
  classId: number;
  collectible: number;
  cropImage: string;
  flavorText: string;
  id: number;
  manaCost: number;
  name: string;
  rarityId: number;
  slug: string;
  text: string;
}

export interface CardsQueryData {
  cards: CardCommonAttributes[];
  isLoading: boolean;
  error?: Error;
}
