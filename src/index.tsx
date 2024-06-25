import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./pages/game";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChosenCardProvider } from "./contexts/CardsContext";
import { CardsComparisonProvider } from "./contexts/GameStateContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const GameWithContext = () => {
  return (
    <CardsComparisonProvider>
      <ChosenCardProvider>
        <Game />
      </ChosenCardProvider>
    </CardsComparisonProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hearthdleGame",
    element: <GameWithContext />,
  },
]);
const blizzardQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //The cards don't change too much so we can stale the data for 10 minutes
      staleTime: 600000,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={blizzardQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
