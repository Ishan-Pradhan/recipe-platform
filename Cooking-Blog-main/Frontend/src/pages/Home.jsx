import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import HeroSection from "../components/Home Components/HeroSection";
import DiversePalette from "../components/Home Components/DiversePalette";
import FeaturedSection from "../components/Home Components/FeaturedSection";
import RecipesSection from "../components/Home Components/RecipesSection";
import CulinarySection from "../components/Home Components/CulinarySection";
import SubscribeSection from "../components/Home Components/SubscribeSection";
import Footer from "../components/Footer";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Header />
      <HeroSection />
      <DiversePalette />
      <FeaturedSection />
      <RecipesSection />
      <CulinarySection />
      <SubscribeSection />
      <button
        onClick={scrollToTop}
        className={
          window.scrollY > 700
            ? `p-4 h-12 w-12 rounded-full bg-primaryGreen  fixed bottom-10 right-6 flex items-center justify-center shadow-xl group transition-all ease-in-out duration-1000 opacity-100`
            : `hidden`
        }
        data-aos="fade-up"
      >
        <i className="fa-solid fa-angle-up group-hover:animate-bounce text-dark text-xl"></i>
      </button>
      <Footer />
    </div>
  );
};

export default Home;
