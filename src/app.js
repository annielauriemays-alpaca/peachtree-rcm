import React, { useState } from 'react';

/* ─── GLOBAL STYLES ──────────────────────────────────────────── */
const G = {
  page:    { maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px', fontFamily: "'Inter', -apple-system, sans-serif", color: '#1a1a1a', fontSize: 14, lineHeight: 1.5 },
  card:    { background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '20px 22px', marginBottom: 14 },
  section: { fontSize: 15, fontWeight: 600, marginBottom: 20, color: '#1a1a1a' },
  muted:   { color: '#888' },
  mono:    { fontFamily: 'monospace' },
};

/* ─── TINY COMPONENTS ────────────────────────────────────────── */
function Tag({ c = 'grey', children }) {
  const s = { red: ['#fce8e6','#c0392b'], amber: ['#fef3e2','#b45309'], green: ['#e6f4ea','#27ae60'], grey: ['#f0f0f0','#777'], blue: ['#e8f0fe','#2563eb'] }[c];
  return <span style={{ display:'inline-block', fontSize:11, padding:'2px 8px', borderRadius:3, fontWeight:500, background:s[0], color:s[1] }}>{children}</span>;
}

function Dot({ c = 'grey' }) {
  const cols = { red:'#c0392b', amber:'#d4700a', green:'#27ae60', grey:'#ccc' };
  return <span style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:cols[c], marginRight:6, verticalAlign:'middle' }} />;
}

function Divider() { return <hr style={{ border:'none', borderTop:'1px solid #ebebeb', margin:'28px 0' }} />; }

function Callout({ title, children }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #e8e8e8', borderRadius:8, padding:'20px 24px', marginBottom:28 }}>
      {title && <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>{title}</div>}
      <div style={{ fontSize:13, color:'#555', lineHeight:1.65 }}>{children}</div>
    </div>
  );
}

function Th({ children, style }) {
  return <th style={{ fontSize:11, fontWeight:500, color:'#aaa', textAlign:'left', padding:'8px 12px', borderBottom:'1px solid #ebebeb', textTransform:'uppercase', letterSpacing:'0.06em', background:'#fafafa', ...style }}>{children}</th>;
}
function Td({ children, style }) {
  return <td style={{ padding:'11px 12px', borderBottom:'1px solid #f0f0f0', verticalAlign:'middle', color:'#333', ...style }}>{children}</td>;
}
function TblWrap({ children }) {
  return <div style={{ border:'1px solid #e8e8e8', borderRadius:8, overflow:'hidden', marginBottom:24 }}><table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>{children}</table></div>;
}

function BarItem({ name, carc, dollars, total, color, note }) {
  const pct = Math.round(dollars / total * 100);
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6 }}>
        <div style={{ fontSize:14, fontWeight:500 }}>{name} {carc && <span style={{ fontWeight:400, color:'#aaa', fontSize:13 }}>({carc})</span>}</div>
        <div style={{ fontSize:13, color:'#555', fontWeight:500, paddingLeft:16, whiteSpace:'nowrap' }}>${dollars.toLocaleString()} · {pct}%</div>
      </div>
      <div style={{ height:5, background:'#efefef', borderRadius:3, overflow:'hidden', marginBottom:6 }}>
        <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:3 }} />
      </div>
      {note && <div style={{ fontSize:12, color:'#888', lineHeight:1.4 }}>{note}</div>}
    </div>
  );
}

function MiniBar({ label, value, maxValue, color, right }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
        <div style={{ fontSize:13 }}>{label}</div>
        <div style={{ fontSize:13, color, fontWeight:500 }}>{right}</div>
      </div>
      <div style={{ height:5, background:'#efefef', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${value/maxValue*100}%`, background:color, borderRadius:3 }} />
      </div>
    </div>
  );
}

function StageBox({ phase, title, titleColor, amount, desc }) {
  return (
    <div style={{ background:'#fff', padding:'20px 22px' }}>
      <div style={{ fontSize:11, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, fontWeight:500 }}>{phase}</div>
      <div style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em', marginBottom:4, color:titleColor }}>{title}</div>
      {amount && <div style={{ fontSize:13, color:'#888', marginBottom:10 }}>{amount}</div>}
      <div style={{ fontSize:12, color:'#888', lineHeight:1.5, borderTop:'1px solid #f0f0f0', paddingTop:10 }}>{desc}</div>
    </div>
  );
}

function StageGrid({ children }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:1, background:'#e5e5e5', border:'1px solid #e5e5e5', borderRadius:8, overflow:'hidden', marginBottom:28 }}>{children}</div>;
}

function DCard({ sev, code, rarc, title, desc, stats }) {
  const borderColor = sev==='existential' ? '#c0392b' : sev==='monitor' ? '#d4700a' : '#e0e0e0';
  const tagC  = sev==='existential' ? 'red' : sev==='monitor' ? 'amber' : 'grey';
  const tagTx = sev==='existential' ? 'Existential' : sev==='monitor' ? 'Monitor' : 'Low priority';
  return (
    <div style={{ background:'#fff', border:'1px solid #e8e8e8', borderLeft:`3px solid ${borderColor}`, borderRadius:8, padding:'20px 22px', marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:500, color:'#aaa', letterSpacing:'0.04em', marginBottom:2 }}>{code}{rarc ? ` · RARC ${rarc}` : ''}</div>
          <div style={{ fontSize:15, fontWeight:600 }}>{title}</div>
        </div>
        <Tag c={tagC}>{tagTx}</Tag>
      </div>
      <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:'8px 0 14px' }}>{desc}</p>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize:11, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{s.label}</div>
            <div style={{ fontSize:13, fontWeight:500, color:s.color||'#333' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanItem({ num, title, desc, tag, tagC }) {
  return (
    <div style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid #f4f4f4' }}>
      <div style={{ fontSize:11, color:'#ccc', fontWeight:500, minWidth:22, paddingTop:1 }}>{num}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:3 }}>{title}</div>
        <div style={{ fontSize:13, color:'#666', lineHeight:1.55 }}>{desc}</div>
      </div>
      <div style={{ whiteSpace:'nowrap', paddingTop:1 }}><Tag c={tagC}>{tag}</Tag></div>
    </div>
  );
}

/* ─── DATA ───────────────────────────────────────────────────── */
const TOTAL = 10375;

const CAT_DATA = [
  { name:'Credentialing (provider type)', carc:'PR-170', dollars:3995, color:'#c0392b', note:'TRICARE SE · 19 claims + GA Medicaid · 11 claims · System design — providers submitted before credentialing complete' },
  { name:'ERA enrollment missing',        carc:'CO-B11', dollars:3220, color:'#d4700a', note:'BCBS of Georgia + UnitedHealthcare · 18 claims · System design — ERA not configured for provider/payer combination' },
  { name:'Authorization / PA missing',   carc:'PI-15',  dollars:1810, color:'#e67e22', note:'GA Medicaid · UHC · Cigna · Aetna · 15 claims · Operational — auth not obtained before service rendered' },
  { name:'Eligibility lapse',            carc:'PI-16',  dollars:755,  color:'#f0a500', note:'Georgia Medicaid · 4 claims · Operational — Medicaid coverage lapsed; not re-verified' },
  { name:'Out-of-network / no contract', carc:'PR-242', dollars:340,  color:'#6b7280', note:'Aetna · 2 claims · System design — provider submitted without active network contract' },
  { name:'Non-covered benefit',          carc:'CO-97',  dollars:255,  color:'#9ca3af', note:'Medicare Part B · 3 claims · Operational — ABA not covered under Medicare; submitted in error' },
];

const PAYER_DATA = [
  { name:'Georgia Medicaid (DCH)',  id:'GA_MEDICAID', type:'Medicaid',   claims:66, denied:21, at_risk:3765, paid:7420, issue:'Credentialing gap + PI-15 auth + PI-16 eligibility', h:'red' },
  { name:'TRICARE Southeast',       id:'TRICARE_SE',  type:'TRICARE',    claims:36, denied:19, at_risk:1905, paid:2640, issue:'PR-170 — 3 providers not credentialed',               h:'red' },
  { name:'UnitedHealthcare',        id:'UHC',         type:'Commercial', claims:36, denied:14, at_risk:2145, paid:2870, issue:'CO-B11 ERA not enrolled (Dev Patel) + PI-15',         h:'red' },
  { name:'BCBS of Georgia',         id:'BCBS_GA',     type:'Commercial', claims:60, denied:7,  at_risk:1390, paid:5240, issue:'CO-B11 ERA not enrolled (Dr. Osei)',                 h:'amber' },
  { name:'Cigna Behavioral Health', id:'CIGNA',       type:'Commercial', claims:36, denied:5,  at_risk:325,  paid:2860, issue:'PI-15 auth gaps on ABA codes',                      h:'amber' },
  { name:'Aetna',                   id:'AETNA',       type:'Commercial', claims:45, denied:3,  at_risk:590,  paid:3840, issue:'PR-242 OON (Dev Patel) + PI-15 auth gap',            h:'amber' },
  { name:'Medicare Part B',         id:'MEDICARE',    type:'Medicare',   claims:21, denied:3,  at_risk:255,  paid:1850, issue:'CO-97 ABA submitted in error',                      h:'green' },
];

const PROVIDER_DATA = [
  { name:'Lena Hargrove, LCSW',  spec:'Therapy',    npi:'1234567892', claims:42, denied:11, at_risk:1610, carc:'PR-170',         s:'red' },
  { name:'Dev Patel, LPC',       spec:'Therapy',    npi:'1234567893', claims:42, denied:14, at_risk:2210, carc:'CO-B11',         s:'red' },
  { name:'Dr. Renata Osei',      spec:'Psychiatry', npi:'1234567890', claims:42, denied:10, at_risk:1490, carc:'PR-170/CO-B11',  s:'red' },
  { name:'Dr. Marcus Webb',      spec:'Psychiatry', npi:'1234567891', claims:42, denied:5,  at_risk:870,  carc:'PR-170',         s:'amber' },
  { name:'Carmen Ruiz, BCBA',   spec:'ABA',        npi:'1234567894', claims:42, denied:9,  at_risk:920,  carc:'PR-170',         s:'amber' },
  { name:'Tyrone Banks, BCBA',  spec:'ABA',        npi:'1234567895', claims:42, denied:10, at_risk:730,  carc:'PR-170',         s:'amber' },
  { name:'Sofia Brennan, BCBA', spec:'ABA',        npi:'1234567896', claims:48, denied:13, at_risk:545,  carc:'PI-15/CO-97',    s:'green' },
];

const CRED_GAPS = [
  { provider:'Dr. Renata Osei',     payer:'TRICARE Southeast',      gap:'Not credentialed',    claims:'Multiple', at_risk:'$560+',  gc:'red',   action:'Initiate TRICARE credentialing · Stop submissions' },
  { provider:'Dr. Marcus Webb',     payer:'TRICARE Southeast',      gap:'Not credentialed',    claims:'Multiple', at_risk:'$520+',  gc:'red',   action:'Initiate TRICARE credentialing · Stop submissions' },
  { provider:'Carmen Ruiz, BCBA',  payer:'TRICARE Southeast',      gap:'Not credentialed',    claims:'Multiple', at_risk:'$825+',  gc:'red',   action:'Initiate TRICARE credentialing · Stop submissions' },
  { provider:'Tyrone Banks, BCBA', payer:'TRICARE Southeast',      gap:'In process',          claims:'Multiple', at_risk:'$255+',  gc:'amber', action:'Monitor application · Hold claims' },
  { provider:'Lena Hargrove, LCSW',payer:'Georgia Medicaid (DCH)', gap:'Not enrolled',        claims:'11',       at_risk:'$1,610', gc:'red',   action:'GA Medicaid enrollment · Stop billing under NPI' },
  { provider:'Dr. Renata Osei',    payer:'BCBS of Georgia',        gap:'ERA not enrolled',    claims:'6',        at_risk:'$1,240', gc:'red',   action:'Configure ERA enrollment in billing system' },
  { provider:'Dev Patel, LPC',     payer:'UnitedHealthcare',       gap:'ERA not enrolled',    claims:'9',        at_risk:'$1,980', gc:'red',   action:'Configure ERA enrollment in billing system' },
  { provider:'Dev Patel, LPC',     payer:'Aetna',                  gap:'Out of network',      claims:'2',        at_risk:'$340',   gc:'amber', action:'Initiate Aetna network contracting' },
  { provider:'Sofia Brennan, BCBA',payer:'Medicare Part B',        gap:'Non-covered benefit', claims:'3',        at_risk:'$255',   gc:'grey',  action:'Block ABA CPTs from Medicare submissions' },
];

const DENIED = [
  { id:'CLM10009', dos:'2025-01-06', prov:'Tyrone Banks, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97156', billed:60,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10010', dos:'2024-11-28', prov:'Tyrone Banks, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97151', billed:120, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10012', dos:'2024-11-06', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'UnitedHealthcare',       pid:'UHC',        cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10014', dos:'2025-02-08', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90834', billed:140, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10021', dos:'2024-10-22', prov:'Dr. Marcus Webb',      spec:'Psychiatry',payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90792', billed:350, paid:0,     status:'DENIED', carc:'PI-16',  root:'Medicaid coverage lapsed; not re-verified at time of service' },
  { id:'CLM10023', dos:'2024-12-19', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'Cigna Behavioral Health',pid:'CIGNA',       cpt:'97153', billed:50,  paid:0,     status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10024', dos:'2024-10-31', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'UnitedHealthcare',       pid:'UHC',        cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10025', dos:'2025-02-28', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'99213', billed:150, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10027', dos:'2025-02-02', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'BCBS of Georgia',        pid:'BCBS_GA',    cpt:'99214', billed:220, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10042', dos:'2024-10-19', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'Aetna',                  pid:'AETNA',      cpt:'90837', billed:180, paid:0,      status:'DENIED', carc:'PR-242', root:'Provider not contracted with Aetna; no active network agreement' },
  { id:'CLM10045', dos:'2024-12-07', prov:'Tyrone Banks, BCBA',   spec:'ABA',       payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'97153', billed:50,  paid:0,     status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10054', dos:'2024-12-18', prov:'Sofia Brennan, BCBA',  spec:'ABA',       payer:'UnitedHealthcare',       pid:'UHC',        cpt:'97155', billed:75,  paid:0,      status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10057', dos:'2024-10-10', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90791', billed:250, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10061', dos:'2024-12-16', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97151', billed:120, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10064', dos:'2025-01-28', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90791', billed:250, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10072', dos:'2025-01-24', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'UnitedHealthcare',       pid:'UHC',        cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10074', dos:'2025-02-16', prov:'Dr. Marcus Webb',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'99214', billed:220, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10075', dos:'2024-11-24', prov:'Dr. Marcus Webb',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'99213', billed:150, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10095', dos:'2024-11-16', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90791', billed:250, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10097', dos:'2025-02-03', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'90833', billed:80,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10104', dos:'2025-02-14', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90837', billed:180, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10123', dos:'2024-12-22', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90791', billed:250, paid:0,     status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10126', dos:'2025-01-21', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'97155', billed:75,  paid:0,     status:'DENIED', carc:'PI-16',  root:'Medicaid coverage lapsed; not re-verified at time of service' },
  { id:'CLM10129', dos:'2024-12-02', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'UnitedHealthcare',       pid:'UHC',        cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10137', dos:'2024-12-26', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'BCBS of Georgia',        pid:'BCBS_GA',    cpt:'99214', billed:220, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10153', dos:'2024-12-26', prov:'Sofia Brennan, BCBA',  spec:'ABA',       payer:'Medicare Part B',        pid:'MEDICARE',   cpt:'97155', billed:75,  paid:0,      status:'DENIED', carc:'CO-97',  root:'ABA not a covered Medicare benefit; provider submitted in error' },
  { id:'CLM10158', dos:'2025-01-27', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97151', billed:120, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10163', dos:'2025-01-25', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90837', billed:180, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10167', dos:'2024-10-29', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97153', billed:50,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10169', dos:'2025-01-16', prov:'Dr. Marcus Webb',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'99213', billed:150, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10172', dos:'2024-10-28', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'UnitedHealthcare',       pid:'UHC',        cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10174', dos:'2025-01-25', prov:'Tyrone Banks, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97155', billed:75,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10177', dos:'2024-11-09', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Aetna',                  pid:'AETNA',      cpt:'90791', billed:250, paid:0,      status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10184', dos:'2025-02-22', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90834', billed:140, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10193', dos:'2025-01-20', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'BCBS of Georgia',        pid:'BCBS_GA',    cpt:'90792', billed:350, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10203', dos:'2024-10-20', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'BCBS of Georgia',        pid:'BCBS_GA',    cpt:'99214', billed:220, paid:0,      status:'DENIED', carc:'CO-B11', root:'ERA not configured in billing system for this provider-payer combination' },
  { id:'CLM10218', dos:'2024-11-29', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97156', billed:60,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10221', dos:'2024-12-12', prov:'Tyrone Banks, BCBA',   spec:'ABA',       payer:'UnitedHealthcare',       pid:'UHC',        cpt:'97151', billed:120, paid:0,      status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10227', dos:'2025-02-18', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'99213', billed:150, paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10244', dos:'2024-10-09', prov:'Dr. Renata Osei',      spec:'Psychiatry',payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90833', billed:80,  paid:0,     status:'DENIED', carc:'PI-16',  root:'Medicaid coverage lapsed; not re-verified at time of service' },
  { id:'CLM10257', dos:'2025-02-06', prov:'Sofia Brennan, BCBA',  spec:'ABA',       payer:'Medicare Part B',        pid:'MEDICARE',   cpt:'97156', billed:60,  paid:0,      status:'DENIED', carc:'CO-97',  root:'ABA not a covered Medicare benefit; provider submitted in error' },
  { id:'CLM10268', dos:'2024-12-14', prov:'Dr. Marcus Webb',      spec:'Psychiatry',payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90792', billed:350, paid:0,     status:'DENIED', carc:'PI-15',  root:'Service rendered before authorization confirmed' },
  { id:'CLM10275', dos:'2024-11-02', prov:'Sofia Brennan, BCBA',  spec:'ABA',       payer:'Medicare Part B',        pid:'MEDICARE',   cpt:'97151', billed:120, paid:0,      status:'DENIED', carc:'CO-97',  root:'ABA not a covered Medicare benefit; provider submitted in error' },
  { id:'CLM10280', dos:'2025-02-22', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97156', billed:60,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10289', dos:'2024-12-13', prov:'Carmen Ruiz, BCBA',   spec:'ABA',       payer:'TRICARE Southeast',      pid:'TRICARE_SE', cpt:'97155', billed:75,  paid:0,      status:'DENIED', carc:'PR-170', root:'Provider submitted to TRICARE SE before credentialing complete' },
  { id:'CLM10292', dos:'2024-12-28', prov:'Lena Hargrove, LCSW',  spec:'Therapy',   payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'90837', billed:180, paid:0,     status:'DENIED', carc:'PR-170', root:'Provider not enrolled in GA Medicaid provider directory' },
  { id:'CLM10296', dos:'2025-01-31', prov:'Dev Patel, LPC',       spec:'Therapy',   payer:'Aetna',                  pid:'AETNA',      cpt:'90847', billed:160, paid:0,      status:'DENIED', carc:'PR-242', root:'Provider not contracted with Aetna; no active network agreement' },
];

const PAID = [
  { id:'CLM10000', dos:'2024-12-02', prov:'Tyrone Banks, BCBA',  spec:'ABA',       payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'97155', billed:75,  paid:52.64,  status:'PAID', carc:null, root:null },
  { id:'CLM10001', dos:'2024-10-08', prov:'Dr. Renata Osei',     spec:'Psychiatry',payer:'Aetna',                  pid:'AETNA',       cpt:'90792', billed:350, paid:262.13, status:'PAID', carc:null, root:null },
  { id:'CLM10003', dos:'2024-11-09', prov:'Tyrone Banks, BCBA',  spec:'ABA',       payer:'BCBS of Georgia',        pid:'BCBS_GA',     cpt:'97155', billed:75,  paid:49.39,  status:'PAID', carc:null, root:null },
  { id:'CLM10008', dos:'2024-10-19', prov:'Lena Hargrove, LCSW', spec:'Therapy',   payer:'BCBS of Georgia',        pid:'BCBS_GA',     cpt:'90791', billed:250, paid:180.75, status:'PAID', carc:null, root:null },
  { id:'CLM10011', dos:'2025-02-23', prov:'Dev Patel, LPC',      spec:'Therapy',   payer:'TRICARE Southeast',      pid:'TRICARE_SE',  cpt:'90834', billed:140, paid:110.19, status:'PAID', carc:null, root:null },
  { id:'CLM10013', dos:'2025-02-27', prov:'Dr. Marcus Webb',     spec:'Psychiatry',payer:'Cigna Behavioral Health',pid:'CIGNA',       cpt:'99214', billed:220, paid:147.50, status:'PAID', carc:null, root:null },
  { id:'CLM10015', dos:'2024-11-09', prov:'Sofia Brennan, BCBA', spec:'ABA',       payer:'Georgia Medicaid (DCH)', pid:'GA_MEDICAID', cpt:'97151', billed:120, paid:87.69,  status:'PAID', carc:null, root:null },
  { id:'CLM10016', dos:'2025-02-13', prov:'Dev Patel, LPC',      spec:'Therapy',   payer:'Aetna',                  pid:'AETNA',       cpt:'90847', billed:160, paid:108.46, status:'PAID', carc:null, root:null },
];

const ALL_CLAIMS = [...DENIED, ...PAID];
const short = n => n.replace('Georgia Medicaid (DCH)','GA Medicaid').replace('Cigna Behavioral Health','Cigna').replace('BCBS of Georgia','BCBS GA').replace('UnitedHealthcare','UHC');
const PAYER_IDS = ['TRICARE_SE','GA_MEDICAID','BCBS_GA','UHC','AETNA','CIGNA','MEDICARE'];
const CARCS     = ['PR-170','CO-B11','PI-15','PI-16','CO-97','PR-242'];

/* ─── TAB PANELS ─────────────────────────────────────────────── */

function Overview() {
  return (
    <div>
      <div style={G.section}>Revenue at risk by denial category</div>
      {CAT_DATA.map(c => <BarItem key={c.carc} {...c} total={TOTAL} />)}
      <Divider />
      <Callout title="The core finding">
        <p>Peachtree Behavioral Group is not struggling with billing complexity. It is struggling with upstream process failures generating entirely preventable denials. <strong>Two patterns account for 74% of revenue at risk:</strong> a credentialing gap with TRICARE Southeast affecting four providers, and ERA/EDI enrollment failures stalling adjudication with BCBS of Georgia and UnitedHealthcare. Neither is a billing problem. Both are system design failures that exist before a claim is created.</p>
        <p style={{ marginTop:8 }}>The majority of denied dollars are recoverable — but only after credentialing is complete and ERA enrollment is configured. Every new claim submitted against a known PR-170 block or without active ERA enrollment compounds the problem rather than resolving it.</p>
      </Callout>
    </div>
  );
}

function RcmStage() {
  const rows = [
    { type:'Credentialing — TRICARE SE',  carc:'PR-170', claims:19, risk:'$1,905', rc:'#c0392b', cause:'Providers submitted before credentialing complete',  st:'front' },
    { type:'Credentialing — GA Medicaid', carc:'PR-170', claims:11, risk:'$1,610', rc:'#c0392b', cause:'Provider not enrolled in GA Medicaid directory',     st:'front' },
    { type:'Authorization missing',       carc:'PI-15',  claims:15, risk:'$1,810', rc:'#c0392b', cause:'Services rendered before auth confirmed',            st:'front' },
    { type:'Eligibility lapse',           carc:'PI-16',  claims:4,  risk:'$755',   rc:'#d4700a', cause:'Medicaid coverage not re-verified',                 st:'front' },
    { type:'ABA submitted to Medicare',   carc:'CO-97',  claims:3,  risk:'$255',   rc:'#888',    cause:'Not a covered Medicare benefit',                    st:'front' },
    { type:'ERA enrollment missing',      carc:'CO-B11', claims:18, risk:'$3,220', rc:'#d4700a', cause:'ERA not configured for provider/payer pair',         st:'mid' },
    { type:'Out-of-network',              carc:'PR-242', claims:2,  risk:'$340',   rc:'#888',    cause:'Provider not contracted with Aetna',                 st:'back' },
  ];
  return (
    <div>
      <div style={G.section}>Revenue loss by RCM stage</div>
      <StageGrid>
        <StageBox phase="Front-end (pre-claim)"      title="68%" titleColor="#c0392b" amount="$7,055 at risk" desc="Credentialing gaps · Authorization failures · Eligibility lapses. These denials are created before a claim is ever submitted." />
        <StageBox phase="Mid-cycle (claim creation)" title="31%" titleColor="#d4700a" amount="$3,220 at risk" desc="ERA enrollment missing for two provider/payer combinations. Claims stall in adjudication and appear as denials from an AR perspective." />
        <StageBox phase="Back-end (post-submission)" title="1%"  titleColor="#27ae60" amount="$100 at risk"   desc="OON denials on two Aetna claims. Modest impact today — will scale with patient volume if contracting is not resolved." />
      </StageGrid>
      <Callout title="Why this matters for prioritization">The majority of revenue loss is happening before a claim is ever created. Investing in back-end denial management without fixing front-end failures first will have limited impact. The right order: fix the source, then manage the backlog.</Callout>
      <div style={{ ...G.section, marginTop:28 }}>All denial types by stage</div>
      <TblWrap>
        <thead><tr><Th>Denial type</Th><Th>CARC</Th><Th>Claims</Th><Th>At risk</Th><Th>Root cause</Th><Th>Stage</Th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.type}>
              <Td style={{ fontWeight:600 }}>{r.type}</Td>
              <Td style={{ ...G.mono, color:'#aaa' }}>{r.carc}</Td>
              <Td style={G.mono}>{r.claims}</Td>
              <Td style={{ ...G.mono, color:r.rc, fontWeight:600 }}>{r.risk}</Td>
              <Td style={G.muted}>{r.cause}</Td>
              <Td><Tag c={r.st==='front'?'red':r.st==='mid'?'amber':'grey'}>{r.st==='front'?'Front-end':r.st==='mid'?'Mid-cycle':'Back-end'}</Tag></Td>
            </tr>
          ))}
        </tbody>
      </TblWrap>
    </div>
  );
}

function ByPayer() {
  const maxDR   = Math.max(...PAYER_DATA.map(p => p.denied/p.claims));
  const maxRisk = Math.max(...PAYER_DATA.map(p => p.at_risk));
  const byDR    = [...PAYER_DATA].sort((a,b)=>(b.denied/b.claims)-(a.denied/a.claims));
  const byRisk  = [...PAYER_DATA].sort((a,b)=>b.at_risk-a.at_risk);
  return (
    <div>
      <div style={G.section}>Payer health summary</div>
      <TblWrap>
        <thead><tr><Th>Payer</Th><Th>Type</Th><Th>Claims</Th><Th>Denied</Th><Th>Denial rate</Th><Th>At risk</Th><Th>Paid</Th><Th>Status</Th><Th>Primary issue</Th></tr></thead>
        <tbody>
          {PAYER_DATA.map(p => {
            const dr = ((p.denied/p.claims)*100).toFixed(0)+'%';
            const dc = p.h==='red'?'#c0392b':p.h==='amber'?'#d4700a':'#27ae60';
            return (
              <tr key={p.id}>
                <Td style={{ fontWeight:600 }}>{p.name}</Td>
                <Td style={G.muted}>{p.type}</Td>
                <Td style={G.mono}>{p.claims}</Td>
                <Td style={G.mono}>{p.denied}</Td>
                <Td style={{ ...G.mono, color:dc, fontWeight:600 }}>{dr}</Td>
                <Td style={{ ...G.mono, color:'#c0392b', fontWeight:600 }}>${p.at_risk.toLocaleString()}</Td>
                <Td style={{ ...G.mono, color:'#27ae60' }}>${p.paid.toLocaleString()}</Td>
                <Td><Dot c={p.h}/>{p.h==='red'?'Critical':p.h==='amber'?'Monitor':'Healthy'}</Td>
                <Td style={{ color:'#888', fontSize:12 }}>{p.issue}</Td>
              </tr>
            );
          })}
        </tbody>
      </TblWrap>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div>
          <div style={G.section}>Denial rate by payer</div>
          {byDR.map(p => { const pct=p.denied/p.claims; const col=pct>0.3?'#c0392b':pct>0.1?'#d4700a':'#27ae60'; return <MiniBar key={p.id} label={short(p.name)} value={pct} maxValue={maxDR} color={col} right={`${(pct*100).toFixed(0)}%`}/>; })}
        </div>
        <div>
          <div style={G.section}>Revenue at risk by payer</div>
          {byRisk.map(p => { const col=p.at_risk>2000?'#c0392b':p.at_risk>500?'#d4700a':'#27ae60'; return <MiniBar key={p.id} label={short(p.name)} value={p.at_risk} maxValue={maxRisk} color={col} right={`$${p.at_risk.toLocaleString()}`}/>; })}
        </div>
      </div>
    </div>
  );
}

function DenialBreakdown() {
  return (
    <div>
      <div style={{ ...G.section, marginBottom:6 }}>Existential — stop everything</div>
      <p style={{ fontSize:13, ...G.muted, marginBottom:18 }}>Denial patterns that require immediate action before any new claims are submitted.</p>
      <DCard sev="existential" code="PR-170" rarc="N104" title="TRICARE Southeast — Credentialing gap (Psychiatry & ABA)"
        desc="Three providers (Dr. Renata Osei, Dr. Marcus Webb, Carmen Ruiz BCBA) were submitted to TRICARE Southeast before their credentialing was complete. Every claim for these providers against TRICARE is returning PR-170. Tyrone Banks BCBA is in-process. TRICARE's one-year timely filing limit provides the runway to credential correctly and appeal retroactively. No new TRICARE claims should be submitted for these NPIs until credentialing is active."
        stats={[{label:'Claims denied',value:'19'},{label:'Revenue at risk',value:'$1,905',color:'#c0392b'},{label:'TRICARE denial rate',value:'~53%'},{label:'Providers affected',value:'4 NPIs'},{label:'Recoverable?',value:'Yes — after credentialing',color:'#27ae60'}]}/>
      <DCard sev="existential" code="CO-B11" rarc="N382" title="ERA enrollment missing — BCBS of Georgia & UnitedHealthcare"
        desc="Dr. Renata Osei has no ERA enrollment active with BCBS of Georgia — $1,240 across six denied claims. Dev Patel, LPC has the same gap with UnitedHealthcare — $1,980 across nine denied claims. ERA enrollment must be confirmed before the first claim is submitted to any payer. The fix is configuration, not appeals."
        stats={[{label:'Claims affected',value:'18'},{label:'Revenue at risk',value:'$3,220',color:'#c0392b'},{label:'Payers',value:'BCBS GA · UHC'},{label:'Fix',value:'Full EDI audit · ERA activation'},{label:'Recoverable?',value:'Yes — resubmit after enrollment',color:'#27ae60'}]}/>
      <DCard sev="existential" code="PR-170" rarc="N104" title="Georgia Medicaid — Lena Hargrove, LCSW not enrolled"
        desc="Lena Hargrove, LCSW is not enrolled in the Georgia Medicaid (DCH) provider directory. Every therapy claim under her NPI is denied PR-170. Eleven claims totaling $1,610 at risk. Initiate enrollment immediately and stop Medicaid billing under this NPI until enrollment confirms."
        stats={[{label:'Claims denied',value:'11'},{label:'Revenue at risk',value:'$1,610',color:'#c0392b'},{label:'Payer',value:'Georgia Medicaid (DCH)'},{label:'Recoverable?',value:'Yes — retroactive appeal after enrollment',color:'#27ae60'}]}/>
      <Divider/>
      <div style={{ ...G.section, marginBottom:6 }}>Monitor — manage and contain</div>
      <p style={{ fontSize:13, ...G.muted, marginBottom:18 }}>Patterns actively generating denials but not yet at the scale of the credentialing cluster.</p>
      <DCard sev="monitor" code="PI-15" rarc="N56" title="Authorization required but not obtained"
        desc="15 claims across multiple providers returned PI-15 — services rendered without a valid prior authorization on file. GA Medicaid, UHC, and Cigna all require prior auth for ABA codes and psychiatric evals. The scheduling workflow does not enforce an authorization gate before confirming sessions. Retroactive auth is rarely approved."
        stats={[{label:'Claims denied',value:'15'},{label:'Revenue at risk',value:'$1,810',color:'#d4700a'},{label:'Payers',value:'GA Medicaid · UHC · Cigna · Aetna'},{label:'Fix',value:'Scheduling auth gate · Auth vendor SLA'},{label:'Recoverable?',value:'Low — retroactive auth rarely approved',color:'#c0392b'}]}/>
      <DCard sev="monitor" code="PI-16" rarc="N382" title="Medicaid eligibility lapses — coverage not re-verified"
        desc="Four claims returning PI-16 (patient not eligible on date of service) across Georgia Medicaid. Eligibility checked at intake but not re-verified monthly for ongoing patients, resulting in services billed against lapsed coverage."
        stats={[{label:'Claims denied',value:'4'},{label:'Revenue at risk',value:'$755',color:'#d4700a'},{label:'Fix',value:'Monthly Medicaid re-verification'}]}/>
      <Divider/>
      <div style={{ ...G.section, marginBottom:6 }}>Noise — address, don't prioritize</div>
      <DCard sev="noise" code="CO-97" rarc="N95" title="ABA claims submitted to Medicare Part B"
        desc="Three claims for ABA services submitted to Medicare Part B. ABA is not a covered Medicare benefit — no appeal pathway exists. Fix: add a pre-submission rule blocking ABA CPT codes from submitting to Medicare."
        stats={[{label:'Claims',value:'3'},{label:'At risk',value:'$255',color:'#888'},{label:'Recoverable?',value:'No',color:'#c0392b'}]}/>
      <DCard sev="noise" code="PR-242" rarc="MA67" title="Out-of-network — Aetna (Dev Patel, LPC)"
        desc="Two claims for Dev Patel, LPC returning PR-242 from Aetna. Provider is not in-network. Modest impact now, will scale with volume. Resolve by initiating Aetna network contracting application."
        stats={[{label:'Claims',value:'2'},{label:'At risk',value:'$340',color:'#888'},{label:'Fix',value:'Aetna network application'}]}/>
    </div>
  );
}

function ByProvider() {
  return (
    <div>
      <div style={G.section}>Provider denial profile</div>
      <TblWrap>
        <thead><tr><Th>Provider</Th><Th>Specialty</Th><Th>NPI</Th><Th>Claims</Th><Th>Denied</Th><Th>Denial rate</Th><Th>At risk</Th><Th>Primary code</Th><Th>Status</Th></tr></thead>
        <tbody>
          {PROVIDER_DATA.map(p => {
            const pct=((p.denied/p.claims)*100).toFixed(0)+'%';
            const dc=p.s==='red'?'#c0392b':p.s==='amber'?'#d4700a':'#27ae60';
            const tc=p.s==='red'?'red':p.s==='amber'?'amber':'green';
            const tl=p.s==='red'?'High risk':p.s==='amber'?'Monitor':'Clean';
            return (
              <tr key={p.npi}>
                <Td style={{ fontWeight:600 }}>{p.name}</Td>
                <Td style={G.muted}>{p.spec}</Td>
                <Td style={{ ...G.mono, fontSize:11, color:'#aaa' }}>{p.npi}</Td>
                <Td style={G.mono}>{p.claims}</Td>
                <Td style={G.mono}>{p.denied}</Td>
                <Td style={{ ...G.mono, color:dc, fontWeight:600 }}>{pct}</Td>
                <Td style={{ ...G.mono, color:'#c0392b', fontWeight:600 }}>${p.at_risk.toLocaleString()}</Td>
                <Td style={{ ...G.mono, fontSize:12 }}>{p.carc}</Td>
                <Td><Tag c={tc}>{tl}</Tag></Td>
              </tr>
            );
          })}
        </tbody>
      </TblWrap>
      <div style={G.section}>Credentialing &amp; enrollment gaps</div>
      <TblWrap>
        <thead><tr><Th>Provider</Th><Th>Payer</Th><Th>Gap type</Th><Th>Claims</Th><Th>At risk</Th><Th>Required action</Th></tr></thead>
        <tbody>
          {CRED_GAPS.map((g,i) => {
            const rc = g.gc==='red'?'#c0392b':g.gc==='amber'?'#d4700a':'#888';
            return (
              <tr key={i}>
                <Td style={{ fontWeight:600 }}>{g.provider}</Td>
                <Td>{g.payer}</Td>
                <Td><Tag c={g.gc}>{g.gap}</Tag></Td>
                <Td style={G.mono}>{g.claims}</Td>
                <Td style={{ ...G.mono, color:rc, fontWeight:600 }}>{g.at_risk}</Td>
                <Td style={{ color:'#888', fontSize:12 }}>{g.action}</Td>
              </tr>
            );
          })}
        </tbody>
      </TblWrap>
    </div>
  );
}

function ClaimsLog() {
  const [active, setActive] = useState('ALL');
  const FILTERS = [
    {label:'All claims',key:'ALL'},{label:'Denied only',key:'DENIED'},{label:'TRICARE SE',key:'TRICARE_SE'},
    {label:'GA Medicaid',key:'GA_MEDICAID'},{label:'BCBS GA',key:'BCBS_GA'},{label:'UnitedHealthcare',key:'UHC'},
    {label:'PR-170',key:'PR-170'},{label:'CO-B11',key:'CO-B11'},{label:'PI-15',key:'PI-15'},{label:'Paid only',key:'PAID'},
  ];
  const visible = ALL_CLAIMS.filter(c => {
    if (active==='ALL') return true;
    if (active==='DENIED') return c.status==='DENIED';
    if (active==='PAID') return c.status==='PAID';
    if (PAYER_IDS.includes(active)) return c.pid===active;
    if (CARCS.includes(active)) return c.carc===active;
    return true;
  });
  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
        {FILTERS.map(f => (
          <button key={f.key} onClick={()=>setActive(f.key)} style={{ padding:'5px 13px', fontSize:12, fontWeight:500, border:'1px solid', borderRadius:20, borderColor:active===f.key?'#1a1a1a':'#ddd', background:active===f.key?'#1a1a1a':'#fff', color:active===f.key?'#fff':'#555', cursor:'pointer', fontFamily:'inherit' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ border:'1px solid #e8e8e8', borderRadius:8, overflow:'hidden', maxHeight:520, overflowY:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr><Th>Claim ID</Th><Th>DOS</Th><Th>Provider</Th><Th>Specialty</Th><Th>Payer</Th><Th>CPT</Th><Th>Billed</Th><Th>Paid</Th><Th>Status</Th><Th>CARC</Th><Th>Root cause</Th></tr>
          </thead>
          <tbody>
            {visible.map(c => (
              <tr key={c.id} style={{ background:c.status==='DENIED'?'rgba(192,57,43,0.03)':'#fff' }}>
                <Td style={{ ...G.mono, fontSize:11, color:'#aaa' }}>{c.id}</Td>
                <Td style={{ ...G.mono, fontSize:12 }}>{c.dos}</Td>
                <Td style={{ fontWeight:600 }}>{c.prov}</Td>
                <Td style={G.muted}>{c.spec}</Td>
                <Td style={{ fontSize:12 }}>{c.payer}</Td>
                <Td style={G.mono}>{c.cpt}</Td>
                <Td style={G.mono}>${c.billed}</Td>
                <Td>{c.status==='PAID'?<span style={{ color:'#27ae60', fontFamily:'monospace' }}>${c.paid.toFixed(0)}</span>:<span style={{ color:'#ccc' }}>—</span>}</Td>
                <Td><Tag c={c.status==='DENIED'?'red':'green'}>{c.status==='DENIED'?'Denied':'Paid'}</Tag></Td>
                <Td>{c.carc?<span style={{ ...G.mono, fontSize:12, color:'#d4700a' }}>{c.carc}</span>:<span style={{ color:'#ccc' }}>—</span>}</Td>
                <Td style={{ fontSize:11, color:'#888', maxWidth:200 }} title={c.root||''}>{c.root?c.root.substring(0,44)+(c.root.length>44?'…':''):'—'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:12, color:'#aaa', marginTop:12, lineHeight:1.5, padding:'10px 14px', background:'#fafafa', borderRadius:6, border:'1px solid #ebebeb' }}>
        <strong style={{ color:'#888' }}>Note:</strong> This dataset is entirely synthetic, generated to demonstrate RCM analysis methodology. All provider NPIs, patient IDs, and claim numbers are fictional.
      </p>
    </div>
  );
}

function Plan() {
  const PHASES = [
    { title:'Days 1–14 · Stop the bleeding', items:[
      {num:'01',tag:'Immediate',tagC:'red',title:'Halt all TRICARE submissions for uncredentialed providers',desc:"Immediately cease claim submission for Dr. Osei, Dr. Webb, and Carmen Ruiz against TRICARE Southeast. Hold Tyrone Banks claims until in-process application confirms active status. Every claim submitted against a PR-170 block is unrecoverable until credentialing resolves."},
      {num:'02',tag:'Immediate',tagC:'red',title:'Initiate batch TRICARE credentialing for all affected providers simultaneously',desc:"Batch credentialing is more efficient than sequential — all providers clear around the same time. TRICARE's one-year timely filing limit provides the runway to credential correctly and file retroactive appeals once confirmed."},
      {num:'03',tag:'Immediate',tagC:'red',title:'Stop GA Medicaid billing under Lena Hargrove, LCSW · Submit enrollment application',desc:'Cease all Medicaid billing under NPI 1234567892 until enrollment confirms. GA Medicaid enrollment typically takes 60–90 days — initiating now minimizes the gap window.'},
    ]},
    { title:'Days 1–30 · Close ERA & configuration gaps', items:[
      {num:'04',tag:'Week 1–2',tagC:'amber',title:'Full EDI audit — every active provider × payer combination',desc:'Audit all active payer relationships for complete EDI setup: electronic claim submission, ERA enrollment, and remittance posting confirmed and tested. No new payer onboarding proceeds without full EDI confirmed.'},
      {num:'05',tag:'Week 2–3',tagC:'amber',title:'Configure pre-submission claim QA rules',desc:'Build rules that block: (a) ABA CPTs from submitting to Medicare, (b) claims for any provider whose credentialing status is not confirmed active, (c) submission for any payer without confirmed ERA enrollment.'},
      {num:'06',tag:'Week 3–4',tagC:'amber',title:'Establish auth SLA with vendor · Configure EHR scheduling gate',desc:'Hold auth vendor to strict TAT SLA with live payer calls required for all requests. Configure the EHR so no session can be confirmed without a valid authorization on file for auth-required payers.'},
      {num:'07',tag:'Week 3–4',tagC:'amber',title:'Monthly Medicaid eligibility re-verification workflow',desc:'Implement monthly re-verification for all active Medicaid patients. Flag any patient with uncertain eligibility status before confirming their next appointment.'},
    ]},
    { title:'Days 30–90 · Monitor, recover & scale', items:[
      {num:'08',tag:'Day 30–45',tagC:'green',title:'Activate real-time denial monitoring dashboard',desc:'Key metrics daily: clean claim rate (target 95%+), denial rate by payer, days to payment, Medicaid eligibility verification rate (target 100%). Escalation alert: 3+ same-CARC denials from same provider × payer within 30 days → auto-escalate.'},
      {num:'09',tag:'Day 45–90',tagC:'green',title:'File retroactive appeals for credentialing and ERA denials',desc:"Once TRICARE credentialing confirms and ERA enrollment activates, file retroactive appeals on all held claims with approval documentation. TRICARE's one-year TFL window provides the runway. Prioritize by dollar value."},
      {num:'10',tag:'Day 60–90',tagC:'green',title:'Initiate Aetna network contracting for Dev Patel, LPC',desc:'Two PR-242 OON denials are modest now but will scale. Initiate Aetna network application and evaluate whether a medical necessity network exception can be filed for existing denied claims.'},
    ]},
  ];
  return (
    <div>
      <StageGrid>
        <StageBox phase="Days 1–30"  title="Stop & audit"      titleColor="#2563eb" desc="Halt bad submissions · Batch credentialing initiated · Full EDI audit · Auth vendor SLA established" />
        <StageBox phase="Days 30–60" title="Configure & gate"  titleColor="#d4700a" desc="Close ERA gaps · Pre-submission QA rules · Auth scheduling gate · Eligibility re-verification workflow" />
        <StageBox phase="Days 60–90" title="Monitor & recover" titleColor="#27ae60" desc="Dashboards live · Retroactive appeals filed · Denial escalation alerts · Aetna contracting initiated" />
      </StageGrid>
      {PHASES.map(phase => (
        <div key={phase.title} style={{ marginBottom:28 }}>
          <div style={{ fontSize:12, fontWeight:600, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14, paddingBottom:8, borderBottom:'1px solid #ebebeb' }}>{phase.title}</div>
          <div style={{ borderTop:'1px solid #f4f4f4' }}>
            {phase.items.map(item => <PlanItem key={item.num} {...item} />)}
          </div>
        </div>
      ))}
      <Callout title="What success looks like at Day 90">
        Zero new TRICARE PR-170 denials for batch-credentialed providers. Zero CO-B11 ERA denials — all payers fully enrolled. GA Medicaid enrollment submitted for Lena Hargrove, LCSW. ABA-to-Medicare billing error eliminated. Clean claim rate trending toward 90%+. <strong>What is not promised in 90 days:</strong> a 95% clean claim rate from day one — systemic issues take time to fully resolve. What is committed: a system measurably better at Day 90 than Day 1.
      </Callout>
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
const TABS = [
  {id:'overview',  label:'Overview'},
  {id:'rcmstage',  label:'RCM stage'},
  {id:'bypayer',   label:'By payer'},
  {id:'breakdown', label:'Denial breakdown'},
  {id:'providers', label:'By provider'},
  {id:'claims',    label:'Claims log'},
  {id:'plan',      label:'90-day plan'},
];

export default function App() {
  const [active, setActive] = useState('overview');
  const panels = { overview:<Overview/>, rcmstage:<RcmStage/>, bypayer:<ByPayer/>, breakdown:<DenialBreakdown/>, providers:<ByProvider/>, claims:<ClaimsLog/>, plan:<Plan/> };

  return (
    <div style={{ background:'#f9f9f9', minHeight:'100vh' }}>
      <div style={G.page}>
        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <h1 style={{ fontSize:26, fontWeight:600, letterSpacing:'-0.02em', marginBottom:4 }}>Revenue Health Dashboard</h1>
          <p style={{ fontSize:13, color:'#888' }}>Peachtree Behavioral Group · Atlanta, GA · Claims Oct 2024 – Feb 2025 · Sample dataset analysis</p>
        </div>

        {/* KPI Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'#e5e5e5', border:'1px solid #e5e5e5', borderRadius:8, overflow:'hidden', marginBottom:32 }}>
          {[
            {label:'Revenue at risk',      value:'$10,375',    color:'#c0392b'},
            {label:'Denied claims',         value:'72 claims',  color:'#d4700a'},
            {label:'Est. clean claim rate', value:'76%',        color:'#2563eb'},
            {label:'Existential issue',     value:'TRICARE 53%',color:'#1a1a1a'},
          ].map(k => (
            <div key={k.label} style={{ background:'#fff', padding:'20px 22px' }}>
              <div style={{ fontSize:12, color:'#888', marginBottom:6 }}>{k.label}</div>
              <div style={{ fontSize:26, fontWeight:600, letterSpacing:'-0.02em', color:k.color }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid #e0e0e0', marginBottom:32 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setActive(t.id)} style={{ padding:'10px 18px', fontSize:13, background:'none', border:'none', borderBottom:active===t.id?'2px solid #1a1a1a':'2px solid transparent', marginBottom:-1, cursor:'pointer', whiteSpace:'nowrap', color:active===t.id?'#1a1a1a':'#888', fontWeight:active===t.id?500:400, fontFamily:'inherit' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        {panels[active]}
      </div>
    </div>
  );
}
