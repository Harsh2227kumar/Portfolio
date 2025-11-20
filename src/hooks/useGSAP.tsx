import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and slide up animation for cards
      gsap.fromTo('.gsap-card', 
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4, // Reduced: Faster card animation
          stagger: 0.1,  // Reduced: Snappier stagger between cards
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gsap-card',
            start: 'top 85%',
            toggleActions: 'play none none none' // Only play on scroll down, do not reverse
          }
        }
      );

      // Text reveal animation
      gsap.fromTo('.gsap-text', 
        { 
          y: 30, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3, // Reduced: Faster text animation
          stagger: 0.03, // Reduced: Very tight stagger
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gsap-text',
            start: 'top 90%',
            toggleActions: 'play none none none' // Only play on scroll down, do not reverse
          }
        }
      );

      // Button hover animations (not scroll-triggered, maintains click responsiveness)
      const buttons = document.querySelectorAll('.gsap-button');
      buttons.forEach(button => {
        const tl = gsap.timeline({ paused: true });
        tl.to(button, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        });

        button.addEventListener('mouseenter', () => tl.play());
        button.addEventListener('mouseleave', () => tl.reverse());
      });

      // Skills progress bar animation
      gsap.fromTo('.gsap-progress', 
        { 
          width: '0%'
        },
        {
          width: '100%',
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gsap-progress',
            start: 'top 80%',
            toggleActions: 'play none none none' // Only play on scroll down, do not reverse
          }
        }
      );

      // Hero title animation (on load)
      gsap.fromTo('.gsap-hero-title', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1
        }
      );

      // Hero subtitle animation (on load)
      gsap.fromTo('.gsap-hero-subtitle', 
        { 
          y: 50, 
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2
        }
      );

      // Experience timeline animation
      gsap.fromTo('.gsap-timeline-item', 
        { 
          x: -50, 
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4, // Reduced: Faster timeline entry
          stagger: 0.15, // Reduced: Snappier stagger
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gsap-timeline-item',
            start: 'top 85%',
            toggleActions: 'play none none none' // Only play on scroll down, do not reverse
          }
        }
      );

      // Project cards hover animation (not scroll-triggered, maintains click responsiveness)
      const projectCards = document.querySelectorAll('.gsap-project-card');
      projectCards.forEach(card => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          duration: 0.3,
          ease: "power2.out"
        });

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};