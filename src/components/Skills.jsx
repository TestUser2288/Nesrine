import { skills } from '../data/content';
import { useSpotlight } from '../hooks/useInteractions';
import ProficiencyChart from './charts/ProficiencyChart';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function SkillCard({ group, delay }) {
  const { ref, onMouseMove } = useSpotlight();

  return (
    <Reveal delay={delay}>
      <article className="card spotlight" ref={ref} onMouseMove={onMouseMove}>
        <span className="skill-card__rail" style={{ '--rail': group.tone }} />
        <div className="card__inner">
          <ProficiencyChart
            title={group.title}
            subtitle={`Groupe ${group.count}`}
            tone={group.tone}
            items={group.items}
          />
        </div>
      </article>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section className="section" id="competences">
      <div className="container">
        <SectionHeading
          num="04"
          label="Compétences"
          lead="Une boîte à outils tenue à la"
          accent="main"
          tail="."
          lede="Niveaux auto-évalués sur 100, fondés sur la fréquence d'usage et la profondeur d'application en stage, en projet de fin d'études et en projets académiques."
        />

        <div className="skills">
          {skills.map((group, index) => (
            <SkillCard group={group} key={group.title} delay={index * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
