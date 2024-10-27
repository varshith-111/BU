import './styles/searchbar.css';

export default function SearchBar() {
  return (
    <section className="search-bar">
      <input type="text" placeholder="Search" className="search-input" />
      <button className="filter-btn">⚙️</button>
    </section>
  );
}
