import React from "react";

import './Header.css'
const Header = () => {
  return (
    <header className="header">
      <div className="pokedex-logo">Pokédex</div>
      <div className="header-seperator"></div>
      <div className="header-text">
        Search for any Pokémon that exists on the planet
      </div>
    </header>
  );
};

export default Header;
