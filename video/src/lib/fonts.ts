import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { fontsReady } from "../theme";

let loaded = false;
fontsReady.then(() => {
  loaded = true;
});

/** True once Manrope + Inter are loaded (blocks rendering until then). */
export const useFontsReady = () => {
  const [ready, setReady] = useState(loaded);
  const [handle] = useState(() => (loaded ? null : delayRender("Loading fonts")));
  useEffect(() => {
    if (ready) return;
    fontsReady.then(() => {
      setReady(true);
      if (handle !== null) continueRender(handle);
    });
  }, [ready, handle]);
  return ready;
};
