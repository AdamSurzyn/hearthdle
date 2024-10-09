import React, { useState, useRef, useEffect } from "react";
import { SearchCard } from "./searchCard";
import { CardCommonAttributes } from "../../../types/searchTypes";
import { useChosenCardContext } from "../../../contexts/CardsContext";
interface FilteredCardsProps {
  filteredCards: CardCommonAttributes[];
}

const SearchList: React.FC<FilteredCardsProps> = ({ filteredCards }) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setChosenCard } = useChosenCardContext();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsNavigating(true);
      setFocusedIndex((prev) =>
        prev < filteredCards.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsNavigating(true);
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && cardRefs.current[focusedIndex]) {
      setChosenCard(filteredCards[focusedIndex]);
    }
  };
  const handleInputFocus = () => {
    setIsNavigating(false);
  };
  useEffect(() => {
    if (isNavigating && focusedIndex >= 0 && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isNavigating]);

  useEffect(() => {
    const inputElement = document.getElementsByClassName("card-search");
    inputElement[0]?.addEventListener("focus", handleInputFocus);

    return () => {
      inputElement[0]?.removeEventListener("focus", handleInputFocus);
    };
  }, []);

  if (filteredCards.length === 0) {
    return <div>Opps! No cards match your search.</div>;
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} style={{ outline: "none" }}>
      {filteredCards.map((card, index) => (
        <SearchCard
          key={card.id}
          cardData={card}
          ref={(el) => (cardRefs.current[index] = el)}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

export default SearchList;
