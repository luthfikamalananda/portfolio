import type { CSSProperties } from "react";

// Torn ends: a straight top/bottom edge with jagged left and right ends.
const TORN =
  "polygon(0% 12%, 4% 0%, 96% 0%, 100% 14%, 96% 30%, 100% 48%, 96% 66%, 100% 84%, 96% 100%, 4% 100%, 0% 86%, 4% 70%, 0% 52%, 4% 34%)";

/**
 * A strip of masking tape that "sticks" a desk object to the wall. Its colour comes from
 * --tape (globals.css) so it reads on both the dark and the light background.
 * The shadow sits on the wrapper because clip-path would cut it off the strip itself.
 */
export function Tape({ className = "", rotate = -4, style }: { className?: string; rotate?: number; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 block h-[22px] w-[84px] [filter:drop-shadow(0_1px_1.5px_rgb(0_0_0/0.35))] ${className}`}
      style={{ rotate: `${rotate}deg`, ...style }}
    >
      <span
        className="block size-full"
        style={{
          clipPath: TORN,
          background:
            "linear-gradient(180deg, rgb(255 255 255 / 0.22), transparent 40%, rgb(0 0 0 / 0.06)), repeating-linear-gradient(90deg, rgb(110 90 50 / 0.1) 0 1px, transparent 1px 5px), var(--tape)",
        }}
      />
    </span>
  );
}
