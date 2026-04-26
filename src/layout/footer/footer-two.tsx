import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import logo from '@/assets/images/logo/1.png';
import shape from '@/assets/images/shape/shape_06.svg';


// types
type IProps = {
  bg?:boolean
}
const FooterTwo = ({bg=true}:IProps) => {
  return (
    <div className={`footer-two ${bg?'':'no-bg'}`}>
    <div className="container">
      <div className="bg-wrapper position-relative">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-lg-4 footer-intro mb-30">
              <div className="logo mb-35 md-mb-20">
                <Link href="/">
                  <Image src={logo} alt="logo" className="footer-logo" width={140} height={140} style={{objectFit: 'contain'}} />
                </Link>
              </div> 
              <p className="lh-sm mb-40 md-mb-20">
                Lagos, Nigeria.
              </p>
              
            </div>
            <div className="col-lg-2 col-sm-4 mb-20">
              <h5 className="footer-title">Links</h5>
              <ul className="footer-nav-link style-none">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/service-v2">Our services</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-sm-4 mb-20">
              <h5 className="footer-title">Company</h5>
              <ul className="footer-nav-link style-none">
                <li><Link href="/about-us">About</Link></li>
              </ul>
            </div>
            <div className="col-xxl-2 col-lg-3 col-sm-4 mb-20">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-nav-link style-none">
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center">Copyright @{new Date().getFullYear()} InSchekr.</div>
        </div>
        <Image src={shape} alt="shape" className="lazy-img shapes shape_01"/>
        <Image src={shape} alt="shape" className="lazy-img shapes shape_02"/>
      </div>
    </div>
  </div>
  );
};

export default FooterTwo;