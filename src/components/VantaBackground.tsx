import React, { useEffect, useRef } from 'react';

type VantaEffect = {
  destroy: () => void;
};

type VantaNetOptions = {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  backgroundColor: number;
  points: number;
  maxDistance: number;
  spacing: number;
};

declare global {
  interface Window {
    VANTA?: {
      NET: (options: VantaNetOptions) => VantaEffect;
    };
    THREE?: unknown;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    // Load Three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    threeScript.onload = () => {
      // Load Vanta.js NET effect
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
      vantaScript.onload = () => {
        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xFF5733, // Updated Vanta color to a reddish-orange for the new theme
            backgroundColor: 0x111827, // Dark gray background
            points: 10.00,
            maxDistance: 20.00,
            spacing: 15.00
          });
        }
      };
      document.head.appendChild(vantaScript);
    };
    document.head.appendChild(threeScript);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default VantaBackground;
