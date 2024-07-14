import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

import React from "react";
import SectionMagazine5 from "./SectionMagazine5";

//

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <BgGlassmorphism />

      <div className="container relative">
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 />
        </div>

        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;
