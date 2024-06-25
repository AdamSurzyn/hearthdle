import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CardCommonAttributes } from "../types/searchTypes";

type ContextChosenCard = {
  choosenCard: CardCommonAttributes | null;
  setChosenCard: Dispatch<SetStateAction<CardCommonAttributes | null>>;
};

const ChosenCardContext = createContext<ContextChosenCard | null>(null);

export const ChosenCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [choosenCard, setChosenCard] = useState<CardCommonAttributes | null>(
    null
  );

  return (
    <ChosenCardContext.Provider value={{ choosenCard, setChosenCard }}>
      {children}
    </ChosenCardContext.Provider>
  );
};

export const useChosenCardContext = () => {
  const ctx = useContext(ChosenCardContext);

  if (!ctx) {
    throw Error("Missing ChosenCardContext, it's not wrapped in the provider");
  }

  return ctx;
};
