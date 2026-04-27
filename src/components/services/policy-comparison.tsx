'use client';

import React, { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// assets
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

function CardItem({
  icon,
  title,
  subtitle,
}: {
  icon: StaticImageData;
  title: string;
  subtitle: string;
}) {
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

/* =========================
   TYPES
========================= */
type TableRow = { feature: string; cells: (boolean | string)[] };
type ClassTable = { columns: string[]; rows: TableRow[]; notes?: string[] };

/* =========================
   CLASSES (EXPANDED 🇳🇬)
========================= */
const CLASS_TITLES = [
  'Motor',
  'Fire',
  'Marine Cargo',
  'Health (HMO)',
  'Travel',
  'Life (Term)',
  'Personal Accident',
  'Home',
  'Business',
  'Goods in Transit',
] as const;

type ClassKey = typeof CLASS_TITLES[number];

/* =========================
   DATA
========================= */
const TABLES: Record<ClassKey, ClassTable> = {
  Motor: {
    columns: ['Third-Party', 'Third-Party Fire & Theft', 'Comprehensive'],
    rows: [
      { feature: 'Required by Law (Nigeria)', cells: [true, true, true] },
      { feature: 'Third-party property damage', cells: [true, true, true] },
      { feature: 'Third-party bodily injury', cells: [true, true, true] },
      { feature: 'Fire (your vehicle)', cells: [false, true, true] },
      { feature: 'Theft (your vehicle)', cells: [false, true, true] },
      { feature: 'Accidental damage (your vehicle)', cells: [false, false, true] },
      { feature: 'Windscreen', cells: ['—', 'Optional', 'Optional/Included'] },
      { feature: 'Personal effects', cells: ['—', '—', 'Optional/Included'] },
      { feature: 'Towing & recovery', cells: ['—', 'Optional', 'Included'] },
      { feature: 'Excess (out-of-pocket)', cells: ['Low', 'Medium', 'Varies'] },
    ],
    notes: [
      'Third-party insurance is mandatory in Nigeria.',
      'Comprehensive gives full protection including your own vehicle.',
    ],
  },

  Fire: {
    columns: ['Basic Fire', 'Fire + Allied Perils', 'Industrial/Enhanced'],
    rows: [
      { feature: 'Fire & Lightning', cells: [true, true, true] },
      { feature: 'Explosion (domestic)', cells: [true, true, true] },
      { feature: 'Flood/Storm', cells: [false, true, true] },
      { feature: 'Burglary', cells: [false, 'Optional', true] },
      { feature: 'Business interruption', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Debris removal', cells: ['—', 'Optional', 'Included'] },
      { feature: 'Contents/Stock', cells: ['Optional', 'Optional', 'Included'] },
    ],
  },

  'Marine Cargo': {
    columns: ['ICC(C)', 'ICC(B)', 'ICC(A) All Risks'],
    rows: [
      { feature: 'Fire/Stranding', cells: [true, true, true] },
      { feature: 'Theft/Pilferage', cells: [false, 'Limited', true] },
      { feature: 'Water damage', cells: [false, 'Limited', true] },
      { feature: 'General average', cells: [true, true, true] },
      { feature: 'Warehouse-to-warehouse', cells: ['Optional', 'Optional', 'Included'] },
      { feature: 'War/Strike cover', cells: ['Optional', 'Optional', 'Optional'] },
    ],
  },

  'Health (HMO)': {
    columns: ['Basic', 'Standard', 'Enhanced'],
    rows: [
      { feature: 'Primary care', cells: [true, true, true] },
      { feature: 'Specialist care', cells: ['Limited', true, true] },
      { feature: 'Diagnostics', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Hospitalization', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Emergency care', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Maternity', cells: ['—/Optional', 'Optional', 'Included'] },
      { feature: 'Dental & Optical', cells: ['—/Optional', 'Optional', 'Optional/Included'] },
      { feature: 'Pre-existing conditions', cells: ['Waiting', 'Waiting', 'Broader'] },
    ],
  },

  Travel: {
    columns: ['Basic', 'Standard', 'Premium'],
    rows: [
      { feature: 'Medical expenses', cells: ['€30k+', '$50k+', '$100k+'] },
      { feature: 'Evacuation', cells: [true, true, true] },
      { feature: 'Trip cancellation', cells: ['—/Optional', 'Optional', 'Included'] },
      { feature: 'Baggage loss', cells: ['Limited', 'Standard', 'Enhanced'] },
      { feature: 'Personal liability', cells: ['—/Optional', 'Optional', 'Included'] },
      { feature: 'Visa support', cells: [true, true, true] },
    ],
  },

  'Life (Term)': {
    columns: ['Basic', 'Standard', 'With Riders'],
    rows: [
      { feature: 'Death benefit', cells: [true, true, true] },
      { feature: 'Accidental death', cells: [false, true, true] },
      { feature: 'Critical illness', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Disability cover', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Premium waiver', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Policy term', cells: ['5–30 yrs', '5–30 yrs', '5–30 yrs'] },
    ],
  },

  'Personal Accident': {
    columns: ['Basic', 'Standard', 'Enhanced'],
    rows: [
      { feature: 'Accidental death', cells: [true, true, true] },
      { feature: 'Permanent disability', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Temporary disability', cells: ['—', 'Optional', 'Included'] },
      { feature: 'Medical expenses', cells: ['Limited', 'Standard', 'Enhanced'] },
      { feature: 'Hospital cash', cells: ['—', 'Optional', 'Included'] },
      { feature: 'Funeral expenses', cells: ['—', 'Optional', 'Included'] },
    ],
  },

  Home: {
    columns: ['Basic', 'Standard', 'Premium'],
    rows: [
      { feature: 'Fire & Lightning', cells: [true, true, true] },
      { feature: 'Burglary', cells: ['Optional', true, true] },
      { feature: 'Flood', cells: [false, 'Optional', true] },
      { feature: 'Contents', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Liability', cells: [false, 'Optional', true] },
    ],
  },

  Business: {
    columns: ['Basic', 'SME', 'Enterprise'],
    rows: [
      { feature: 'Fire cover', cells: [true, true, true] },
      { feature: 'Liability', cells: ['Optional', true, true] },
      { feature: 'Theft', cells: ['Optional', true, true] },
      { feature: 'Business interruption', cells: [false, 'Optional', true] },
    ],
  },

  'Goods in Transit': {
    columns: ['Basic', 'Standard', 'All Risk'],
    rows: [
      { feature: 'Transit damage', cells: [true, true, true] },
      { feature: 'Theft', cells: [false, 'Limited', true] },
      { feature: 'Accidental loss', cells: ['Limited', true, true] },
      { feature: 'Loading/unloading', cells: ['Limited', true, true] },
    ],
  },
};

/* =========================
   HELPERS
========================= */
function TickCell(v: boolean | string) {
  return <span>{typeof v === 'boolean' ? (v ? '✔️' : '—') : v}</span>;
}

/* =========================
   COMPONENT
========================= */
const PolicyComparison: React.FC = () => {
  const [klass, setKlass] = useState<ClassKey>('Motor');
  const table = useMemo(() => TABLES[klass], [klass]);

  return (
    <div className="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
      <div className="container">
        <div className="row">

          {/* MAIN */}
          <div className="col-xxl-9 col-lg-8 order-lg-last">
            <div className="details-meta ps-xxl-5 ps-xl-3">
              <h2>Policy Comparison — InSchekr</h2>
              <p>Compare insurance options across Nigeria.</p>

              <div className="light-bg-deep p-3 p-md-5 rounded-4">
                <h3 className="mb-2">Compare Policies</h3>

                {/* DROPDOWN */}
                <select
                  value={klass}
                  onChange={(e) => setKlass(e.target.value as ClassKey)}
                  className="form-select mb-3"
                >
                  {CLASS_TITLES.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>

                {/* QUICK INSIGHT */}
                <p className="text-muted mb-3">
                  💡 Most users choose <strong>{table.columns[1]}</strong> for a balance between cost and coverage.
                </p>

                {/* TABLE */}
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th className="text-muted">Feature</th>
                        {table.columns.map((c, i) => <th key={i}>{c}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((r, idx) => (
                        <tr key={idx}>
                          <td className="text-muted">{r.feature}</td>
                          {r.cells.map((c, ii) => (
                            <td key={ii}>{TickCell(c)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* NOTES */}
                {!!table.notes?.length && (
                  <ul className="small text-muted mt-2 mb-0">
                    {table.notes.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                )}

                <div className="mt-4 d-flex gap-3 flex-wrap">
                  <Link href="/service-details" className="btn btn-dark rounded-3">
                    Estimate Premium
                  </Link>
                  <Link href="/contact" className="btn btn-primary rounded-3">
                    Buy Insurance
                  </Link>
                </div>
              </div>

              {/* HOW IT WORKS (UPDATED TEXT) */}
              <h3 className="mt-60 lg-mt-40">How It Works</h3>
              <p>Three quick steps to choose confidently:</p>

              <div className="line-wrapper pb-30 mt-40 lg-mt-30 mb-70 lg-mb-40">
                <div className="row">
                  <div className="col-md-4">
                    <CardItem icon={icon_10} title="Select a Class" subtitle="Choose insurance type from dropdown." />
                  </div>
                  <div className="col-md-4">
                    <CardItem icon={icon_11} title="Compare Options" subtitle="Review coverage levels easily." />
                  </div>
                  <div className="col-md-4">
                    <CardItem icon={icon_12} title="Proceed" subtitle="Estimate premium and purchase." />
                  </div>
                </div>
              </div>

              {/* QUOTE */}
              <div className="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
                <div className="d-xl-flex align-items-start">
                  <Image src={icon_13} alt="icon" className="lazy-img icon" />
                  <div className="ps-xl-5">
                    <blockquote>
                      This made it easy to understand what I’m getting for each plan.
                    </blockquote>
                    <div><span className="fw-bold">Chika N.</span> Lagos</div>
                  </div>
                </div>
                <Image src={ils_icon} alt="ils_icon" className="lazy-img shapes shape_01" />
              </div>

            </div>
          </div>

          {/* SIDEBAR */}
          <div className="col-xxl-3 col-lg-4 order-lg-first">
            <aside className="md-mt-40">
              <div className="service-nav-item">
                <ul className="style-none">
                  <ServiceNav icon={icon_1} title="Premium Calculator" url="/service-details" />
                  <ServiceNav icon={icon_2} title="VIN Decoder" url="/vin-decoder" />
                  <ServiceNav icon={icon_3} title="Car Value Estimator" url="/car-value-estimator" />
                  <ServiceNav icon={icon_4} title="Compare Policies" url="/policy-comparison" active />
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

export default PolicyComparison;