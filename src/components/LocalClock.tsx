"use client";

import { useEffect, useState } from "react";

/** Live clock in the Owner's time zone. Renders a placeholder until mounted to avoid hydration mismatch. */
export function LocalClock({ timeZone, locale }: { timeZone: string; locale: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start ticking only on the client
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const text = now
    ? new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(now)
    : "--:--";

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {text}
    </time>
  );
}
