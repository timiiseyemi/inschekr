import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import f_img_1 from "@/assets/images/icon/car-insurance.png";
import f_img_2 from "@/assets/images/icon/money (1).png";
import f_img_3 from "@/assets/images/icon/calculator.png";
import f_img_4 from "@/assets/images/icon/file.png";
import icon from "@/assets/images/icon/icon_09.svg";
import shape from "@/assets/images/shape/shape_05.svg";

type Feature = {
  id: number;
  icon: StaticImageData;
  title: string;
  desc: string;
  url: string;        // <- required
};

const feature_data: Feature[] = [
  {
    id: 1,
    icon: f_img_1,
    title: "VIN / Chassis Decoder",
    desc: "Quickly decode your chassis (VIN) number to reveal your car’s make, model, year, body type — and even see a picture of your vehicle.",
    url: "/vin-decoder",           // make sure this page exists
  },
  {
    id: 2,
    icon: f_img_2,
    title: "Car Value Estimator",
    desc: "Check the current market value of your car based on year, mileage, and condition, so you know its worth before buying insurance or selling.",
    url: "/car-value-estimator",
  },
  {
    id: 3,
    icon: f_img_3,
    title: "Insurance Premium Calculator",
    desc: "Estimate how much your insurance will cost — from third-party to comprehensive coverage — with a few simple details.",
    url: "/service-details",
  },
  {
    id: 4,
    icon: f_img_4,
    title: "Policy Comparison",
    desc: "Easily compare different insurance policy types side by side so you can choose the one that best fits your needs and budget.",
    url: "/policy-comparison",
  },
];

const BlockFeatureFourteen = () => {
  return (
    <div className="block-feature-fourteen box-layout pt-40">
      <div className="bg-wrapper light-bg-deep border-40 position-relative z-1 pt-120 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="position-relative">
            <div className="row">
              <div className="col-lg-6">
                <div className="title-two text-center text-lg-start mb-30">
                  <div className="upper-title-two mb-10">Services</div>
                  <h2 className="text-dark">Our Featured Services</h2>
                </div>
              </div>
            </div>

            <div className="row justify-content-center gx-xl-5 mt-10">
              {feature_data.map((f) => (
                <div key={f.id} className="col-lg-6 d-flex wow fadeInUp" data-wow-delay="0.1s">
                  <div className="card-style-twenty d-flex position-relative z-1 tran3s w-100 mt-50 md-mt-30">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                      <Image
                        src={f.icon}
                        alt="icon"
                        width={37}
                        height={37}
                        className="lazy-img"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="fw-bold mb-25">{f.title}</h4>
                      <p className="mb-20 pe-xxl-5 me-xxl-5">{f.desc}</p>

                      {/* Use Link with the item's URL */}
                      <Link href={f.url} className="arrow-btn tran3s mt-auto stretched-link">
                        <Image src={icon} alt="" className="lazy-img" />
                      </Link>

                      {/* TEMP DEBUG (remove after testing): */}
                      {/* <div className="small text-muted mt-2">{f.url}</div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-subheading md-mt-40">
              <p className="text-lg mb-20 mt-30">
                Discover smart tools designed to make insurance simple, transparent, and accessible for everyone
              </p>
              <Link href="/service-v2" className="btn-three border-style icon-link">
                <span>See All Services</span>
                <Image src={icon} alt="" className="lazy-img icon ms-1" />
              </Link>
            </div>
          </div>
        </div>
        <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
      </div>
    </div>
  );
};

export default BlockFeatureFourteen;
