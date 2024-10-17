import React, { useState, useRef, useEffect } from "react";
import { SearchCard } from "./searchCard";
import { CardCommonAttributes } from "../../../types/searchTypes";
interface FilteredCardsProps {
  filteredCards: CardCommonAttributes[];
  focusIndex: number;
}

const SearchList = ({ filteredCards, focusIndex }: FilteredCardsProps) => {
  if (filteredCards.length === 0) {
    return <div>Opps! No cards match your search.</div>;
  }

  return (
    <ul tabIndex={0}>
      {filteredCards.map((card, index) => (
        <SearchCard
          cardData={card}
          className={
            index === focusIndex ? "search-card--focus" : "search-card"
          }
          key={card.id}
        />
      ))}
    </ul>
  );
};

export default SearchList;
