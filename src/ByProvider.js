import React from 'react';
import { PROVIDER_DATA, CRED_GAPS } from './data';
import { SectionTitle, TableWrap, Th, Td, Tag } from './ui';

export default function ByProvider() {
  return (
    <div>
      <SectionTitle>Provider denial profile</SectionTitle>
      <TableWrap>
        <thead>
          <tr>
            <Th>Provider</Th><Th>Specialty</Th><Th>NPI</Th><Th>Claims</Th>
            <Th>Denied</Th><Th>Denial rate</Th><Th>At risk</Th><Th>Primary code</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {PROVIDER_DATA.map(p => {
            const pct = ((p.denied / p.claims) * 100).toFixed(0) + '%';
            const drColor  = p.status === 'red' ? '#c0392b' : p.status === 'amber' ? '#d4700a' : '#27ae60';
            const tagColor = p.status === 'red' ? 'red'     : p.status === 'amber' ? 'amber'   : 'green';
            const tagLabel = p.status === 'red' ? 'High risk': p.status === 'amber' ? 'Monitor' : 'Clean';
            return (
              <tr key={p.npi}>
                <Td style={{ fontWeight: 600 }}>{p.name}</Td>
                <Td style={{ color: '#888' }}>{p.specialty}</Td>
                <Td style={{ fontFamily: 'monospace', fontSize: 11, color: '#aaa' }}>{p.npi}</Td>
                <Td style={{ fontFamily: 'monospace' }}>{p.claims}</Td>
                <Td style={{ fontFamily: 'monospace' }}>{p.denied}</Td>
                <Td style={{ fontFamily: 'monospace', color: drColor, fontWeight: 600 }}>{pct}</Td>
                <Td style={{ fontFamily: 'monospace', color: '#c0392b', fontWeight: 600 }}>${p.at_risk.toLocaleString()}</Td>
                <Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.carc}</Td>
                <Td><Tag color={tagColor}>{tagLabel}</Tag></Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>

      <SectionTitle>Credentialing &amp; enrollment gaps</SectionTitle>
      <TableWrap>
        <thead>
          <tr>
            <Th>Provider</Th><Th>Payer</Th><Th>Gap type</Th><Th>Claims</Th><Th>At risk</Th><Th>Required action</Th>
          </tr>
        </thead>
        <tbody>
          {CRED_GAPS.map((g, i) => {
            const gapColor = ['Not credentialed','Not enrolled','ERA not enrolled'].includes(g.gap) ? 'red'
              : ['In process','Out of network'].includes(g.gap) ? 'amber' : 'grey';
            const atRiskColor = gapColor === 'red' ? '#c0392b' : gapColor === 'amber' ? '#d4700a' : '#888';
            return (
              <tr key={i}>
                <Td style={{ fontWeight: 600 }}>{g.provider}</Td>
                <Td>{g.payer}</Td>
                <Td><Tag color={gapColor}>{g.gap}</Tag></Td>
                <Td style={{ fontFamily: 'monospace' }}>{g.claims}</Td>
                <Td style={{ fontFamily: 'monospace', color: atRiskColor, fontWeight: 600 }}>{g.at_risk}</Td>
                <Td style={{ color: '#888', fontSize: 12 }}>{g.action}</Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
    </div>
  );
}
