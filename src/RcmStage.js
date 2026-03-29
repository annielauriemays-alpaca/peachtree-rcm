import React from 'react';
import { SectionTitle, Callout, TableWrap, Th, Td, Tag, StageBox } from './ui';

const stageGrid = {
  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
  gap: 1, background: '#e5e5e5', border: '1px solid #e5e5e5',
  borderRadius: 8, overflow: 'hidden', marginBottom: 28,
};

const rows = [
  { type: 'Credentialing — TRICARE SE',  carc: 'PR-170', claims: 19, risk: '$1,905', riskColor: '#c0392b', cause: 'Providers submitted before credentialing complete',  stage: 'front' },
  { type: 'Credentialing — GA Medicaid', carc: 'PR-170', claims: 11, risk: '$1,610', riskColor: '#c0392b', cause: 'Provider not enrolled in GA Medicaid directory',     stage: 'front' },
  { type: 'Authorization missing',       carc: 'PI-15',  claims: 15, risk: '$1,810', riskColor: '#c0392b', cause: 'Services rendered before auth confirmed',            stage: 'front' },
  { type: 'Eligibility lapse',           carc: 'PI-16',  claims:  4, risk: '$755',   riskColor: '#d4700a', cause: 'Medicaid coverage not re-verified',                  stage: 'front' },
  { type: 'ABA submitted to Medicare',   carc: 'CO-97',  claims:  3, risk: '$255',   riskColor: '#888',    cause: 'Not a covered Medicare benefit',                    stage: 'front' },
  { type: 'ERA enrollment missing',      carc: 'CO-B11', claims: 18, risk: '$3,220', riskColor: '#d4700a', cause: 'ERA not configured for provider/payer pair',         stage: 'mid' },
  { type: 'Out-of-network',              carc: 'PR-242', claims:  2, risk: '$340',   riskColor: '#888',    cause: 'Provider not contracted with Aetna',                 stage: 'back' },
];

export default function RcmStage() {
  return (
    <div>
      <SectionTitle>Revenue loss by RCM stage</SectionTitle>

      <div style={stageGrid}>
        <StageBox phase="Front-end (pre-claim)"      title="68%" titleColor="#c0392b" amount="$7,055 at risk"
          desc="Credentialing gaps · Authorization failures · Eligibility lapses. These denials are created before a claim is ever submitted." />
        <StageBox phase="Mid-cycle (claim creation)" title="31%" titleColor="#d4700a" amount="$3,220 at risk"
          desc="ERA enrollment missing for two provider/payer combinations. Claims stall in adjudication and appear as denials from an AR perspective." />
        <StageBox phase="Back-end (post-submission)" title="1%"  titleColor="#27ae60" amount="$100 at risk"
          desc="OON denials on two Aetna claims. Modest impact today — will scale with patient volume if contracting is not resolved." />
      </div>

      <Callout title="Why this matters for prioritization">
        The majority of revenue loss is happening before a claim is ever created. Investing in
        back-end denial management and appeals workflows — without fixing front-end failures first
        — will have limited impact. The right order: fix the source, then manage the backlog.
      </Callout>

      <SectionTitle style={{ marginTop: 28 }}>All denial types by stage</SectionTitle>
      <TableWrap>
        <thead>
          <tr><Th>Denial type</Th><Th>CARC</Th><Th>Claims</Th><Th>At risk</Th><Th>Root cause</Th><Th>Stage</Th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.type}>
              <Td style={{ fontWeight: 600 }}>{r.type}</Td>
              <Td style={{ fontFamily: 'monospace', color: '#aaa' }}>{r.carc}</Td>
              <Td style={{ fontFamily: 'monospace' }}>{r.claims}</Td>
              <Td style={{ fontFamily: 'monospace', color: r.riskColor, fontWeight: 600 }}>{r.risk}</Td>
              <Td style={{ color: '#888' }}>{r.cause}</Td>
              <Td>
                <Tag color={r.stage === 'front' ? 'red' : r.stage === 'mid' ? 'amber' : 'grey'}>
                  {r.stage === 'front' ? 'Front-end' : r.stage === 'mid' ? 'Mid-cycle' : 'Back-end'}
                </Tag>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  );
}
