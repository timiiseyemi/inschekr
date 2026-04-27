import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// internal
import icon from "@/assets/images/icon/icon_09.svg";
import icon_2 from "@/assets/images/icon/target.png";
import icon_3 from "@/assets/images/icon/binocular.png";
import shape from "@/assets/images/shape/shape_05.svg";

// card item
function CardItem({icon,title,desc}:{icon:StaticImageData;title:string;desc:string}) {
  return (
    <div className="card-style-three d-flex pt-75 lg-pt-40 pb-45 lg-pb-20">
      {/* set intrinsic size and a helper class so CSS can control scale */}
      <Image src={icon} alt="icon" className="lazy-img icon card-icon" width={48} height={48} style={{objectFit: 'contain'}} />
      <div className="ps-4">
        <h4 className="fw-bold mb-20">{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function CounterBlock ({num,text,title,delay}:{num:number;text:string;title:string;delay:string}) {
  return (
    <div className="col-md-3 col-6">
      <div
        className="counter-block-two text-center text-md-start mt-35 wow fadeInUp"
        data-wow-delay={`0.${delay}s`}
      >
        <div className="main-count fw-500">
          <span className="counter">{num}</span>{text}
        </div>
        <p className="m0 text-md">{title}</p>
      </div>
    </div>
  );
}

const TextFeatureOne = ({ style_2 = false }: { style_2?: boolean }) => {
  return (
    <>
      {!style_2 && (
        <div className="text-feature-one mt-150 lg-mt-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-6 wow fadeInLeft">
                <div className="title-one">
                  <div className="upper-title">About InSchekr</div>
                  <h2>Smarter Insurance for Everyone.</h2>
                </div>
                <p className="text-lg mt-45 lg-mt-30 mb-35 lg-mb-20">
                  InSchekr simplifies insurance in Nigeria with easy tools to decode your VIN,
                  estimate car value, calculate premiums, and compare policies across classes
                  like Motor, Fire, Marine, Health, and Life — all in one place.
                </p>
                <div className="d-inline-flex flex-wrap align-items-center">
                  <Link href="/about" className="btn-four mt-15 me-4">
                    Learn about InSchekr
                  </Link>
                  <Link href="/contact" className="btn-three icon-link mt-15">
                    <span>Ask a Question</span>
                    <Image src={icon} alt="icon" className="lazy-img icon ms-1" />
                  </Link>
                </div>
              </div>

              <div className="col-xl-7 col-lg-6 wow fadeInRight">
                <div className="media-list-item ms-auto pe-xxl-5 pe-4 ps-xxl-5 ps-4 pb-35 md-mt-60 d-flex align-items-end">
                  <ul className="style-none">
                    <li>VIN/Chassis decoder with make, model, year & body type.</li>
                    <li>Car value estimator tuned for the Nigerian market.</li>
                    <li>Premium calculator & policy comparison across major classes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {style_2 && (
        <div className="text-feature-one mt-150 lg-mt-80">
          <div className="container">
            <div className="line-wrapper position-relative">
              <div className="row align-items-center">
                <div className="col-lg-5 wow fadeInLeft">
                  <div className="title-one">
                    <div className="upper-title">About InSchekr</div>
                    <h2>Built for Clear, Confident Choices.</h2>
                  </div>
                  <p className="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                    We bring transparency to insurance by giving you accurate data, clean
                    comparisons, and fast estimates — so you can choose the right cover with confidence.
                  </p>
                  <Link href="/contact" className="btn-three icon-link mt-15 md-mb-40">
                    <span>Ask the Team</span>
                    <Image src={icon} alt="icon" className="lazy-img icon ms-1" />
                  </Link>
                </div>

                <div className="col-lg-6 ms-auto wow fadeInRight">
                  <CardItem
                    icon={icon_2}
                    title="Our Mission"
                    desc="Make insurance simple, transparent, and accessible in Nigeria with free tools to decode, estimate, calculate, and compare."
                  />
                  <CardItem
                    icon={icon_3}
                    title="Our Vision"
                    desc="A one-stop platform trusted nationwide for all insurance classes — Motor, Fire, Marine, Health, Life, and beyond."
                  />
                </div>
              </div>

              <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextFeatureOne;
