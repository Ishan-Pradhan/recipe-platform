import React from "react";
import Header from "./../components/Header";
import SiteDescription from "../components/About us components/SiteDescription";
import AuthorIntro from "../components/About us components/AuthorIntro";
import FeaturedSection from "../components/Home Components/FeaturedSection";
import SubscribeSection from "../components/Home Components/SubscribeSection";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <SiteDescription />
      <AuthorIntro />
      <FeaturedSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default AboutUs;
