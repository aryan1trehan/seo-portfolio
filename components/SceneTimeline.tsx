"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const nodes = [
  { label: "Search Presence" },
  { label: "Keyword Research" },
  { label: "Brand Audit" },
  { label: "Competitor Analysis" },
  { label: "Webflow Structure" },
  { label: "On-Page SEO" },
  { label: "Off-Page SEO" },
  { label: "Organic Search Improve" },
  { label: "Technical SEO" },
  { label: "Content Positioning" },
  { label: "Growth Tracking" },
];

const RANGE_START = 0.28;
const RANGE_END = 0.43;
const SVG_WIDTH = 1100;
const AMPLITUDE = 38;
const WAVE_PERIODS = 2.5;

function getWavePath() {
  const points = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * SVG_WIDTH;
    const y = 60 + AMPLITUDE * Math.sin((i / 200) * Math.PI * 2 * WAVE_PERIODS);
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

function getNodeY(index: number) {
  const x = (index / (nodes.length - 1)) * SVG_WIDTH;
  return 60 + AMPLITUDE * Math.sin((index / (nodes.length - 1)) * Math.PI * 2 * WAVE_PERIODS);
}

function TimelineNode({
  node,
  index,
  scrollYProgress,
}: {
  node: { label: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = RANGE_START + 0.04 + index * 0.032;
  const opacity = useTransform(scrollYProgress, [t, t + 0.02], [0, 1]);
  const yAnim = useTransform(scrollYProgress, [t, t + 0.02], [15, 0]);
  const nodeY = getNodeY(index);
  const isAbove = nodeY < 60;

  return (
    <motion.div
      className="flex flex-col items-center absolute"
      style={{
        opacity,
        y: yAnim,
        left: `${(index / (nodes.length - 1)) * 100}%`,
        transform: "translateX(-50%)",
        top: isAbove ? `${nodeY - 60 + 10}px` : `${nodeY - 60 + 80}px`,
        width: "90px",
      }}
    >
      <p
        className="font-space-mono text-[#ffffff] text-center leading-tight"
        style={{ fontSize: "clamp(0.5rem, 0.75vw, 0.65rem)" }}
      >
        {node.label}
      </p>
    </motion.div>
  );
}

const WAVE_PATH = getWavePath();
const PATH_LENGTH_APPROX = 1200;

export default function SceneTimeline({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const lineProgress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.02, RANGE_END - 0.04],
    [0, 1]
  );

  const dashOffset = useTransform(lineProgress, [0, 1], [PATH_LENGTH_APPROX, 0]);

  const headerOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Timeline"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full px-[4vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#ffffff] text-xs tracking-widest uppercase mb-16 text-center"
          style={{ opacity: headerOpacity }}
        >
          SEO Foundation
        </motion.p>

        <div className="relative" style={{ height: "220px" }}>
          <svg
            viewBox={`0 0 ${SVG_WIDTH} 120`}
            className="w-full overflow-visible"
            style={{ height: "120px" }}
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track wave */}
            <path d={WAVE_PATH} fill="none" stroke="#4a0012" strokeWidth="2" />

            {/* Animated wave line */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
              strokeDasharray={PATH_LENGTH_APPROX}
              style={{ strokeDashoffset: dashOffset }}
              filter="url(#glow)"
            />

            {/* Node dots on wave */}
            {nodes.map((_, i) => {
              const x = (i / (nodes.length - 1)) * SVG_WIDTH;
              const y = getNodeY(i);
              const t = RANGE_START + 0.04 + i * 0.032;
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={6}
                  fill="#C9A84C"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  style={{
                    opacity: useTransform(scrollYProgress, [t, t + 0.02], [0, 1]),
                  }}
                />
              );
            })}
          </svg>

          {/* Labels below/above nodes */}
          <div className="absolute inset-0" style={{ top: "120px" }}>
            {nodes.map((node, i) => (
              <TimelineNode
                key={i}
                node={node}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
