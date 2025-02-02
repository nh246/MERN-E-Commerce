import Blogs from "../blogs/Blogs"
import Banner from "./Banner"
import Categories from "./Categories"
import DealsSection from "./DealsSection"
import Features from "./Features"
import TrendingProducts from "./TrendingProducts"
import Trends from "./Trends"

function Home() {
  return (
    <>
      <Banner/>
      <Categories/>
      <Trends/>
      <TrendingProducts/>
      <DealsSection/>
      <Features/>
      <Blogs/>
    </>
  )
}

export default Home