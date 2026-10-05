import { STATS, TICKER } from "@/lib/site";
import { CountUp } from "./CountUp";

export function Stats() {
  return (
    <div className="stats-wrap">
      <div className="stats rv">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="n disp">
              <CountUp to={s.n} />
              <span className="ital">{s.suffix}</span>
            </div>
            <div className="l">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Ticker() {
  const items = TICKER.concat(TICKER);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">
        {items.map((t, i) => (
          <span className="item" key={i}>
            {t}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
