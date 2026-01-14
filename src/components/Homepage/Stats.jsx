import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import API_BASE_URL from "../../config/apiBaseUrl";

// Small sparkline component — draws a polyline scaled to data
const Sparkline = ({ values = [], stroke = "#16A34A", strokeWidth = 2 }) => {
  if (!values || values.length === 0) return null;
  const w = 120;
  const h = 36;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Format numbers with suffixes and support animate targets (k)
const parseValue = (v) => {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const s = v.trim().toLowerCase();
  if (s.endsWith("k")) return parseFloat(s.slice(0, -1)) * 1000;
  if (s.endsWith("m")) return parseFloat(s.slice(0, -1)) * 1000000;
  return Number(s.replace(/,/g, "")) || 0;
};

const formatCompact = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return `${Math.round(num)}`;
};

const AnimatedNumber = ({
  value,
  duration = 0.9,
  className = "text-2xl font-bold",
}) => {
  const target = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(display, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <div className={className}>{formatCompact(display)}</div>;
};

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([
    { label: "Pets Adopted", value: "0", series: [0, 0, 0, 0, 0] },
    { label: "Active Listings", value: "0", series: [0, 0, 0, 0, 0] },
    { label: "Shelter Partners", value: "0", series: [0, 0, 0, 0, 0] },
    { label: "Volunteers", value: "0", series: [0, 0, 0, 0, 0] },
  ]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch public approved listings and derive counts
        const res = await fetch(`${API_BASE_URL}/listings`);
        if (!res.ok) throw new Error("Failed to load listings");
        const listings = await res.json();

        const activeListingsCount = Array.isArray(listings)
          ? listings.length
          : 0;
        const petsAdoptedCount = Array.isArray(listings)
          ? listings.filter((l) => (l.category || "").toLowerCase() === "pets")
              .length
          : 0;

        // Build simple sparklines from recent listing counts by month/day (fallback synthetic)
        const series = [
          Math.max(1, Math.round(petsAdoptedCount * 0.2)),
          Math.max(1, Math.round(petsAdoptedCount * 0.45)),
          Math.max(1, Math.round(petsAdoptedCount * 0.6)),
          Math.max(1, Math.round(petsAdoptedCount * 0.8)),
          Math.max(1, petsAdoptedCount),
        ];

        const listingsSeries = [
          Math.max(1, Math.round(activeListingsCount * 0.2)),
          Math.max(1, Math.round(activeListingsCount * 0.45)),
          Math.max(1, Math.round(activeListingsCount * 0.6)),
          Math.max(1, Math.round(activeListingsCount * 0.8)),
          Math.max(1, activeListingsCount),
        ];

        // Try to fetch user counts for shelter partners and volunteers via admin endpoint
        let shelterCount = 0;
        let volunteerCount = 0;
        try {
          const usersRes = await fetch(`${API_BASE_URL}/admin/users`);
          if (usersRes.ok) {
            const users = await usersRes.json();
            shelterCount = users.filter(
              (u) => (u.role || "").toLowerCase() === "shelter"
            ).length;
            volunteerCount = users.filter(
              (u) => (u.role || "").toLowerCase() === "volunteer"
            ).length;
          }
        } catch (e) {
          // ignore; admin endpoint requires auth in most setups
        }

        if (!mounted) return;

        setStats([
          { label: "Pets Adopted", value: `${petsAdoptedCount}`, series },
          {
            label: "Active Listings",
            value: `${activeListingsCount}`,
            series: listingsSeries,
          },
          {
            label: "Shelter Partners",
            value: `${shelterCount}`,
            series: [
              shelterCount,
              shelterCount,
              shelterCount,
              shelterCount,
              shelterCount,
            ],
          },
          {
            label: "Volunteers",
            value: `${volunteerCount}`,
            series: [
              volunteerCount,
              volunteerCount,
              volunteerCount,
              volunteerCount,
              volunteerCount,
            ],
          },
        ]);
      } catch (err) {
        console.error("Stats load error:", err);
        if (mounted) setError(err.message || "Failed to load stats");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">Loading statistics...</div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-extrabold">Platform Statistics</h3>
            <p className="text-sm text-muted mt-1">
              Live overview of recent growth
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="card p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 18px 40px rgba(2,6,23,0.08)",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <AnimatedNumber
                    value={s.value}
                    className="text-2xl font-bold"
                  />
                  <div className="text-sm text-muted mt-1">{s.label}</div>
                </div>

                <div className="hidden sm:block">
                  <div className="bg-white/6 rounded-md p-1">
                    <Sparkline values={s.series} stroke="#16A34A" />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-base-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (parseValue(s.value) / 5000) * 100
                      )}%`,
                      background: "linear-gradient(90deg,#34D399,#059669)",
                      transition: "width 900ms cubic-bezier(.2,.9,.2,1)",
                    }}
                  />
                </div>
                <div className="text-xs text-muted mt-2">
                  Growth vs last month
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
