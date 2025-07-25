import { useState, useEffect, useCallback } from 'react';

/**
 * @returns {object} tooltip, showTooltip, hideTooltip
 * @description This hook is used to show a tooltip when the user hovers over a component.
 */
export function useCursorTooltip() {
  const [tooltip, setTooltip] = useState({
    isVisible: false,
    content: null,
    position: { x: 0, y: 0 },
  });
  const updatePosition = useCallback((e) => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      position: { x: e.clientX, y: e.clientY },
    }));
  }, []);

  const showTooltip = useCallback((content, e) => {
    setTooltip({
      isVisible: true,
      content,
      position: { x: e.clientX, y: e.clientY },
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      isVisible: false,
    }));
  }, []);

  useEffect(() => {
    if (tooltip.isVisible) {
      document.addEventListener('mousemove', updatePosition);
      return () => document.removeEventListener('mousemove', updatePosition);
    }
  }, [tooltip.isVisible, updatePosition]);

  return { tooltip, showTooltip, hideTooltip };
}
