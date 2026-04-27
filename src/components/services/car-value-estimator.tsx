'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// assets
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
        <Image src={icon} alt="icon" className="lazy-img icon-white" />
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

// ------- helpers: normalize + local manifest lookup -------
type Manifest = Record<string, string>;
function norm(s?: string) {
  return (s || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
}
async function loadManifest(): Promise<Manifest | null> {
  try {
    const res = await fetch('/vehicles/manifest.json', { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
function manifestLookup(manifest: Manifest | null, make?: string, model?: string, year?: string) {
  if (!manifest) return null;
  const mk = norm(make), md = norm(model), yr = norm(year);
  if (!mk || !md || !yr) return null;
  const key = `${mk}|${md}|${yr}`;
  return manifest[key] || null;
}
function currency(n: number) {
  if (!isFinite(n)) return '—';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Math.max(0, n));
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function currentYear() {
  try { return new Date().getFullYear(); } catch { return 2025; }
}

// ------- rough estimation model -------
// If user doesn’t provide a baseline, we estimate a baseline using year/age.
// Then adjust by mileage & condition to give a range.
function estimateValue(params: {
  year: number;
  mileageKm: number;
  condition: 'excellent' | 'good' | 'fair' | 'rough';
  baseline?: number; // optional user-provided baseline NGN
}) {
  const { year, mileageKm, condition, baseline } = params;
  const age = clamp(currentYear() - year, 0, 30);

  // Baseline NGN if not provided — generic market curve
  // You can tweak these two numbers to fit your market better.
  const defaultBaselineNew = 12000000; // NGN, “new-ish” anchor value
  // exponential depreciation by age
  const base = baseline && baseline > 0
    ? baseline
    : Math.max(800000, Math.round(defaultBaselineNew * Math.exp(-0.18 * age)));

  // Mileage adjustment: assume ~15k km/year nominal
  const expectedKm = 15000 * Math.max(1, age || 1);
  const mileageRatio = mileageKm / Math.max(1, expectedKm);
  // +/- up to ~25% around expected mileage
  let mileageAdj = 1;
  if (mileageRatio > 1) {
    mileageAdj = clamp(1 - Math.log(mileageRatio) * 0.15, 0.7, 1); // more km → lower value
  } else {
    mileageAdj = clamp(1 + Math.log(1 / Math.max(1e-6, mileageRatio)) * 0.12, 1, 1.25); // fewer km → higher value
  }

  // Condition loading
  const conditionMap: Record<typeof condition, number> = {
    excellent: 1.1,
    good: 0.9,
    fair: 0.7,
    rough: 0.4,
  };
  const condAdj = conditionMap[condition] ?? 1.0;

  // Combine adjustments
  const pointEstimate = base * mileageAdj * condAdj;

  // Create a range (+/- spread)
  const spread = clamp(pointEstimate * 0.08, 120000, 1500000); // 8% spread, min/max bounds
  return {
    low: Math.max(0, pointEstimate - spread),
    mid: pointEstimate,
    high: pointEstimate + spread,
    notes: {
      age,
      base,
      mileageAdj: +mileageAdj.toFixed(3),
      condAdj,
    },
  };
}

// ===================== PAGE =====================
const CarValueEstimator: React.FC = () => {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    loadManifest().then(setManifest);
  }, []);

  // form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [mileage, setMileage] = useState<number | ''>('');
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair' | 'rough'>('good');
  const [baseline, setBaseline] = useState<number | ''>(''); // optional NGN

  const imagePath = useMemo(() => {
    if (!make || !model || !year) return null;
    return manifestLookup(manifest, make, model, String(year));
  }, [manifest, make, model, year]);

  const result = useMemo(() => {
    const y = typeof year === 'number' ? year : Number(year);
    const km = typeof mileage === 'number' ? mileage : Number(mileage);
    const base = typeof baseline === 'number' ? baseline : Number(baseline);
    if (!y || !isFinite(y) || y < 1980 || y > currentYear()) return null;
    if (!km || !isFinite(km) || km < 0) return null;
    return estimateValue({
      year: y,
      mileageKm: km,
      condition,
      baseline: base > 0 ? base : undefined,
    });
  }, [year, mileage, condition, baseline]);

  return (
    <div className="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
      <div className="container">
        <div className="row">
          {/* Main Column */}
          <div className="col-xxl-9 col-lg-8 order-lg-last">
            <div className="details-meta ps-xxl-5 ps-xl-3">
              <h2>Car Value Estimator — InSchekr</h2>
              <p>
                Estimate your car’s market value based on <strong>year</strong>, <strong>mileage</strong>, and{' '}
                <strong>condition</strong>. If we have a matching image in our library, it’ll be shown below.
              </p>

              

              {/* Estimator */}
              <div className="light-bg-deep p-4 p-md-5 rounded-4">
                <h3 className="mb-3">Car Value Estimator</h3>
                <p className="mb-4">
                  Enter your vehicle details. Optionally provide a <em>baseline value</em> (NGN) if you already have a
                  market quote — we’ll refine it with mileage & condition.
                </p>

                <form className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Make</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Toyota"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Model</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Corolla"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Year</label>
                    <input
                      type="number"
                      min={1980}
                      max={currentYear()}
                      className="form-control"
                      placeholder={`e.g. ${currentYear() - 5}`}
                      value={year}
                      onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Mileage (km)</label>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      className="form-control"
                      placeholder="e.g. 85000"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Condition</label>
                    <select
                      className="form-select"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as any)}
                    >
                      <option value="excellent">Excellent (Tokunbo)</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair (Nigerian used)</option>
                      <option value="rough">Rough</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Baseline Value (NGN, optional)</label>
                    <input
                      type="number"
                      min={0}
                      className="form-control"
                      placeholder="e.g. 5500000"
                      value={baseline}
                      onChange={(e) => setBaseline(e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>
                </form>

                {/* Results */}
<div className="row mt-4 gy-3">
  <div className="col-lg-6">
    <div className="card h-100 border-0 shadow-sm rounded-4">
      <div className="card-body">
        <h6 className="text-uppercase text-muted mb-1">Estimated Value</h6>
        {result ? (
          <>
            {/* ✅ Multiply values ×9 here */}
            <div className="display-6 fw-bold">{currency(result.mid * 8)}</div>
            <small className="text-muted">
              Range: {currency(result.low * 8)} – {currency(result.high * 8)}
            </small>
            <ul className="small text-muted mt-3 mb-0">
              <li>Age: {result.notes.age} years</li>
              <li>Baseline used: {currency(result.notes.base * 8)}</li>
              <li>Mileage factor: ×{result.notes.mileageAdj}</li>
              <li>Condition factor: ×{result.notes.condAdj}</li>
            </ul>
          </>
        ) : (
          <small className="text-muted">Enter year, mileage & condition to see an estimate.</small>
        )}
      </div>
    </div>
  </div>


                  {/* Image card: only when Make+Model+Year exist AND we find a local image */}
                  <div className="col-lg-6">
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                      <div className="card-body">
                        <h6 className="text-uppercase text-muted mb-3">Vehicle Image</h6>
                        {imagePath ? (
                          <img
                            src={imagePath}
                            alt={`${make} ${model} ${year || ''}`.trim()}
                            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                            loading="lazy"
                          />
                        ) : (
                          <small className="text-muted d-block">
                            Add Make, Model & Year (and ensure it exists in your local library) to see a photo.
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 d-flex gap-3 flex-wrap">
                  <Link href="/service-details" className="btn btn-dark rounded-3">
                    Get Insurance Premium
                  </Link>
                  <Link href="/policy-comparison" className="btn btn-primary rounded-3">
                    Compare Policies
                  </Link>
                </div>

                <p className="small text-muted mt-3 mb-0">
                  Estimates are indicative and may vary by market/condition. Images served from local library.
                </p>
              </div>

              {/* How it works */}
              <h3 className="mt-60 lg-mt-40">How It Works</h3>
              <p>Three quick steps:</p>
              <div className="line-wrapper pb-30 mt-40 lg-mt-30 mb-70 lg-mb-40">
                <div className="row">
                  <div className="col-md-4 wow fadeInUp">
                    <CardItem icon={icon_10} title="Enter Details" subtitle="Make, Model, Year, Mileage & Condition." />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                    <CardItem icon={icon_11} title="See Your Estimate" subtitle="We apply age, mileage & condition factors." />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                    <CardItem icon={icon_12} title="Next Steps" subtitle="Get premiums or compare policies instantly." />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
                <div className="d-xl-flex align-items-start">
                  <Image src={icon_13} alt="icon" className="lazy-img icon" />
                  <div className="ps-xl-5">
                    <blockquote>Got a ballpark figure in seconds — super handy before buying cover.</blockquote>
                    <div><span className="fw-bold">Chinedu O.</span> Port Harcourt</div>
                  </div>
                </div>
                <Image src={ils_icon} alt="ils_icon" className="lazy-img shapes shape_01" />
              </div>

              <h3>Tips</h3>
              <ul className="style-none list-item pb-20">
                <li>If you know a market price already, put it in “Baseline Value” — we’ll refine it.</li>
                <li>For more precise estimates, ensure the mileage is accurate.</li>
                <li>Add Make/Model/Year that exist in your library to show the correct photo.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xxl-3 col-lg-4 order-lg-first">
            <aside className="md-mt-40">
              <div className="service-nav-item">
                <ul className="style-none">
                 <ServiceNav icon={icon_1} title="Premium Calculator" url="/service-details" />
<ServiceNav icon={icon_2} title="VIN / Chassis Decoder" url="/vin-decoder" />
<ServiceNav icon={icon_3} title="Car Value Estimator" url="/car-value-estimator" active />
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

export default CarValueEstimator;
