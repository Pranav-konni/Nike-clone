import Navbar from "../components/layout/navbar";
import Slider from "../components/section/slider";
import Featured from "../components/section/featured";
import Trending from "../components/section/trending";
import Topseller from "../components/section/topSeller";
import Offer from "../components/section/offer";
import About from "../components/section/about";
import Footer from "../components/layout/footer";
import PromoSection from "../components/section/promoSection";

function Home() {
  return (
    <>
      <Navbar />
      <Slider />
      <PromoSection endpoint="promotion1" sectionClass="promotion1-layer" />
      <Featured />
      <PromoSection endpoint="promotion2" sectionClass="promotion2-layer" />
      <Trending />
      <PromoSection endpoint="promotion3" sectionClass="promotion3-layer" />
      <Topseller />
      <Offer />
      <About />
      <Footer />
    </>
  );
}

export default Home;
