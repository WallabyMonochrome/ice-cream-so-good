import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const useTextExpandingBack = (
  ref: any,
  options: any = {}
) => {
  const animationRef = useRef<GSAPTween | null>(null);

  const playAnimation = () => {
    const { delay = 0.1, duration = 1, offset = 100 } = options;
    if (ref) {
      const chars = ref.querySelectorAll(".char");
      if (chars.length > 0) {
        animationRef.current = gsap.fromTo(chars, {
          'will-change': 'opacity, transform',
          opacity: 0,
          xPercent: () => gsap.utils.random(-200, 200),
          yPercent: () => gsap.utils.random(-150, 150),
        }, {
          ease: 'power1.inOut',
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          stagger: { each: 0.05, grid: 'auto', from: 'random' },
          duration,
          delay
        });
      }
    }
  };

  useEffect(() => {
    // Optionally play on mount
    if (options.autoPlay) {
      playAnimation();
    }
  }, [ref]);

  return {
    playAnimation,
    stopAnimation: () => animationRef.current?.pause(),
    restartAnimation: () => animationRef.current?.restart(),
  };
};

export const useTextSliding = (
  ref: any,
  options: any = {}
) => {
  const animationRef = useRef<GSAPTween | null>(null);

  const playAnimation = () => {
    const { delay = 0.1, duration = 1, offset = 100 } = options;
    if (ref) {
      const chars = ref.querySelectorAll(".char");
      if (chars.length > 0) {
        gsap.fromTo(chars, {
            'will-change': 'transform',
            transformOrigin: '0% 50%',
            yPercent: 105,
          },
          {
            delay: delay,
            duration: 0.5,
            ease: 'expo.out',
            yPercent: 0,
            stagger: 0.015,
          });
      }
    }
  };

  useEffect(() => {
    // Optionally play on mount
    if (options.autoPlay) {
      playAnimation();
    }
  }, [ref]);

  return {
    playAnimation,
    stopAnimation: () => animationRef.current?.pause(),
    restartAnimation: () => animationRef.current?.restart(),
  };
};
