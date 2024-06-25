import "../ui/grid.scss";
import { CardsComparisonAndNamesArr } from "../../types/gameReducerTypes";

const Grid = ({
  cardsComparisonArr,
}: {
  cardsComparisonArr: CardsComparisonAndNamesArr;
}) => {
  if (!cardsComparisonArr) {
    return null;
  }
  console.log(cardsComparisonArr);
  //!Musze tu wrzucic wlasciwe nazwy, a nie tylko, czy jest to true, false etc.
  return (
    <div className="cards-grid-container">
      {cardsComparisonArr.map((card, id) => (
        <div className="card-comparison" key={id}>
          <div className="card-prop">{card.className}</div>
          <div className="card-prop">{card.manaCostCorrect.toString()}</div>
          <div className="card-prop">{card.cardSet}</div>
          <div className="card-prop">{card.cardType}</div>
        </div>
      ))}
    </div>
  );
};

//

export default Grid;
