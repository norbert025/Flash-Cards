import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [CardFlipped, setCardFlipped] = useState(false);
  const [IndexCard, setIndexCard] = useState(0);
  const [CardWasFlipped, setCardWasFlipped] = useState(false);
  

  const length = deck.cards ? deck.cards.length : 0;
  const deckId = useParams().deckId;
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const currentCard = deck.cards
    ? deck.cards[IndexCard]
    : { front: "", back: "" };
  function renderCard(currentCard) {
    return (
      <>
        <div className="mb-4">
          {CardFlipped ? currentCard.back : currentCard.front}
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => {
            setCardFlipped(!CardFlipped);
            setCardWasFlipped(true);
          }}
        >
          Flip
        </button>
        {CardWasFlipped ? (
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => {
              if (IndexCard + 1 >= length) {
                if (
                  window.confirm(
                    "Restart cards? \n\nClick 'cancel' to return to the home page"
                  )
                ) {
                  setIndexCard(0);
                  setCardFlipped(false);
                  setCardWasFlipped(false);
                } else {
                  history.push("/");
                }
              } else {
                setIndexCard(IndexCard + 1);
                setCardFlipped(false);
                setCardWasFlipped(false);
              }
            }}
          >
            Next
          </button>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span>Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>
              <span className="oi"></span>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {length <= 2 ? (
        <NotEnoughCards deck={deck} length={length} />
      ) : (
        <>
          <h1 className="mb-3">Study: {deck.name}</h1>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Card {IndexCard + 1} of {length}
              </h4>
              <div className="card-text">{renderCard(currentCard)}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Study;
