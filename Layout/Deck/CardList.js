import React from "react";
import Card from "./Card";

function CardList({ cards, deck, setDeck }) {
  const cardList = cards.map((card, index) => <Card key={index} cards={cards} deck={deck} card={card} setDeck={setDeck} />);
  return <>{cardList}</>
}

export default CardList;
