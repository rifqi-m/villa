import rightImg from "../../../public/Caribe y Comida/IMG_1136.jpeg";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 ABOUT KANDULU"
          btnText=""
          subHeading={`The story of Villas Kandulu began in the heart of Costa Rica , where the Artavia Molinares family has deep roots. Inspired by the island's rich culture, natural beauty, and warm hospitality, Anjelika Artavia set out to create a unique retreat that embodies these qualities.In 2022, Anjelika and her family transformed their vision into reality. They purchased a historic property nestled in the scenic landscapes of Puerto Rico and began the journey of renovating it into a luxurious villa. The name "Kandulu" reflects their commitment to combining traditional Puerto Rican elements with modern comfort and style.Today, Villas Kandulu stands as a testament to the Artavia Molinares family's dedication to preserving the heritage of Costa Rica while providing guests with an unforgettable experience. Every aspect of the villa, from the architecture to the décor, has been thoughtfully designed to celebrate the island's vibrant culture.`}
        />

        <SectionStatistic />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
