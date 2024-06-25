import React from "react";
import { SearchCard } from "./searchCard";
import { CardCommonAttributes } from "../../../types/searchTypes";

interface FilteredCardsProps {
  filteredCards: CardCommonAttributes[];
}

const SearchList: React.FC<FilteredCardsProps> = ({ filteredCards }) => {
  if (filteredCards.length === 0) {
    return <div>Opps! No cards match your search.</div>;
  }
  const cards = filteredCards.map((card) => (
    <SearchCard key={card.id} cardData={card} />
  ));

  return <div>{cards}</div>;
};

export default SearchList;
