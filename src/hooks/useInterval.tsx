import React from "react";

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = React.useRef<() => void>(undefined);
  
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
      function tick() {
        savedCallback.current?.();
      }
      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  }

  export default useInterval;