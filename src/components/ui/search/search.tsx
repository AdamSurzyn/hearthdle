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
const Search = ({ gameState }: GameScoreType) => {
  const [searchField, setSearchField] = useState("");

  const { error, data, isLoading } = useQuery<CardsQueryData, Error>({
    queryKey: ["cardsQuery"],
    queryFn: getAllCards,
  });
  const searchRef = useRef<HTMLDivElement | null>(null);
  const { showResults, setShowResults } = useUnclick(searchRef);
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchField(inputValue);
    setShowResults(true);
  };

  return (
    <div
      className={
        gameState.gameState !== "End"
          ? "card-search-container"
          : "card-search-container-disabled"
      }
    >
      <div ref={searchRef} className="card-search-list-container">
        <input
          className="card-search"
          type="search"
          onChange={handleSearchInputChange}
          placeholder="What card?"
          value={searchField}
          onKeyDown={handleKeyDown}
        ></input>
        {showResults && searchField && data?.cards !== undefined && (
          <Scroll>
            <SearchList filteredCards={filteredCards}></SearchList>
          </Scroll>
        )}
      </div>
      <button className="search-button">Search</button>
    </div>
  );
};

export default Search;
