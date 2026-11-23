import Hero from "./components/Hero";
import Deals from "./components/Deals";
import TopPicks from "./components/TopPicks";
import Cuisines from "./components/Cuisines";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Deals />
      <TopPicks />
      <Cuisines />
      <Categories />
    </main>
  );
}
