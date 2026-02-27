import { useRef, useEffect, memo } from 'react';

// CSS-transition based scroll animation — no GSAP, no scroll listeners.
// Uses IntersectionObserver (native browser API, zero JS per frame).
const AnimatedContent = memo(({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'cubic-bezier(0.16, 1, 0.3, 1)',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'X' : 'Y';
    const sign = reverse ? -1 : 1;
    const scalePart = scale !== 1 ? ` scale(${scale})` : '';

    // Set initial state — pure inline CSS, no JS animation library needed
    el.style.opacity = animateOpacity ? '0' : '1';
    el.style.transform = `translate${axis}(${sign * distance}px)${scalePart}`;
    el.style.transition = `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`;
    el.style.visibility = 'visible';
    el.style.willChange = 'transform, opacity';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.addEventListener('transitionend', () => {
          el.style.willChange = 'auto';
        }, { once: true });
        observer.unobserve(el);
      },
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
});

AnimatedContent.displayName = 'AnimatedContent';
export default AnimatedContent;
