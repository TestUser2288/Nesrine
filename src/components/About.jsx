import { about, marquee } from '../data/content';
import { useSpotlight } from '../hooks/useInteractions';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ICONS, Sparkle } from './icons';

/** Bandeau défilant : 45 s linéaires, mis en pause au survol. */
export function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            <Sparkle className="marquee__star" width="16" height="16" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Focus({ item, delay }) {
  const { ref, onMouseMove } = useSpotlight();
  const Icon = ICONS[item.icon];

  return (
    <Reveal delay={delay}>
      <article
        className="card card--lift spotlight focus"
        ref={ref}
        onMouseMove={onMouseMove}
        style={{ '--tone': item.tone, '--tone-soft': item.soft }}
      >
        <span className="focus__icon">
          <Icon width="20" height="20" />
        </span>
        <div>
          <h3 className="focus__title">{item.title}</h3>
          <p className="focus__text">{item.text}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function About() {
  return (
    <>
      <section className="section" id="profil">
        <div className="container">
          <SectionHeading
            num="01"
            label="Profil"
            lead={about.titleLead}
            accent={about.titleAccent}
            tail="."
          />

          <div className="about">
            <div className="about__text">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={index * 90}>
                  <p className="lede">{paragraph}</p>
                </Reveal>
              ))}

              <Reveal delay={200}>
                <p className="about__quote">{about.quote}</p>
              </Reveal>
            </div>

            <div className="focus-list">
              {about.focus.map((item, index) => (
                <Focus item={item} key={item.title} delay={index * 90} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}
