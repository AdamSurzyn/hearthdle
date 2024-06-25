import React from "react";
import { CardCommonAttributes } from "../../../types/searchTypes";
import { useChosenCardContext } from "../../../contexts/CardsContext";
interface SearchCardProps {
  cardData: CardCommonAttributes;
}

export const SearchCard: React.FC<SearchCardProps> = ({ cardData }) => {
  const { setChosenCard } = useChosenCardContext();

  const setCurrentChosenCard = () => {
    setChosenCard(cardData);
  };
  return (
    <div className="search-card" onClick={setCurrentChosenCard}>
      {cardData.name}
    </div>
  );
};
