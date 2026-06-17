import { useEffect, useRef } from "react";

export function useTapAction(
  onSingleTap: () => void,
  onDoubleTap: () => void,
  delay = 220,
) {
  const tapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        window.clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  const clearTapTimeout = () => {
    if (tapTimeoutRef.current) {
      window.clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }
  };

  const handleClick = () => {
    if (tapTimeoutRef.current) {
      clearTapTimeout();
      onDoubleTap();
      return;
    }

    tapTimeoutRef.current = window.setTimeout(() => {
      tapTimeoutRef.current = null;
      onSingleTap();
    }, delay);
  };

  const handleDoubleClick = () => {
    clearTapTimeout();
    onDoubleTap();
  };

  return {
    handleClick,
    handleDoubleClick,
  };
}
