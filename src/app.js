import React, { useState } from 'react';
import Dashboard from './Dashboard';
import RcmStage from './RcmStage';
import ByPayer from './ByPayer';
import DenialBreakdown from './DenialBreakdown';
import ByProvider from './ByProvider';
import ClaimsLog from './ClaimsLog';
import Plan from './Plan';

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'rcmstage',   label: 'RCM stage' },
  { id: 'bypayer',    label: 'By payer' },
  { id: 'breakdown',  label: 'Denial breakdown' },
  { id: 'providers',  label: 'By provider' },
  { id: 'claims',     label: 'Claims log' },
  { id: 'plan',       label: '90-day plan' },
];

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f9f9f9;
    color: #1a1a1a;
    font-size: 14px;
    line-height: 1.5;
  }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #f5f5f5; }
  ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
`;

export default function App() {
  const [active, setActive] = useState('overview');

  const panels = {
    overview:  <Dashboard />,
    rcmstage:  <RcmStage />,
    bypayer:   <ByPayer />,
    breakdown: <DenialBreakdown />,
    providers: <ByProvider />,
    claims:    <ClaimsLog />,
    plan:      <Plan />,
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Revenue Health Dashboard
          </h1>
          <p style={{ fontSize: 13, color: '#888' }}>
            Peachtree Behavioral Group · Atlanta, GA · Claims Oct 2024 – Feb 2025 · Sample dataset analysis
          </p>
        </div>

        {/* KPI cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1, background: '#e5e5e5', border: '1px solid #e5e5e5',
          borderRadius: 8, overflow: 'hidden', marginBottom: 32,
        }}>
          {[
            { label: 'Revenue at risk',      value: '$10,375',    color: '#c0392b' },
            { label: 'Denied claims',         value: '72 claims',  color: '#d4700a' },
            { label: 'Est. clean claim rate', value: '76%',        color: '#2563eb' },
            { label: 'Existential issue',     value: 'TRICARE 53%',color: '#1a1a1a' },
          ].map(k => (
            <div key={k.label} style={{ background: '#fff', padding: '20px 22px' }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', color: k.color }}>
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: 32 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: '10px 18px', fontSize: 13, background: 'none', border: 'none',
                borderBottom: active === t.id ? '2px solid #1a1a1a' : '2px solid transparent',
                marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap',
                color: active === t.id ? '#1a1a1a' : '#888',
                fontWeight: active === t.id ? 500 : 400,
                fontFamily: 'inherit',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active panel */}
        {panels[active]}

      </div>
    </>
  );
}
