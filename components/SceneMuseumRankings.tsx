"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const results = [
  { rank: 1, name: "Organic Traffic Growth", value: "+312%", bar: 0.98 },
  { rank: 2, name: "Keywords Ranked", value: "18K+", bar: 0.94 },
  { rank: 3, name: "Average Ranking Improvement", value: "Top 3 Positions", bar: 0.90 },
  { rank: 4, name: "Organic Lead Growth", value: "+247%", bar: 0.86 },
  { rank: 5, name: "Search Visibility Increase", value: "+428%", bar: 0.80 },
  { rank: 6, name: "Organic Impressions Generated", value: "2.8M+", bar: 0.74 },
  { rank: 7, name: "Click-Through Rate Boost", value: "+94%", bar: 0.68 },
  { rank: 8, name: "Domain Authority Growth", value: "+31 DA", bar: 0.62 },
  { rank: 9, name: "Engagement Increase", value: "+189%", bar: 0.55 },
  { rank: 10, name: "SEO Conversion Growth", value: "+221%", bar: 0.49 },
];

const RANGE_START = 0.72;
const RANGE_END = 0.87;

function ResultRow({
  result,
  index,
  scrollYProgress,
}: {
  result: { rank: number; name: string; value: string; bar: number };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = RANGE_START + 0.02 + index * 0.012;
  const tBar = RANGE_START + 0.03 + index * 0.012;

  const opacity = useTransform(scrollYProgress, [t, t + 0.015], [0, 1]);
  const x = useTransform(scrollYProgress, [t, t + 0.015], [40, 0]);
  const barWidth = useTransform(
    scrollYProgress,
    [tBar, tBar + 0.03],
    [0, result.bar * 100]
  );

  return (
    <motion.div
      className="flex items-center gap-4"
      style={{ opacity, x }}
    >
      {/* Rank */}
      <span
        className="font-space-mono text-[#C9A84C] font-bold shrink-0 text-right"
        style={{
          fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
          width: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {result.rank}
      </span>

      {/* Name */}
      <div className="shrink-0" style={{ width: "clamp(200px, 34vw, 340px)" }}>
        <p
          className="font-cormorant text-[#ffffff] leading-none"
          style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
        >
          {result.name}
        </p>
      </div>

      {/* Animated bar */}
      <div className="flex-1 relative" style={{ height: "2px", background: "#4a0012" }}>
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#C9A84C]"
          style={{
            width: useTransform(barWidth, (v) => `${v}%`),
            boxShadow: "0 0 8px rgba(201,168,76,0.6)",
          }}
        />
      </div>

      {/* Value at end */}
      <span
        className="font-space-mono text-[#C9A84C] shrink-0 text-right"
        style={{ fontSize: "clamp(0.65rem, 1vw, 0.85rem)", minWidth: "80px" }}
      >
        {result.value}
      </span>
    </motion.div>
  );
}

export default function SceneMuseumRankings({ scrollYProgress }: Props) {
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
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="SEO Performance Results"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl px-[8vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#C9A84C] tracking-widest uppercase mb-8"
          style={{ opacity: headerOpacity, fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}
        >
          SEO Performance Results
        </motion.p>

        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <ResultRow
              key={i}
              result={r}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
