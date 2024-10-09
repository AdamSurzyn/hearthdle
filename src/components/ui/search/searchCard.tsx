import React from "react";
import { CardCommonAttributes } from "../../../types/searchTypes";
import { useChosenCardContext } from "../../../contexts/CardsContext";
interface SearchCardProps {
  cardData: CardCommonAttributes;
  tabIndex?: number;
  style?: React.CSSProperties;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const SearchCard = React.forwardRef<HTMLDivElement, SearchCardProps>(
  ({ cardData, tabIndex, style, onFocus, onKeyDown }, ref) => {
    const { setChosenCard } = useChosenCardContext();

    const setCurrentChosenCard = () => {
      setChosenCard(cardData);
    };

    return (
      <div
        ref={ref}
        className="search-card"
        onClick={setCurrentChosenCard}
        tabIndex={tabIndex}
        style={style}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      >
        {cardData.name}
      </div>
    );
  }
);

export default SearchCard;
