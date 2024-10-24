import React, { useEffect, useRef } from "react";
import { CardCommonAttributes } from "../../../types/searchTypes";
import { useChosenCardContext } from "../../../contexts/CardsContext";
interface SearchCardProps {
  cardData: CardCommonAttributes;
  className: string;
}

export const SearchCard = (
  { cardData, className }: SearchCardProps,
  key: number
) => {
  const cardRef = useRef<HTMLLIElement>(null);
  const { setChosenCard } = useChosenCardContext();

  useEffect(() => {
    if (className.includes("search-card--focus") && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [className]);

  const setCurrentChosenCard = () => {
    setChosenCard(cardData);
  };
  return (
    <li
      className={className}
      onClick={setCurrentChosenCard}
      key={key}
      ref={cardRef}
    >
      {cardData.name}
    </li>
  );
};

export default SearchCard;
