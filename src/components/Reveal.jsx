import { useReveal } from '../hooks/useReveal';

/** Wraps children in a scroll-triggered rise-and-fade. */
export default function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const [ref, shown] = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity .6s cubic-bezier(.2,0,.1,1) ${delay}ms, transform .6s cubic-bezier(.2,0,.1,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
