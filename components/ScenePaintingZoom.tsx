"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const RANGE_START = 0.13;
const RANGE_END = 0.28;

export default function ScenePaintingZoom({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const paintingScale = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_END],
    [1, 3]
  );

  const paintingOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.03, RANGE_END],
    [0, 1, 1, 0]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [RANGE_START + 0.03, RANGE_START + 0.07],
    [0, 1]
  );

  const titleX = useTransform(
    scrollYProgress,
    [RANGE_START + 0.03, RANGE_START + 0.07],
    [40, 0]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Painting Zoom"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      {/* Right text */}
      <motion.div
        className="absolute right-[8vw] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 max-w-xs text-right"
        style={{ opacity: titleOpacity, x: titleX }}
      >
        <h2
          className="font-cormorant font-semibold leading-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#C9A84C",
          }}
        >
          Enhanccee
        </h2>
        <p
          className="font-cormorant italic text-[#ffffff] leading-snug"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}
        >
          Made to be discovered,
          <br />
          remembered, and talked about.
        </p>
      </motion.div>

      {/* Painting / Frame */}
      <motion.div
        className="relative z-10"
        style={{ scale: paintingScale, opacity: paintingOpacity }}
      >
        <div
          className="relative"
          style={{
            width: "clamp(180px, 22vw, 340px)",
            height: "clamp(220px, 28vw, 420px)",
          }}
        >
          {/* Outer frame */}
          <div
            className="absolute inset-0"
            style={{
              border: "12px solid #1a1a1a",
              boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.6)",
            }}
          />
          {/* Inner gold trim */}
          <div
            className="absolute"
            style={{ inset: "12px", border: "2px solid #C9A84C44" }}
          />
          {/* Canvas area with 6 logo placeholders */}
          <div
            className="absolute flex flex-col justify-center items-center gap-3"
            style={{
              inset: "20px",
              background:
                "linear-gradient(135deg, #1a0008 0%, #0d0005 40%, #1a0008 70%, #000000 100%)",
              padding: "12px",
            }}
          >
            <div className="flex gap-3 w-full justify-center">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-center"
                  style={{
                    flex: 1,
                    aspectRatio: "1 / 1",
                    border: "1px dashed #C9A84C66",
                    background: "rgba(201,168,76,0.06)",
                    borderRadius: "4px",
                    maxWidth: "60px",
                    maxHeight: "60px",
                  }}
                >
                  <span className="font-space-mono text-[#C9A84C66]" style={{ fontSize: "8px" }}>
                    LOGO
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 w-full justify-center">
              {[4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-center"
                  style={{
                    flex: 1,
                    aspectRatio: "1 / 1",
                    border: "1px dashed #C9A84C66",
                    background: "rgba(201,168,76,0.06)",
                    borderRadius: "4px",
                    maxWidth: "60px",
                    maxHeight: "60px",
                  }}
                >
                  <span className="font-space-mono text-[#C9A84C66]" style={{ fontSize: "8px" }}>
                    LOGO
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
