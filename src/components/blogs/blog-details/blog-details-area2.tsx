import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import blog_1 from "@/assets/images/blog/blog_img_01.jpg";

import icon from "@/assets/images/icon/icon_93.svg";

import { IBlog } from "@/types/blog-d-t";

const BlogDetailsArea = ({ blog }: { blog: IBlog }) => {
  const { date, title, post_info } = blog || {};
  return (
    <div className="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-8">
            <article className="blog-meta-two style-two">
              <figure
                className="post-img position-relative d-flex align-items-end m0"
                style={{ backgroundImage: `url(${blog_1.src})` }}
              >
                <div className="date">{date}</div>
              </figure>

              <div className="post-data">
                <div className="post-info">{post_info}</div>
                <div className="blog-title">
                  <h4>{title}</h4>
                </div>

                {/* ===== Second News Content (clean JSX) ===== */}
                <div className="post-details-meta">
                  <p>
                    Nigerian underwriters and insurtech partners are piloting{" "}
                    <strong>usage-based (pay-as-you-drive) motor insurance</strong>, linking
                    premiums more closely to real driving behavior. The move is aimed at improving
                    affordability, rewarding safer drivers, and reducing fraud through better data.
                  </p>

                  <h5>How usage-based cover works</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Data sources:</strong> odometer readings, mobile telematics, or OBD devices to capture mileage and driving patterns.
                    </li>
                    <li>
                      <strong>Pricing:</strong> base premium plus a variable component that adjusts with actual kilometers driven and risk profile.
                    </li>
                    <li>
                      <strong>Customer control:</strong> app dashboards show monthly usage, savings, and tips to keep premiums low.
                    </li>
                  </ul>

                  <p>
                    For motorists who commute less or drive primarily off-peak, usage-based pricing can
                    deliver meaningful savings versus flat-rate annual policies. It also encourages safer
                    habits by surfacing harsh braking, speeding, and night-driving exposure.
                  </p>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “When price reflects actual risk and usage, adoption rises and claims outcomes improve.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Market Insight <span>— Lagos</span>
                      </h6>
                    </div>
                  </div>

                  

                  <h5>What motorists should know</h5>
                  <ul className="style-none list-item">
                    <li>Confirm what data is collected and how it’s used; review the privacy policy.</li>
                    <li>Ask about minimum monthly charges and how prices adjust with mileage.</li>
                    <li>Check repair networks and claims timelines remain the same as standard policies.</li>
                  </ul>

                  <p>
                    Rollout will be phased as insurers refine pricing models and customer experience.
                    Expect to see usage-based options offered alongside traditional third-party and
                    comprehensive policies through agents, bancassurance, and digital channels.
                  </p>
                </div>
                {/* ===== End content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Motor</Link></li>
                    <li><Link href="#">Nigeria</Link></li>
                  </ul>
                  <ul className="d-flex share-icon align-items-center style-none pt-20">
                    <li>Share:</li>
                    <li><Link href="#"><i className="bi bi-facebook"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-twitter"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-linkedin"></i></Link></li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <div className="col-lg-4 col-md-8">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
