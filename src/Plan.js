import React from 'react';
import { SectionTitle, Callout, StageBox, PhaseTitle, PlanItem } from './ui';

const stageGrid = {
  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
  gap: 1, background: '#e5e5e5', border: '1px solid #e5e5e5',
  borderRadius: 8, overflow: 'hidden', marginBottom: 32,
};

const PHASES = [
  {
    title: 'Days 1–14 · Stop the bleeding',
    items: [
      { num: '01', tag: 'Immediate', tagColor: 'red',
        title: 'Halt all TRICARE submissions for uncredentialed providers',
        desc: 'Immediately cease claim submission for Dr. Osei, Dr. Webb, and Carmen Ruiz against TRICARE Southeast. Hold Tyrone Banks claims until in-process application confirms active status. Every claim submitted against a PR-170 block is unrecoverable until credentialing resolves.' },
      { num: '02', tag: 'Immediate', tagColor: 'red',
        title: 'Initiate batch TRICARE credentialing for all affected providers simultaneously',
        desc: "Batch credentialing is more efficient than sequential — all providers clear around the same time. TRICARE's one-year timely filing limit provides the runway to credential correctly and file retroactive appeals with approval documentation once confirmed." },
      { num: '03', tag: 'Immediate', tagColor: 'red',
        title: 'Stop GA Medicaid billing under Lena Hargrove, LCSW · Submit enrollment application',
        desc: 'Cease all Medicaid billing under NPI 1234567892 until enrollment confirms. GA Medicaid enrollment typically takes 60–90 days — initiating now minimizes the gap window.' },
    ],
  },
  {
    title: 'Days 1–30 · Close ERA & configuration gaps',
    items: [
      { num: '04', tag: 'Week 1–2', tagColor: 'amber',
        title: 'Full EDI audit — every active provider × payer combination',
        desc: 'Audit all active payer relationships for complete EDI setup: electronic claim submission, ERA enrollment, and electronic remittance posting confirmed and tested. No new payer onboarding proceeds without full EDI confirmed.' },
      { num: '05', tag: 'Week 2–3', tagColor: 'amber',
        title: 'Configure pre-submission claim QA rules',
        desc: 'Build rules that block: (a) ABA CPTs from submitting to Medicare, (b) claim submission for any provider whose credentialing status is not confirmed active, (c) submission for any payer without confirmed ERA enrollment.' },
      { num: '06', tag: 'Week 3–4', tagColor: 'amber',
        title: 'Establish auth SLA with vendor · Configure EHR scheduling gate',
        desc: 'Hold auth vendor to strict TAT SLA with live payer calls required for all requests. Configure the EHR so no session can be confirmed without a valid authorization on file for auth-required payers.' },
      { num: '07', tag: 'Week 3–4', tagColor: 'amber',
        title: 'Monthly Medicaid eligibility re-verification workflow',
        desc: 'Implement monthly re-verification for all active Medicaid patients. Flag any patient with uncertain eligibility status before confirming their next appointment.' },
    ],
  },
  {
    title: 'Days 30–90 · Monitor, recover & scale',
    items: [
      { num: '08', tag: 'Day 30–45', tagColor: 'green',
        title: 'Activate real-time denial monitoring dashboard',
        desc: 'Key metrics tracked daily: clean claim rate (target 95%+), denial rate by payer, days to payment, Medicaid eligibility verification rate (target 100%). Escalation alert: when 3+ claims from the same provider × payer deny with the same CARC within 30 days, auto-escalate.' },
      { num: '09', tag: 'Day 45–90', tagColor: 'green',
        title: 'File retroactive appeals for credentialing and ERA denials',
        desc: "Once TRICARE credentialing confirms and ERA enrollment activates, file retroactive appeals on all held claims with approval documentation. TRICARE's one-year TFL window provides the runway. Prioritize by dollar value." },
      { num: '10', tag: 'Day 60–90', tagColor: 'green',
        title: 'Initiate Aetna network contracting for Dev Patel, LPC',
        desc: 'Two PR-242 OON denials are modest now but will scale. Initiate Aetna network application and evaluate whether a medical necessity network exception can be filed for existing denied claims.' },
    ],
  },
];

export default function Plan() {
  return (
    <div>
      <div style={stageGrid}>
        <StageBox phase="Days 1–30"  title="Stop & audit"      titleColor="#2563eb"
          desc="Halt bad submissions · Batch credentialing initiated · Full EDI audit · Auth vendor SLA established" />
        <StageBox phase="Days 30–60" title="Configure & gate"  titleColor="#d4700a"
          desc="Close ERA gaps · Pre-submission QA rules · Auth scheduling gate · Eligibility re-verification workflow" />
        <StageBox phase="Days 60–90" title="Monitor & recover" titleColor="#27ae60"
          desc="Dashboards live · Retroactive appeals filed · Denial escalation alerts · Aetna contracting initiated" />
      </div>

      {PHASES.map(phase => (
        <div key={phase.title} style={{ marginBottom: 28 }}>
          <PhaseTitle>{phase.title}</PhaseTitle>
          <div style={{ borderTop: '1px solid #f4f4f4' }}>
            {phase.items.map(item => <PlanItem key={item.num} {...item} />)}
          </div>
        </div>
      ))}

      <Callout title="What success looks like at Day 90">
        Zero new TRICARE PR-170 denials for batch-credentialed providers. Zero CO-B11 ERA denials —
        all payers fully enrolled. GA Medicaid enrollment application submitted for Lena Hargrove,
        LCSW. ABA-to-Medicare billing error eliminated by pre-submission rule. Clean claim rate
        trending toward 90%+. Denial dashboard live with real-time monitoring.{' '}
        <strong>What is not promised in 90 days:</strong> a 95% clean claim rate from day one —
        systemic issues take time to fully resolve. What is committed: a system measurably better
        at Day 90 than Day 1.
      </Callout>
    </div>
  );
}
