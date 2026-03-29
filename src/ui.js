import React from 'react';

export function Tag({ children, color = 'grey' }) {
  const styles = {
    red:   { background: '#fce8e6', color: '#c0392b' },
    amber: { background: '#fef3e2', color: '#b45309' },
    green: { background: '#e6f4ea', color: '#27ae60' },
    grey:  { background: '#f0f0f0', color: '#777' },
    blue:  { background: '#e8f0fe', color: '#2563eb' },
  };
  return (
    <span style={{ display: 'inline-block', fontSize: 11, padding: '2px 8px', borderRadius: 3, fontWeight: 500, ...styles[color] }}>
      {children}
    </span>
  );
}

export function Dot({ color = 'grey' }) {
  const colors = { red: '#c0392b', amber: '#d4700a', green: '#27ae60', grey: '#ccc' };
  return (
    <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: colors[color], marginRight: 6, verticalAlign: 'middle' }} />
  );
}

export function SectionTitle({ children, style }) {
  return (
    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20, color: '#1a1a1a', ...style }}>
      {children}
    </div>
  );
}

export function Callout({ title, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '20px 24px', marginBottom: 28 }}>
      {title && <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{title}</div>}
      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

export function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #ebebeb', margin: '28px 0' }} />;
}

export function TableWrap({ children, style }) {
  return (
    <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden', marginBottom: 24, ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        {children}
      </table>
    </div>
  );
}

export function Th({ children, style }) {
  return (
    <th style={{ fontSize: 11, fontWeight: 500, color: '#aaa', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ebebeb', textTransform: 'uppercase', letterSpacing: '0.06em', background: '#fafafa', ...style }}>
      {children}
    </th>
  );
}

export function Td({ children, style }) {
  return (
    <td style={{ padding: '11px 12px', borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle', color: '#333', ...style }}>
      {children}
    </td>
  );
}

export function BarItem({ name, carc, dollars, total, color, note }) {
  const pct = Math.round((dollars / total) * 100);
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>
          {name}{' '}
          {carc && <span style={{ fontWeight: 400, color: '#aaa', fontSize: 13 }}>({carc})</span>}
        </div>
        <div style={{ fontSize: 13, color: '#555', fontWeight: 500, paddingLeft: 16, whiteSpace: 'nowrap' }}>
          ${dollars.toLocaleString()} · {pct}%
        </div>
      </div>
      <div style={{ height: 5, background: '#efefef', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3 }} />
      </div>
      {note && <div style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{note}</div>}
    </div>
  );
}

export function MiniBar({ label, value, maxValue, color, rightLabel }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ fontSize: 13 }}>{label}</div>
        <div style={{ fontSize: 13, color, fontWeight: 500 }}>{rightLabel}</div>
      </div>
      <div style={{ height: 5, background: '#efefef', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(value / maxValue) * 100}%`, background: color, borderRadius: 3 }} />
      </div>
    </div>
  );
}

export function StageBox({ phase, title, titleColor, amount, desc }) {
  return (
    <div style={{ background: '#fff', padding: '20px 22px' }}>
      <div style={{ fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 500 }}>{phase}</div>
      <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4, color: titleColor }}>{title}</div>
      {amount && <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>{amount}</div>}
      <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5, borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>{desc}</div>
    </div>
  );
}

export function DenialCard({ severity, code, rarc, title, desc, stats }) {
  const borderColor = severity === 'existential' ? '#c0392b' : severity === 'monitor' ? '#d4700a' : '#e0e0e0';
  const tagColor    = severity === 'existential' ? 'red'     : severity === 'monitor' ? 'amber'   : 'grey';
  const tagLabel    = severity === 'existential' ? 'Existential' : severity === 'monitor' ? 'Monitor' : 'Low priority';
  return (
    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderLeft: `3px solid ${borderColor}`, borderRadius: 8, padding: '20px 22px', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#aaa', letterSpacing: '0.04em', marginBottom: 2 }}>
            {code}{rarc ? ` · RARC ${rarc}` : ''}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        </div>
        <Tag color={tagColor}>{tagLabel}</Tag>
      </div>
      <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65, margin: '8px 0 14px' }}>{desc}</p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: s.color || '#333' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhaseTitle({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>
      {children}
    </div>
  );
}

export function PlanItem({ num, title, desc, tag, tagColor }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #f4f4f4' }}>
      <div style={{ fontSize: 11, color: '#ccc', fontWeight: 500, minWidth: 22, paddingTop: 1 }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.55 }}>{desc}</div>
      </div>
      <div style={{ whiteSpace: 'nowrap', paddingTop: 1 }}>
        <Tag color={tagColor}>{tag}</Tag>
      </div>
    </div>
  );
}
