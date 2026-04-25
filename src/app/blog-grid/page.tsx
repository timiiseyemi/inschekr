import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderSeven from "@/layout/header/header-seven";
import FancyBannerThree from "@/components/fancy-banner/fancy-banner-three";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-two";
import FooterTwo from "@/layout/footer/footer-two";
import BlogGridAreaServer from "./BlogGridAreaServer";


export const metadata: Metadata = {
  title: "Blog",
};

const BlogGridPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSeven />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbTwo
            title="Explore our News"
            subtitle="Find the team members details here with all the information"
            page="Blog"
          />
          {/* breadcrumb end */}

          {/* blog grid area start */}
          <BlogGridAreaServer />
          {/* blog grid area end */}

          {/* fancy banner three start */}
          <FancyBannerThree />
          {/* fancy banner three end */}
        </main>

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default BlogGridPage;
