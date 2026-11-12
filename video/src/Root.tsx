import React from "react";
import { Composition } from "remotion";
import { estimateTimings } from "./lib/VideoComposition";
import { calculateVideo1, Video1, video1 } from "./videos/video1";
import { calculateVideo2, Video2, video2 } from "./videos/video2";
import { FPS, H, W } from "./theme";

export const RemotionRoot: React.FC = () => {
  const t1 = estimateTimings(video1);
  const t2 = estimateTimings(video2);
  return (
    <>
      <Composition
        id="Video1"
        component={Video1}
        width={W}
        height={H}
        fps={FPS}
        durationInFrames={t1.reduce((a, t) => a + t.durationInFrames, 0)}
        defaultProps={{ timings: [] }}
        calculateMetadata={calculateVideo1}
      />
      <Composition
        id="Video2"
        component={Video2}
        width={W}
        height={H}
        fps={FPS}
        durationInFrames={t2.reduce((a, t) => a + t.durationInFrames, 0)}
        defaultProps={{ timings: [] }}
        calculateMetadata={calculateVideo2}
      />
    </>
  );
};
