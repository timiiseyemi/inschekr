import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// dynamically load the client calculator (avoids server/client boundary issues)
const PremiumCalculator = dynamic(
  () => import('@/components/calculators/premiumCalculator'),
  { ssr: false }
);

// internal
import service_img from '@/assets/images/media/img_35.jpg';
import icon_1 from '@/assets/images/icon/icon_72.svg';
import icon_2 from '@/assets/images/icon/icon_73.svg';
import icon_3 from '@/assets/images/icon/icon_74.svg';
import icon_4 from '@/assets/images/icon/icon_75.svg';

import icon_10 from '@/assets/images/icon/icon_81.svg';
import icon_11 from '@/assets/images/icon/icon_82.svg';
import icon_12 from '@/assets/images/icon/icon_83.svg';
import icon_13 from '@/assets/images/icon/icon_84.svg';
import ils_icon from '@/assets/images/assets/ils_03.svg';

// ServiceNav
function ServiceNav({
  icon,
  title,
  url,
  active,
}: {
  icon: StaticImageData;
  title: string;
  url: string;
  active?: boolean;
}) {
  return (
    <li>
      <Link href={url} className={`d-flex align-items-center w-100 ${active ? 'active' : ''}`}>
        <Image src={icon} alt="icon" className="lazy-img" />
        <span>{title}</span>
      </Link>
    </li>
  );
}

// CardItem
function CardItem({icon,title,subtitle}:{icon:StaticImageData;title:string;subtitle:string}) {
  return (
    <div className="card-style-sixteen text-center mt-40">
      <div className="icon m-auto tran3s rounded-circle d-flex align-items-center justify-content-center">
        <Image src={icon} alt="icon" className="lazy-img icon-white"/>
       </div>
      <h4 className="fw-bold mt-35 lg-mt-30 mb-15">{title}</h4>
      <p className="m0">{subtitle}</p>
    </div>
  )
}

// style 
const imgStyle = { height:'auto' };

const ServiceDetailsArea = () => {
  return (
    <div className="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-lg-8 order-lg-last">
            <div className="details-meta ps-xxl-5 ps-xl-3">
              <h2>Premium Calculator — InSchekr</h2>
              <p>
                Estimate your insurance premium across <strong>Motor</strong>, <strong>Health</strong>, <strong>Travel</strong>, <strong>Life</strong>, and <strong>Education</strong> classes.
                Adjust inputs and see results instantly. (Final premiums depend on insurer underwriting.)
              </p>

              
              {/* ===== Premium Calculator mounts here ===== */}
              <PremiumCalculator />

              <h3 className="mt-60 lg-mt-40">How It Works</h3>
              <p>Three simple steps to make a smarter decision:</p>
              <div className="line-wrapper pb-30 mt-40 lg-mt-30 mb-70 lg-mb-40">
                <div className="row">
                  <div className="col-md-4 wow fadeInUp">
                    <CardItem icon={icon_10} title='Provide Your Info' subtitle='Enter your car, health, travel, life, or education details depending on the insurance class you’re checking.' />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                    <CardItem icon={icon_11} title='Get Instant Results' subtitle='See estimated premiums calculated instantly based on your inputs.' />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                    <CardItem icon={icon_12} title='Compare & Secure Coverage' subtitle='Review your options side by side and move forward with the best policy for you.' />
                  </div>
                </div>
              </div>

              <div className="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
                <div className="d-xl-flex align-items-start">
                  <Image src={icon_13} alt="icon" className="lazy-img icon"/>
                    <div className="ps-xl-5">
                      <blockquote>Clear numbers in seconds — exactly what I needed before choosing my cover.</blockquote>
                      <div><span className="fw-bold">Tunde A.</span> Lagos</div>
                    </div>
                </div>
                <Image src={ils_icon} alt="ils_icon" className="lazy-img shapes shape_01"/>
              </div>

              <h3>What you’ll need</h3>
              <p>Have these handy to get the best estimate:</p>
              <ul className="style-none list-item pb-20">
                <li>Motor: estimated car value, model year, driver age</li>
                <li>Health: your age, number of dependents, plan level</li>
                <li>Travel: trip length, destination risk, traveler age</li>
                <li>Life: age, sum assured, policy term, smoker status</li>
                <li>Education: target fund and years to maturity</li>
              </ul>
              <p>Tip: Decode your VIN with InSchekr to auto-fill vehicle details, then jump back here.</p>
            </div>
          </div>

          <div className="col-xxl-3 col-lg-4 order-lg-first">
            <aside className="md-mt-40">
                      <div className="service-nav-item">
                        <ul className="style-none">
                         <ServiceNav icon={icon_1} title="Premium Calculator" url="/service-details" active/>
        <ServiceNav icon={icon_2} title="VIN / Chassis Decoder" url="/vin-decoder" />
        <ServiceNav icon={icon_3} title="Car Value Estimator" url="/car-value-estimator"  />
        <ServiceNav icon={icon_4} title="Compare Policies" url="/policy-comparison" />

                        </ul>
                      </div>
              <div className="contact-banner text-center mt-40 lg-mt-20">
                <h3 className="mb-20">Any Questions? Let’s talk</h3>
                <Link href="/contact" className="tran3s fw-500">Let’s Talk</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsArea;
