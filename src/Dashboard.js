import React from 'react';
import { CAT_DATA } from './data';
import { BarItem, SectionTitle, Callout } from './ui';

const TOTAL = 10375;

export default function Dashboard() {
  return (
    <div>
      <SectionTitle>Revenue at risk by denial category</SectionTitle>

      {CAT_DATA.map(c => (
        <BarItem key={c.carc} name={c.name} carc={c.carc} dollars={c.dollars} total={TOTAL} color={c.color} note={c.note} />
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', margin: '28px 0' }} />

      <Callout title="The core finding">
        <p>
          Peachtree Behavioral Group is not struggling with billing complexity. It is struggling with
          upstream process failures generating entirely preventable denials.{' '}
          <strong>Two patterns account for 74% of revenue at risk:</strong> a credentialing gap with
          TRICARE Southeast affecting four providers, and ERA/EDI enrollment failures stalling
          adjudication with BCBS of Georgia and UnitedHealthcare. Neither is a billing problem.
          Both are system design failures that exist before a claim is created.
        </p>
        <p style={{ marginTop: 8 }}>
          The majority of denied dollars are recoverable — but only after credentialing is complete
          and ERA enrollment is configured. Every new claim submitted against a known PR-170 block
          or without active ERA enrollment compounds the problem rather than resolving it.
        </p>
      </Callout>
    </div>
  );
}
