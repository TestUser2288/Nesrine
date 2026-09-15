import { domains, education, extras, timeline } from '../data/content';
import DomainRadar from './charts/DomainRadar';
import Stepper from './charts/Stepper';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Expertise() {
  return (
    <section className="section section--subtle" id="parcours">
      <div className="container">
        <SectionHeading
          num="05"
          label="Parcours & domaines"
          lead="Cinq années à construire un profil"
          accent="complet"
          tail="."
          lede="La chronologie des jalons, le profil de domaines, et les diplômes qui les sous-tendent."
        />

        <Reveal>
          <div className="card" style={{ marginBottom: 'var(--sp-24)' }}>
            <div className="card__inner">
              <Stepper
                items={timeline}
                title="Jalons du parcours"
                subtitle="Étapes successives, chacune datée"
              />
            </div>
          </div>
        </Reveal>

        <div className="expertise">
          <Reveal delay={90}>
            <div className="card" style={{ height: '100%' }}>
              <div className="card__inner">
                <DomainRadar
                  domains={domains}
                  title="Profil de domaines"
                  subtitle="Niveau auto-évalué sur 100"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="expertise__side">
              {education.map((item) => (
                <article className="card card--lift edu" key={item.school}>
                  <span className="mono muted">{item.period}</span>
                  <h3 className="edu__school">{item.school}</h3>
                  <p className="edu__degree">{item.degree}</p>
                </article>
              ))}

              <div className="extras">
                {extras.map((item) => (
                  <div className="card edu" key={item.title}>
                    <span className="eyebrow">{item.title}</span>
                    <p style={{ fontSize: '15px', fontWeight: 600 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
