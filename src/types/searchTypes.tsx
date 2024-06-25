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
  class?: string;
  cardType?: string;
  cardSet?: string;
}

export interface CardsQueryData {
  cards: any;
  isLoading: boolean;
  error?: Error;
}
