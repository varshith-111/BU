'use client';

import './styles/header.css';

export default function Header() {
  return (
    <header>
      <nav>
        <button className="menu-btn">☰</button>
        <h1>Discover</h1>
        <span className="subheader">News from all over the world</span>
      </nav>
    </header>
  );
}
