"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const metrics = [
  { name: "Organic Traffic", role: "Search-driven visitor growth" },
  { name: "Keyword Rankings", role: "Position movement across target keywords" },
  { name: "Click-Through Rate", role: "Search impression to click ratio" },
  { name: "Domain Authority", role: "Overall website trust & strength" },
  { name: "Organic Leads", role: "Inbound conversions from search" },
  { name: "Search Visibility", role: "Brand discoverability across SERPs" },
  { name: "Session Duration", role: "User engagement & retention" },
  { name: "Competitor Gap Analysis", role: "Visibility advantage over competitors" },
  { name: "Indexed Pages", role: "Search engine crawl performance" },
  { name: "Conversion Rate", role: "SEO-to-revenue performance" },
];

const RANGE_START = 0.58;
const RANGE_END = 0.72;

function MetricCard({
  metric,
  index,
  scrollYProgress,
}: {
  metric: { name: string; role: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const delay = index * 0.055;
  const cardsProgress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.01, RANGE_START + 0.08],
    [0, 1]
  );

  const cardOpacity = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [0, 1]
  );
  const cardY = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [30, 0]
  );
  const cardScale = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [0.85, 1]
  );

  return (
    <motion.div style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}>
      <div
        className="border border-[#C9A84C33] p-6 h-full"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #000000 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.1)",
          minHeight: "100px",
        }}
      >
        <p
          className="font-cormorant text-[#ffffff] leading-tight"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)" }}
        >
          {metric.name}
        </p>
        <p
          className="font-space-mono text-[#C9A84C] mt-2"
          style={{ fontSize: "clamp(0.5rem, 0.75vw, 0.65rem)" }}
        >
          {metric.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function SceneCollectors({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const headerOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex flex-col items-center justify-center"
      aria-label="SEO Report Metrics"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl px-[6vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#C9A84C] tracking-widest uppercase mb-14 text-center"
          style={{
            opacity: headerOpacity,
            fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
            letterSpacing: "0.25em",
          }}
        >
          SEO Report Metrics
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {metrics.map((m, i) => (
            <MetricCard
              key={i}
              metric={m}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
