import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardForm from "../Common/CardForm";
import { createCard } from "../../utils/api";

function AddCard({ deck }) {
  const [newCard, setNewCard] = useState({ front: ``, back: `` });
  const Handler = () => {
    createCard(deck.id, newCard)
      .then((res) => deck.cards.push(res))
      .then(() => setNewCard({ front: ``, back: `` }));
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>
              <span className="oi"></span>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardForm
        deck={deck}
        card={newCard}
        setCard={setNewCard}
        cancel={{ name: "Done", url: `/decks/${deck.id}` }}
        submit={{ name: "Save", action: Handler }}
      />
    </>
  );
}

export default AddCard;
