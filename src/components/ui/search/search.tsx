import React, { useEffect, useRef, useState } from "react";
import { useUnclick } from "../../hooks/useUnclick";
import "../../ui/search/search.scss";
import { CardCommonAttributes } from "../../../types/searchTypes";
import Scroll from "./scroll";
import SearchList from "./searchList";
import { CardsQueryData } from "../../../types/searchTypes";
import { useQuery } from "react-query";
import { getAllCards } from "../../../api/getCards";
import { GameScoreType } from "../../../types/modalTypes";
import { useChosenCardContext } from "../../../contexts/CardsContext";
const Search = ({ gameState }: GameScoreType) => {
  const [searchField, setSearchField] = useState("");

  const { error, data, isLoading } = useQuery<CardsQueryData, Error>({
    queryKey: ["cardsQuery"],
    queryFn: getAllCards,
  });
  const searchRef = useRef<HTMLDivElement | null>(null);
  const { showResults, setShowResults } = useUnclick(searchRef);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const { setChosenCard } = useChosenCardContext();
  useEffect(() => {
    if (gameState.gameState === "End") {
      setSearchField("");
    }
  }, [gameState.gameState]);
  if (isLoading) {
    return <div className="card-search-container">Loading...</div>;
  }

  if (error) {
    return <div>An error occured : {error.message}</div>;
  }

  const filteredCards = data?.cards.filter((card: CardCommonAttributes) => {
    return card.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchField(inputValue);
    setShowResults(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredCards.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      setChosenCard(filteredCards[focusedIndex]);
    }
  };

  return (
    <div
      className={
        gameState.gameState !== "End"
          ? "card-search-container"
          : "card-search-container-disabled"
      }
    >
      <div className="card-search-list-container" onKeyDown={handleKeyDown}>
        <input
          className="card-search"
          type="search"
          onChange={handleSearchInputChange}
          placeholder="What card?"
          value={searchField}
        ></input>
        {showResults && searchField && data?.cards !== undefined && (
          <Scroll>
            <SearchList
              filteredCards={filteredCards}
              focusIndex={focusedIndex}
            ></SearchList>
          </Scroll>
        )}
      </div>
      <button className="search-button">Search</button>
    </div>
  );
};

export default Search;
