import { useEffect, useRef, useState } from 'react';
import { hero, profile } from '../data/content';
import { portraitLqip } from '../data/lqip';
import { useCountUp, useTilt } from '../hooks/useInteractions';
import { useReveal } from '../hooks/useReveal';
import Reveal from './Reveal';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkle } from './icons';

/** Chiffre clé dont le compteur démarre à l'entrée dans le viewport. */
function Stat({ stat, active, delay }) {
  const value = useCountUp(stat.value, { start: active, duration: 1400 + delay });

  return (
    <div className="stat">
      <span className="stat__value">
        {value}
        <span className="stat__suffix">{stat.suffix}</span>
      </span>
      <span className="stat__label">{stat.label}</span>
    </div>
  );
}

/** Portrait : aperçu flou d'abord, image nette une fois chargée. */
function Portrait() {
  const [loaded, setLoaded] = useState(false);
  const tiltRef = useTilt(8);
  const imgRef = useRef(null);

  // Une image déjà en cache peut être complète avant l'attache du onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className="portrait">
      <div className="portrait__card tilt" ref={tiltRef}>
        <div
          className="portrait__frame"
          style={{ backgroundImage: `url(${portraitLqip})` }}
        >
          <img
            ref={imgRef}
            className={`portrait__img${loaded ? ' is-loaded' : ''}`}
            src={profile.portrait}
            alt={`Portrait de ${profile.name}`}
            width="880"
            height="1100"
            fetchpriority="high"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {hero.badges.map((badge, index) => (
        <div
          className={`portrait__badge portrait__badge--${index + 1}`}
          key={badge.value}
          style={{ '--tone': badge.tone, '--tone-soft': badge.soft }}
        >
          <span className="portrait__badge-icon">
            <Sparkle width="16" height="16" />
          </span>
          <span>
            <span className="portrait__badge-value">{badge.value}</span>
            <span className="portrait__badge-label">{badge.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const aura1 = useRef(null);
  const aura2 = useRef(null);
  const { ref: statsRef, isVisible: statsVisible } = useReveal({ threshold: 0.3 });

  // Parallaxe : les halos dérivent à contretemps du défilement.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (aura1.current) aura1.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      if (aura2.current) aura2.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__aura hero__aura--1" ref={aura1} aria-hidden="true" />
      <div className="hero__aura hero__aura--2" ref={aura2} aria-hidden="true" />

      <span className="ribbon" aria-hidden="true">
        Data Science · Actuariat
      </span>

      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <span className="pill">
              <span className="dot-pulse" />
              {hero.availability}
            </span>

            <h1 className="hero__title display">
              <span className="line">
                <span style={{ '--line-delay': '120ms' }}>{hero.greeting}</span>
              </span>
              <span className="line">
                <span className="hero__name" style={{ '--line-delay': '240ms' }}>
                  {profile.firstName} {hero.lastName}
                </span>
              </span>
            </h1>

            <p className="hero__lede lede">
              {hero.lede.map((part, index) =>
                part.hl ? (
                  <strong
                    className={part.hl === 'brand' ? 'hl' : `hl hl--${part.hl}`}
                    key={index}
                  >
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                )
              )}
            </p>

            <div className="hero__actions">
              <a className="btn btn--brand btn--lg" href="#contact">
                <Mail width="17" height="17" />
                Me contacter
              </a>
              <a className="btn btn--outline btn--lg" href={profile.cv} download>
                <Download width="17" height="17" />
                Mon CV
              </a>

              <span className="hero__socials">
                <a
                  className="icon-btn"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Profil LinkedIn"
                >
                  <Linkedin width="17" height="17" />
                </a>
                <a
                  className="icon-btn"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Profil GitHub"
                >
                  <Github width="17" height="17" />
                </a>
              </span>
            </div>
          </div>

          <Reveal delay={200}>
            <Portrait />
          </Reveal>
        </div>

        <div className="stats" ref={statsRef}>
          {hero.stats.map((stat, index) => (
            <Stat stat={stat} key={stat.label} active={statsVisible} delay={index * 120} />
          ))}
        </div>

        <p className="sr-only">
          Appuyez sur Commande ou Contrôle + K pour ouvrir la palette de navigation.
        </p>

        <a className="btn btn--ghost btn--sm" href="#profil" style={{ marginTop: 'var(--sp-24)' }}>
          Découvrir le parcours
          <ArrowRight width="16" height="16" />
        </a>
      </div>
    </section>
  );
}
