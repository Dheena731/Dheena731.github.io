/** Infinite marquee strip. `items` is duplicated to make the loop seamless. */
export default function Ticker({ items, background = 'var(--ink)', color = 'var(--paper)', reverse = false }) {
  const row = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y-[3px] py-2.5 select-none"
      style={{ background, color }}
    >
      <div className="marquee-track" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {row.map((item, i) => (
          <span key={i} className="label flex shrink-0 items-center gap-6 px-6 text-[13px]">
            {item}
            <span aria-hidden style={{ color: 'var(--orange)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
