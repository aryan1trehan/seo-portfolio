"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function SceneArtistConnection({ scrollYProgress }: Props) {
  const RANGE_START = 0.43;
  const RANGE_END = 0.58;

  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const pairProgress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.02, RANGE_START + 0.10],
    [0, 1]
  );

  const leftX = useTransform(pairProgress, [0, 1], [-260, 0]);
  const rightX = useTransform(pairProgress, [0, 1], [260, 0]);
  const cardOpacity = useTransform(pairProgress, [0, 0.4], [0, 1]);
  const arcOpacity = useTransform(pairProgress, [0.7, 1], [0, 1]);
  const seoOpacity = useTransform(pairProgress, [0.85, 1], [0, 1]);

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Artist Connection"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div className="relative z-10 w-full" style={{ opacity: sceneOpacity }}>
        <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto px-[8vw]">
          
          {/* AEO card */}
          <motion.div
            className="flex-1 text-right pr-12"
            style={{ x: leftX, opacity: cardOpacity }}
          >
            <ArtistCard name="AEO" role="Search Optimization" />
          </motion.div>

          {/* Arc + SEO label */}
          <div className="relative shrink-0" style={{ width: "200px" }}>
            <motion.svg
              viewBox="0 0 200 160"
              className="w-full overflow-visible"
              style={{ opacity: arcOpacity }}
            >
              <defs>
                <filter id="arcGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Top arc */}
              <motion.path
                d="M 20 80 Q 100 10 180 80"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                filter="url(#arcGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              />
              {/* Bottom arc */}
              <motion.path
                d="M 20 80 Q 100 150 180 80"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                filter="url(#arcGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              />
              {/* End dots */}
              <circle cx="20" cy="80" r="4" fill="#C9A84C" filter="url(#arcGlow)" />
              <circle cx="180" cy="80" r="4" fill="#C9A84C" filter="url(#arcGlow)" />
            </motion.svg>

            {/* SEO label in centre of oval */}
            <motion.p
              className="absolute font-cormorant font-semibold text-[#C9A84C] text-center"
              style={{
                opacity: seoOpacity,
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              SEO
            </motion.p>
          </div>

          {/* GEO card */}
          <motion.div
            className="flex-1 pl-12"
            style={{ x: rightX, opacity: cardOpacity }}
          >
            <ArtistCard name="GEO" role="Generative Engine Optimization" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ArtistCard({ name, role }: { name: string; role: string }) {
  return (
    <div>
      <div
        className="inline-block border border-[#C9A84C44] px-8 py-6"
        style={{
          background: "rgba(0,0,0,0.25)",
          boxShadow: "0 0 60px rgba(0,0,0,0.50)",
        }}
      >
        <p
          className="font-cormorant italic text-[#ffffff] leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {name}
        </p>
        <p className="font-space-mono text-[#C9A84C] text-xs tracking-widest uppercase mt-2">
          {role}
        </p>
      </div>
    </div>
  );
}
