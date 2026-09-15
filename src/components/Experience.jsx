import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experience } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ArrowRight } from './icons';

export default function Experience() {
  const [index, setIndex] = useState(0);
  const [bar, setBar] = useState({ y: 0, h: 0 });
  const listRef = useRef(null);
  const tabRefs = useRef([]);
  const current = experience[index];

  // Aligne l'indicateur vertical sur l'onglet actif.
  const moveBar = useCallback(() => {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab) return;
    setBar({ y: tab.offsetTop, h: tab.offsetHeight });
  }, [index]);

  useLayoutEffect(() => {
    moveBar();
  }, [moveBar]);

  useEffect(() => {
    window.addEventListener('resize', moveBar);
    return () => window.removeEventListener('resize', moveBar);
  }, [moveBar]);

  // Flèches haut/bas pour circuler entre les onglets, comme un vrai tablist.
  const onKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const next = (index + delta + experience.length) % experience.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section section--subtle" id="experience">
      <div className="container">
        <SectionHeading
          num="02"
          label="Expérience"
          lead="Trois terrains, une même exigence de"
          accent="précision"
          tail="."
          lede="Assurance vie, conseil en systèmes d'information et statistique publique — trois contextes où le modèle devait servir une décision réelle."
        />

        <Reveal>
          <div className="tabs">
            <div
              className="tabs__list"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Employeurs"
              ref={listRef}
              onKeyDown={onKeyDown}
            >
              <span
                className="tab__bar"
                aria-hidden="true"
                style={{
                  transform: `translateY(${bar.y}px)`,
                  height: `${bar.h}px`,
                  '--accent': current.tone,
                }}
              />

              {experience.map((item, itemIndex) => (
                <button
                  type="button"
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={itemIndex === index ? 0 : -1}
                  ref={(node) => {
                    tabRefs.current[itemIndex] = node;
                  }}
                  className={`tab${itemIndex === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(itemIndex)}
                >
                  <span className="tab__org">{item.org}</span>
                  <span className="tab__period">{item.period}</span>
                </button>
              ))}
            </div>

            <div
              className="card panel"
              role="tabpanel"
              id={`panel-${current.id}`}
              aria-labelledby={`tab-${current.id}`}
              style={{ '--accent': current.tone }}
            >
              {/* La clé force le rejeu de l'animation à chaque changement. */}
              <div className="panel__body" key={current.id}>
                <div className="panel__head">
                  <div>
                    <h3 className="panel__org">{current.org}</h3>
                    <p className="panel__role">{current.role}</p>
                  </div>
                  <span className="pill pill--neutral">{current.kind}</span>
                </div>

                <ul className="panel__points">
                  {current.points.map((point) => (
                    <li className="panel__point" key={point.slice(0, 32)}>
                      <ArrowRight className="panel__point-mark" width="15" height="15" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="panel__stack">
                  {current.stack.map((tool) => (
                    <li className="chip" key={tool}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
