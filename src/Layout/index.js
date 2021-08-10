import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import Deck from "./Deck/Deck";
import Study from "./Deck/Study";
import Header from "./Common/Header";
import CreateDeck from "./Home/CreateDeck";
import DeckList from "./Home/DeckList";
import NotFound from "./Common/NotFound";

function Layout() {
  // Decks state variable
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const decks = await listDecks(abortController.signal);
        setDecks(decks);
      } catch (e) {
        console.log(e);
      }
    }
    fetchDecks();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          {/* route for home page */}
          <Route exact path="/">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push("/decks/new")}
            >
              Create Deck
            </button>
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          {/* route for create new deck page */}
          <Route exact path="/decks/new">
            <CreateDeck decks={decks} />
          </Route>
          {/* route for study page */}
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          {/* route decks page */}
          <Route path="/decks/:deckId">
            <Deck decks={decks} setDecks={setDecks} />
          </Route>
          <Route>
            {/* For no routes found */}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
