import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <Link to="/">Početna</Link>
      <Link to="/sobe">Sobe</Link>
      <Link to="/pretraga">Pretraga</Link>
    </nav>
  </header>
);

export default Header;
