import React, { useState } from 'react';
import { ALL_CLAIMS } from './data';
import { Tag, Th, Td } from './ui';

const FILTERS = [
  { label: 'All claims',       key: 'ALL' },
  { label: 'Denied only',      key: 'DENIED' },
  { label: 'TRICARE SE',       key: 'TRICARE_SE' },
  { label: 'GA Medicaid',      key: 'GA_MEDICAID' },
  { label: 'BCBS GA',          key: 'BCBS_GA' },
  { label: 'UnitedHealthcare', key: 'UHC' },
  { label: 'PR-170',           key: 'PR-170' },
  { label: 'CO-B11',           key: 'CO-B11' },
  { label: 'PI-15',            key: 'PI-15' },
  { label: 'Paid only',        key: 'PAID' },
];

const PAYER_IDS = ['TRICARE_SE','GA_MEDICAID','BCBS_GA','UHC','AETNA','CIGNA','MEDICARE'];
const CARCS     = ['PR-170','CO-B11','PI-15','PI-16','CO-97','PR-242'];

function applyFilter(data, key) {
  if (key === 'ALL')            return data;
  if (key === 'DENIED')         return data.filter(c => c.status === 'DENIED');
  if (key === 'PAID')           return data.filter(c => c.status === 'PAID');
  if (PAYER_IDS.includes(key))  return data.filter(c => c.payer_id === key);
  if (CARCS.includes(key))      return data.filter(c => c.carc === key);
  return data;
}

export default function ClaimsLog() {
  const [active, setActive] = useState('ALL');
  const visible = applyFilter(ALL_CLAIMS, active);

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            style={{
              padding: '5px 13px', fontSize: 12, fontWeight: 500,
              border: '1px solid', borderRadius: 20,
              borderColor: active === f.key ? '#1a1a1a' : '#ddd',
              background: active === f.key ? '#1a1a1a' : '#fff',
              color: active === f.key ? '#fff' : '#555',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden', maxHeight: 520, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <Th>Claim ID</Th><Th>DOS</Th><Th>Provider</Th><Th>Specialty</Th>
              <Th>Payer</Th><Th>CPT</Th><Th>Billed</Th><Th>Paid</Th>
              <Th>Status</Th><Th>CARC</Th><Th>Root cause</Th>
            </tr>
          </thead>
          <tbody>
            {visible.map(c => (
              <tr key={c.claim_id} style={{ background: c.status === 'DENIED' ? 'rgba(192,57,43,0.03)' : '#fff' }}>
                <Td style={{ fontFamily: 'monospace', fontSize: 11, color: '#aaa' }}>{c.claim_id}</Td>
                <Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{c.dos}</Td>
                <Td style={{ fontWeight: 600 }}>{c.provider}</Td>
                <Td style={{ color: '#888' }}>{c.specialty}</Td>
                <Td style={{ fontSize: 12 }}>{c.payer}</Td>
                <Td style={{ fontFamily: 'monospace' }}>{c.cpt}</Td>
                <Td style={{ fontFamily: 'monospace' }}>${c.billed}</Td>
                <Td>
                  {c.status === 'PAID'
                    ? <span style={{ color: '#27ae60', fontFamily: 'monospace' }}>${c.paid.toFixed(0)}</span>
                    : <span style={{ color: '#ccc' }}>—</span>}
                </Td>
                <Td><Tag color={c.status === 'DENIED' ? 'red' : 'green'}>{c.status === 'DENIED' ? 'Denied' : 'Paid'}</Tag></Td>
                <Td>
                  {c.carc
                    ? <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#d4700a' }}>{c.carc}</span>
                    : <span style={{ color: '#ccc' }}>—</span>}
                </Td>
                <Td style={{ fontSize: 11, color: '#888', maxWidth: 200 }} title={c.root || ''}>
                  {c.root ? c.root.substring(0, 44) + (c.root.length > 44 ? '…' : '') : '—'}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 12, color: '#aaa', marginTop: 12, lineHeight: 1.5, padding: '10px 14px', background: '#fafafa', borderRadius: 6, border: '1px solid #ebebeb' }}>
        <strong style={{ color: '#888' }}>Note:</strong> This dataset is entirely synthetic, generated to demonstrate RCM analysis methodology. Provider NPIs, patient IDs, and claim numbers are fictional. Denial patterns and dollar amounts reflect realistic multi-specialty behavioral health billing scenarios.
      </p>
    </div>
  );
}
