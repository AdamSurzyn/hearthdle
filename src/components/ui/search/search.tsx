import React, { useEffect, useState } from "react";
import "../../ui/search/search.scss";
import { CardCommonAttributes } from "./searchTypes";
import Scroll from "./scroll";
import SearchList from "./searchList";
import { CardsQueryData } from "./searchTypes";
import { useQuery } from "react-query";
import { allCards } from "../../../features/getCards";

const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const {
    error,
    data,
    isLoading,
  } = useQuery<CardsQueryData, Error>({
    queryKey: ["cardsQuery"],
    queryFn: allCards,
  });

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setSearchField(inputValue);
    }, 400);

    return () => {
      clearTimeout(typingTimer);
    }

  }, [inputValue])

  //! Czy to jest bezpieczne? Nie moglem w zaden inny sposob sprawic, zeby dzialalo...
  if (isLoading) {
    return <div className="card-search-container">Loading...</div>;
    //! Czy posiadanie tej samej klasy co kontener searchu jest ok, zeby miec loading w tej samej pozycji co searchbar?
  }

  if (!data || error) {
    return <div>An error occured : {error!.message}</div>;
  }

  const filteredCards = data.cards.filter((card) => {
    return card.name.toLowerCase().includes(searchField);
  });
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="card-search-container">
      <div className="card-search-list-container">
        <input
          className="card-search"
          type="search"
          onChange={handleSearchInputChange}
          placeholder="What card?"
          value={inputValue}
        ></input>
        {searchField && data.cards.length !== 0 && (
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
