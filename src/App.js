import React, { useState, useEffect } from 'react';
import './App.scss';
// Context and routes
import { ContextProvider } from './Context/Context';
import { BrowserRouter as Router, Route } from "react-router-dom";
//Components
import PrincipalPage from './PrincipalPage/PrincipalPage';
import PokemonDetailed from './PokemonDetailed/PokemonDetailed';

function App() {

  //Context
  const [contextInfo, setContextInfo] = useState({
    screenWidth: window.innerWidth,
    paginationSelected: 1,
    count: 1118, //The total number of resources available from this API. (Int)
    pokemonResults: [], //A list of named API resources.
    pokemonDetailed: undefined,
    loading: true,
  });

  //Calculate the screen width
  useEffect(() => {
    const updateWindowDimensions = () => {
      setContextInfo({ ...contextInfo, screenWidth: window.innerWidth });
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div className="App">
      <ContextProvider value={{ contextInfo, setContextInfo }}>
        <Router basename={process.env.PUBLIC_URL}>
          <Route path='/' exact component={PrincipalPage} />
          <Route path='/pokemonDetailed' exact component={PokemonDetailed} />
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
