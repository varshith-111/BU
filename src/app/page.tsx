import BreakingNewsSlider from "./components/breakingnewsslider";
import Categories from "./components/categories";
import Footer from "./components/footer";
import Header from "./components/header";
import NewsList from "./components/newslist";
import SearchBar from "./components/searchbar";


export default function Page() {
  return (
    <>
      <SearchBar />
      <BreakingNewsSlider />
      <Categories />
      <NewsList />
    </>
  );
}
