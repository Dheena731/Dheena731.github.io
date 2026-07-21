import { useEffect, useMemo, useRef, useState } from 'react';
import Matter from 'matter-js';
import { skillGroups } from '../data/profile';
import SectionHead from './SectionHead';
import Reveal from './Reveal';

const flatten = (groups) =>
  groups.flatMap((g) => g.items.map((name) => ({ name, accent: g.accent, group: g.label })));

/**
 * Skills as physical objects. Chips are measured in normal flow, then handed to
 * a Matter.js world and driven by transform. Drag them, throw them, shake the box.
 * Falls back to a static wrapped list when motion is reduced.
 */
export default function SkillsBoard() {
  const scene = useRef(null);
  const chipRefs = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const [live, setLive] = useState(false);
  const [filter, setFilter] = useState('All');

  const chips = useMemo(() => flatten(skillGroups), []);
  const groups = useMemo(() => ['All', ...skillGroups.map((g) => g.label)], []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = scene.current;
    if (reduced || !el) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body, Common } = Matter;

    let width = el.clientWidth;
    let height = el.clientHeight;

    const engine = Engine.create({
      gravity: { x: 0, y: 1 },
      positionIterations: 10,
      velocityIterations: 8,
    });
    engineRef.current = engine;

    const wallOpts = { isStatic: true, restitution: 0.4, friction: 0.4 };
    const T = 200; // wall thickness, keeps fast bodies from tunnelling out
    const walls = [
      Bodies.rectangle(width / 2, height + T / 2, width * 3, T, wallOpts),
      Bodies.rectangle(-T / 2, height / 2, T, height * 4, wallOpts),
      Bodies.rectangle(width + T / 2, height / 2, T, height * 4, wallOpts),
      Bodies.rectangle(width / 2, -height - T / 2, width * 3, T, wallOpts),
    ];
    Composite.add(engine.world, walls);

    // One body per measured chip. They are released a few at a time from just
    // above the lid — dropping them all from far above makes the fast ones
    // tunnel straight through the floor.
    const bodies = chipRefs.current.filter(Boolean).map((node) => {
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      const body = Bodies.rectangle(
        Common.random(w / 2 + 8, Math.max(w / 2 + 9, width - w / 2 - 8)),
        -h,
        w,
        h,
        { restitution: 0.45, friction: 0.4, frictionAir: 0.015, chamfer: { radius: 3 } },
      );
      Body.setAngularVelocity(body, Common.random(-0.1, 0.1));
      return { body, node, w, h };
    });

    bodiesRef.current = bodies;

    let dropped = 0;
    const dropTimer = setInterval(() => {
      const batch = bodies.slice(dropped, dropped + 2);
      if (!batch.length) return clearInterval(dropTimer);
      Composite.add(engine.world, batch.map((b) => b.body));
      dropped += batch.length;
    }, 70);

    const mouse = Mouse.create(el);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, render: { visible: false } },
    });
    // Let the page keep scrolling over the board.
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    Composite.add(engine.world, mc);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let raf = 0;
    const draw = () => {
      for (const { body, node, w, h } of bodies) {
        node.style.transform =
          `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    setLive(true);

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (nw === width && nh === height) return;
      width = nw;
      height = nh;
      Body.setPosition(walls[0], { x: width / 2, y: height + T / 2 });
      Body.setPosition(walls[1], { x: -T / 2, y: height / 2 });
      Body.setPosition(walls[2], { x: width + T / 2, y: height / 2 });
      Body.setPosition(walls[3], { x: width / 2, y: -height - T / 2 });
    };
    addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(dropTimer);
      removeEventListener('resize', onResize);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, []);

  const shake = () => {
    const bodies = bodiesRef.current;
    if (!bodies.length) return;
    const { Body, Common } = Matter;
    for (const { body } of bodies) {
      Body.setVelocity(body, { x: Common.random(-13, 13), y: Common.random(-22, -9) });
      Body.setAngularVelocity(body, Common.random(-0.3, 0.3));
    }
  };

  return (
    <section id="stack" className="border-b-[3px] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="03"
          kicker={live ? 'Drag them. Throw them. They are real objects.' : 'What I build with'}
          title="The Stack"
          accentName="teal"
        />

        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className="sticker lift"
                style={
                  filter === g
                    ? { background: 'var(--ink)', color: 'var(--paper)' }
                    : undefined
                }
              >
                {g}
              </button>
            ))}
            {live && (
              <button
                onClick={shake}
                className="sticker lift ml-auto"
                style={{ background: 'var(--orange)', color: '#fff' }}
              >
                ⚡ Shake the box
              </button>
            )}
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={scene}
            className="panel-lg dotgrid relative h-[24rem] overflow-hidden md:h-[30rem]"
            style={{ touchAction: 'pan-y' }}
          >
            {chips.map((chip, i) => {
              const dim = filter !== 'All' && chip.group !== filter;
              return (
                <span
                  key={chip.name}
                  ref={(n) => (chipRefs.current[i] = n)}
                  data-hot
                  className="label whitespace-nowrap border-[2.5px] px-3 py-2 select-none"
                  style={{
                    position: live ? 'absolute' : 'relative',
                    top: 0,
                    left: 0,
                    display: 'inline-block',
                    margin: live ? 0 : '0.3rem',
                    willChange: 'transform',
                    background: dim ? 'var(--card)' : `var(--${chip.accent})`,
                    color: dim ? 'var(--ink-soft)' : '#fff',
                    opacity: dim ? 0.35 : 1,
                    boxShadow: '3px 3px 0 var(--line)',
                    transition: 'opacity .25s, background-color .25s, color .25s',
                  }}
                >
                  {chip.name}
                </span>
              );
            })}

            {!live && (
              <div className="pointer-events-none absolute inset-0 grid place-items-end p-4">
                <span className="label" style={{ color: 'var(--ink-soft)' }}>
                  static mode
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal>
          <div
            className="label mt-4 flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{ color: 'var(--ink-soft)' }}
          >
            {skillGroups.map((g) => (
              <span key={g.label} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 border-2"
                  style={{ background: `var(--${g.accent})` }}
                />
                {g.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
