'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// assets (keep your existing paths)
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

function CardItem({ icon, title, subtitle }: { icon: StaticImageData; title: string; subtitle: string }) {
  return (
    <div className="card-style-sixteen text-center mt-40">
      <div className="icon m-auto tran3s rounded-circle d-flex align-items-center justify-content-center">
        <Image src={icon} alt="icon" className="lazy-img icon-white" />
      </div>
      <h4 className="fw-bold mt-35 lg-mt-30 mb-15">{title}</h4>
      <p className="m0">{subtitle}</p>
    </div>
  );
}

const imgStyle = { height: 'auto' } as const;

// ---------------- Types ----------------
type VinResult = {
  Make?: string;
  Model?: string;
  ModelYear?: string;
  BodyClass?: string;
  VehicleType?: string;
  Trim?: string; // NHTSA may call this 'Trim'
};

type Manifest = Record<string, string>;

// ---------------- Utils ----------------
function norm(s?: string) {
  return (s || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

// Try variant-aware key first, then fallback.
// Returns a public path like "/vehicles/toyota/corolla/2018.jpg"
function resolveImagePath(
  manifest: Manifest | null,
  make?: string,
  model?: string,
  year?: string,
  variant?: string
) {
  if (!manifest) return null;
  const mk = norm(make), md = norm(model), yr = norm(year), vt = norm(variant);
  if (!mk || !md || !yr) return null;
  const withVariantKey = vt ? `${mk}|${md}|${yr}|${vt}` : '';
  return (withVariantKey && manifest[withVariantKey]) || manifest[`${mk}|${md}|${yr}`] || null;
}

const VinDecoder: React.FC = () => {
  // manifest of local images (generated file)
  const [manifest, setManifest] = useState<Manifest | null>(null);

  // load manifest once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/vehicles/manifest.json', { cache: 'force-cache' });
        if (res.ok) {
          const j = await res.json();
          setManifest(j);
        } else {
          setManifest({});
        }
      } catch {
        setManifest({});
      }
    })();
  }, []);

  // state
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<VinResult | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const cleanedVin = useMemo(() => vin.trim().toUpperCase(), [vin]);

  const decode = async () => {
    setErr(null);
    setData(null);
    setImagePath(null);

    if (cleanedVin.length < 11) {
      setErr('Please enter a valid VIN (at least 11–17 characters).');
      return;
    }

    try {
      setLoading(true);
      // NHTSA decode
      const nhtsa = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${encodeURIComponent(
        cleanedVin
      )}?format=json`;
      const r = await fetch(nhtsa);
      const j = await r.json();
      const res = (j?.Results && j.Results[0]) || {};
      const result: VinResult = {
        Make: res.Make || '',
        Model: res.Model || '',
        ModelYear: res.ModelYear || res.Model_Year || '',
        BodyClass: res.BodyClass || '',
        VehicleType: res.VehicleType || '',
        Trim: res.Trim || res.Series || res.SubSeries || '', // try a few
      };
      setData(result);

      // after setData(result);
if (result.Model) {
  const mk = (result.Make || '').toLowerCase().trim();
  const md = (result.Model || '').toLowerCase().trim();
  const yr = (result.ModelYear || '').toString().toLowerCase().trim();
  const vt = (result.Trim || '').toLowerCase().trim();
  const tryTrimKey = vt ? `${mk}|${md}|${yr}|${vt}` : '';
  const baseKey = `${mk}|${md}|${yr}`;

  const local = (tryTrimKey && manifest?.[tryTrimKey]) || (manifest?.[baseKey] ?? null);

  console.log('VIN decoded:', { mk, md, yr, vt, tryTrimKey, baseKey, resolved: local });
  setImagePath(local || null);
} else {
  setImagePath(null);
}


      // ✅ Only resolve image if Model exists
      if (result.Model) {
        const local = resolveImagePath(manifest, result.Make, result.Model, result.ModelYear, result.Trim);
        setImagePath(local || null);
      } else {
        setImagePath(null);
      }
    } catch {
      setErr('Could not decode this VIN right now. Please check the VIN or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
      <div className="container">
        <div className="row">
          {/* Main Column */}
          <div className="col-xxl-9 col-lg-8 order-lg-last">
            <div className="details-meta ps-xxl-5 ps-xl-3">
              <h2>VIN / Chassis Decoder — InSchekr</h2>
              <p>
                Instantly decode your VIN to reveal <strong>make</strong>, <strong>model</strong>, <strong>year</strong>, and <strong>body type</strong>.
              </p>

              

              {/* Decoder block */}
              <div className="light-bg-deep p-4 p-md-5 rounded-4">
                <h3 className="mb-3">VIN / Chassis Decoder</h3>
                <p className="mb-4">
                  Enter your VIN to reveal your vehicle details. If we have a matching photo in our local library, it will appear below.
                </p>

                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label className="form-label">VIN (17 characters preferred)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. WDBUF56X98B123456"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-primary w-100 rounded-3"
                      onClick={decode}
                      disabled={loading}
                    >
                      {loading ? 'Decoding…' : 'Decode VIN'}
                    </button>
                  </div>
                </div>

                {err && <div className="alert alert-danger mt-3 mb-0">{err}</div>}

                {data && (
                  <div className="row mt-4 gy-3">
                    <div className="col-lg-6">
                      <div className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body">
                          <h6 className="text-uppercase text-muted mb-3">Vehicle Details</h6>
                          <ul className="list-unstyled m-0">
                            <li><strong>Make:</strong> {data.Make || '—'}</li>
                            <li><strong>Model:</strong> {data.Model || '—'}</li>
                            <li><strong>Year:</strong> {data.ModelYear || '—'}</li>
                            <li><strong>Body Type:</strong> {data.BodyClass || '—'}</li>
                            <li><strong>Vehicle Type:</strong> {data.VehicleType || '—'}</li>
                            {data.Trim ? <li><strong>Variant/Trim:</strong> {data.Trim}</li> : null}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Image card shows ONLY if model exists AND a local imagePath is found */}
                    {data.Model && imagePath && (
                      <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                          <div className="card-body">
                            <h6 className="text-uppercase text-muted mb-3">Vehicle Image</h6>
                            <img
                              src={imagePath}
                              alt={`${data.Make} ${data.Model} ${data.ModelYear}`}
                              style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <p className="small text-muted mt-3 mb-0">
                  Vehicle data: NHTSA VPIC. Images: InSchekr local library.
                </p>
              </div>

              {/* How it works */}
              <h3 className="mt-60 lg-mt-40">How It Works</h3>
              <p>Three quick steps:</p>
              <div className="line-wrapper pb-30 mt-40 lg-mt-30 mb-70 lg-mb-40">
                <div className="row">
                  <div className="col-md-4 wow fadeInUp">
                    <CardItem icon={icon_10} title="Enter VIN" subtitle="Type your VIN from the windshield or door jamb." />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                    <CardItem icon={icon_11} title="Decode Instantly" subtitle="We fetch make, model, year & body details." />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                    <CardItem icon={icon_12} title="View Image" subtitle="If available in our library, the car photo appears below." />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
                <div className="d-xl-flex align-items-start">
                  <Image src={icon_13} alt="icon" className="lazy-img icon" />
                  <div className="ps-xl-5">
                    <blockquote>VIN decoded in seconds — and the photo helped me confirm the model.</blockquote>
                    <div><span className="fw-bold">Kemi O.</span> Abuja</div>
                  </div>
                </div>
                <Image src={ils_icon} alt="ils_icon" className="lazy-img shapes shape_01" />
              </div>

              <h3>Tips</h3>
              <ul className="style-none list-item pb-20">
                <li>Find your VIN at the base of the windshield or inside the driver’s door.</li>
                <li>Use the decoded year/make/model to get a precise premium estimate.</li>
                <li>Images are served from your local library for speed and reliability.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xxl-3 col-lg-4 order-lg-first">
            <aside className="md-mt-40">
              <div className="service-nav-item">
                <ul className="style-none">
                   <ServiceNav icon={icon_1} title="Premium Calculator" url="/service-details" />
                  <ServiceNav icon={icon_2} title="VIN / Chassis Decoder" url="/vin-decoder" active />
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

export default VinDecoder;
