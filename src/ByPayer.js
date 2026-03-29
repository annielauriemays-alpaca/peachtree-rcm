import React from 'react';
import { PAYER_DATA } from './data';
import { SectionTitle, TableWrap, Th, Td, Dot, MiniBar } from './ui';

const short = n => n
  .replace('Georgia Medicaid (DCH)', 'GA Medicaid')
  .replace('Cigna Behavioral Health', 'Cigna')
  .replace('BCBS of Georgia', 'BCBS GA')
  .replace('UnitedHealthcare', 'UHC');

export default function ByPayer() {
  const maxDR   = Math.max(...PAYER_DATA.map(p => p.denied / p.claims));
  const maxRisk = Math.max(...PAYER_DATA.map(p => p.at_risk));
  const byDR    = [...PAYER_DATA].sort((a, b) => (b.denied / b.claims) - (a.denied / a.claims));
  const byRisk  = [...PAYER_DATA].sort((a, b) => b.at_risk - a.at_risk);

  return (
    <div>
      <SectionTitle>Payer health summary</SectionTitle>
      <TableWrap>
        <thead>
          <tr>
            <Th>Payer</Th><Th>Type</Th><Th>Claims</Th><Th>Denied</Th>
            <Th>Denial rate</Th><Th>At risk</Th><Th>Paid</Th><Th>Status</Th><Th>Primary issue</Th>
          </tr>
        </thead>
        <tbody>
          {PAYER_DATA.map(p => {
            const dr = ((p.denied / p.claims) * 100).toFixed(0) + '%';
            const drColor = p.health === 'red' ? '#c0392b' : p.health === 'amber' ? '#d4700a' : '#27ae60';
            return (
              <tr key={p.id}>
                <Td style={{ fontWeight: 600 }}>{p.name}</Td>
                <Td style={{ color: '#888' }}>{p.type}</Td>
                <Td style={{ fontFamily: 'monospace' }}>{p.claims}</Td>
                <Td style={{ fontFamily: 'monospace' }}>{p.denied}</Td>
                <Td style={{ fontFamily: 'monospace', color: drColor, fontWeight: 600 }}>{dr}</Td>
                <Td style={{ fontFamily: 'monospace', color: '#c0392b', fontWeight: 600 }}>${p.at_risk.toLocaleString()}</Td>
                <Td style={{ fontFamily: 'monospace', color: '#27ae60' }}>${p.paid.toLocaleString()}</Td>
                <Td><Dot color={p.health} />{p.health === 'red' ? 'Critical' : p.health === 'amber' ? 'Monitor' : 'Healthy'}</Td>
                <Td style={{ color: '#888', fontSize: 12 }}>{p.issue}</Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <SectionTitle>Denial rate by payer</SectionTitle>
          {byDR.map(p => {
            const pct = p.denied / p.claims;
            const col = pct > 0.3 ? '#c0392b' : pct > 0.1 ? '#d4700a' : '#27ae60';
            return <MiniBar key={p.id} label={short(p.name)} value={pct} maxValue={maxDR} color={col} rightLabel={`${(pct * 100).toFixed(0)}%`} />;
          })}
        </div>
        <div>
          <SectionTitle>Revenue at risk by payer</SectionTitle>
          {byRisk.map(p => {
            const col = p.at_risk > 2000 ? '#c0392b' : p.at_risk > 500 ? '#d4700a' : '#27ae60';
            return <MiniBar key={p.id} label={short(p.name)} value={p.at_risk} maxValue={maxRisk} color={col} rightLabel={`$${p.at_risk.toLocaleString()}`} />;
          })}
        </div>
      </div>
    </div>
  );
}
