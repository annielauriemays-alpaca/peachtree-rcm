import React from 'react';
import { DenialCard, Divider, SectionTitle } from './ui';

export default function DenialBreakdown() {
  return (
    <div>
      <SectionTitle style={{ marginBottom: 6 }}>Existential — stop everything</SectionTitle>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>Denial patterns that require immediate action before any new claims are submitted.</p>

      <DenialCard severity="existential" code="PR-170" rarc="N104"
        title="TRICARE Southeast — Credentialing gap (Psychiatry & ABA)"
        desc="Three providers (Dr. Renata Osei, Dr. Marcus Webb, Carmen Ruiz BCBA) were submitted to TRICARE Southeast before their credentialing was complete. Every claim for these providers against TRICARE is returning PR-170. Tyrone Banks BCBA is in-process, adding to the block. TRICARE's one-year timely filing limit provides the runway to credential correctly and appeal retroactively. No new TRICARE claims should be submitted for these NPIs until credentialing is active."
        stats={[
          { label: 'Claims denied',       value: '19' },
          { label: 'Revenue at risk',     value: '$1,905', color: '#c0392b' },
          { label: 'TRICARE denial rate', value: '~53%' },
          { label: 'Providers affected',  value: '4 NPIs' },
          { label: 'Recoverable?',        value: 'Yes — after credentialing', color: '#27ae60' },
        ]}
      />

      <DenialCard severity="existential" code="CO-B11" rarc="N382"
        title="ERA enrollment missing — BCBS of Georgia & UnitedHealthcare"
        desc="Dr. Renata Osei has no ERA enrollment active with BCBS of Georgia — $1,240 across six denied claims. Dev Patel, LPC has the same gap with UnitedHealthcare — $1,980 across nine denied claims. ERA enrollment must be confirmed before the first claim is submitted to any payer. These claims stall in adjudication and appear as denials from an AR perspective. The fix is configuration, not appeals."
        stats={[
          { label: 'Claims affected', value: '18' },
          { label: 'Revenue at risk', value: '$3,220', color: '#c0392b' },
          { label: 'Payers',          value: 'BCBS GA · UHC' },
          { label: 'Fix',             value: 'Full EDI audit · ERA activation' },
          { label: 'Recoverable?',    value: 'Yes — resubmit after enrollment', color: '#27ae60' },
        ]}
      />

      <DenialCard severity="existential" code="PR-170" rarc="N104"
        title="Georgia Medicaid — Lena Hargrove, LCSW not enrolled"
        desc="Lena Hargrove, LCSW is not enrolled in the Georgia Medicaid (DCH) provider directory. Every therapy claim submitted for Medicaid patients under her NPI is denied PR-170. Eleven claims totaling $1,610 at risk. Georgia Medicaid enrollment takes 60–90 days — initiate immediately and stop Medicaid billing under this NPI until enrollment confirms."
        stats={[
          { label: 'Claims denied',  value: '11' },
          { label: 'Revenue at risk',value: '$1,610', color: '#c0392b' },
          { label: 'Payer',          value: 'Georgia Medicaid (DCH)' },
          { label: 'Recoverable?',   value: 'Yes — retroactive appeal after enrollment', color: '#27ae60' },
        ]}
      />

      <Divider />
      <SectionTitle style={{ marginBottom: 6 }}>Monitor — manage and contain</SectionTitle>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>Patterns actively generating denials but not yet at the scale of the credentialing cluster.</p>

      <DenialCard severity="monitor" code="PI-15" rarc="N56"
        title="Authorization required but not obtained"
        desc="15 claims across multiple providers returned PI-15 — services were rendered without a valid prior authorization on file. GA Medicaid, UHC, and Cigna all require prior auth for ABA codes (97151, 97153, 97155) and psychiatric evals (90792). The scheduling workflow does not enforce an authorization gate before confirming patient sessions. Retroactive auth is rarely approved — the priority is a process gate that prevents future occurrence."
        stats={[
          { label: 'Claims denied',  value: '15' },
          { label: 'Revenue at risk',value: '$1,810', color: '#d4700a' },
          { label: 'Payers',         value: 'GA Medicaid · UHC · Cigna · Aetna' },
          { label: 'Fix',            value: 'Scheduling auth gate · Auth vendor SLA' },
          { label: 'Recoverable?',   value: 'Low — retroactive auth rarely approved', color: '#c0392b' },
        ]}
      />

      <DenialCard severity="monitor" code="PI-16" rarc="N382"
        title="Medicaid eligibility lapses — coverage not re-verified"
        desc="Four claims are returning PI-16 (patient not eligible on date of service) across Georgia Medicaid. Medicaid coverage lapses frequently during annual redetermination periods. Eligibility is being checked at intake but not re-verified monthly for ongoing patients, resulting in services billed against lapsed coverage."
        stats={[
          { label: 'Claims denied',  value: '4' },
          { label: 'Revenue at risk',value: '$755', color: '#d4700a' },
          { label: 'Fix',            value: 'Monthly Medicaid re-verification' },
        ]}
      />

      <Divider />
      <SectionTitle style={{ marginBottom: 6 }}>Noise — address, don't prioritize</SectionTitle>

      <DenialCard severity="noise" code="CO-97" rarc="N95"
        title="ABA claims submitted to Medicare Part B"
        desc="Three claims for ABA services were submitted to Medicare Part B. ABA is not a covered Medicare benefit — no appeal pathway exists. Fix: add a pre-submission rule blocking ABA CPT codes from submitting to Medicare."
        stats={[
          { label: 'Claims',      value: '3' },
          { label: 'At risk',     value: '$255', color: '#888' },
          { label: 'Recoverable?',value: 'No', color: '#c0392b' },
        ]}
      />

      <DenialCard severity="noise" code="PR-242" rarc="MA67"
        title="Out-of-network — Aetna (Dev Patel, LPC)"
        desc="Two claims for Dev Patel, LPC are returning PR-242 from Aetna. Provider is not in-network. Modest impact now, will scale with volume. Resolve by initiating Aetna network contracting application."
        stats={[
          { label: 'Claims',  value: '2' },
          { label: 'At risk', value: '$340', color: '#888' },
          { label: 'Fix',     value: 'Aetna network application' },
        ]}
      />
    </div>
  );
}
