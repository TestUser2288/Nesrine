import { useMemo, useState } from 'react';
import { projectFilters, projects } from '../data/content';
import { useFlip, useSpotlight } from '../hooks/useInteractions';
import ProjectModal from './ProjectModal';
import ProjectVisual from './ProjectVisual';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { Maximize } from './icons';

function ProjectCard({ project, index, onOpen }) {
  const { ref, onMouseMove } = useSpotlight();

  return (
    <button
      type="button"
      className="card card--lift spotlight project"
      data-flip-key={project.id}
      ref={ref}
      onMouseMove={onMouseMove}
      onClick={() => onOpen(project)}
      aria-label={`Ouvrir le détail du projet : ${project.title}`}
    >
      <span
        className="project__visual"
        style={{
          '--visual': `linear-gradient(140deg, color-mix(in srgb, ${project.tone} 14%, var(--surface)) 0%, var(--surface) 76%)`,
        }}
      >
        {project.image ? (
          <img
            className="project__img"
            src={project.image}
            alt=""
            loading="lazy"
            width="1400"
            height="628"
          />
        ) : (
          <ProjectVisual project={project} variant={index % 3} />
        )}
        <span className="pill project__tag">{project.tagLabel}</span>
        <span className="project__zoom">
          <Maximize width="16" height="16" />
        </span>
      </span>

      <span className="project__body">
        <span className="project__title">{project.title}</span>
        <span className="mono muted">{project.context}</span>
        <span className="project__text">{project.summary}</span>
        <span className="project__meta">
          {project.stack.slice(0, 4).map((tool) => (
            <span className="chip" key={tool}>
              {tool}
            </span>
          ))}
          {project.stack.length > 4 ? (
            <span className="chip">+{project.stack.length - 4}</span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [openProject, setOpenProject] = useState(null);
  const { containerRef, capture } = useFlip(filter);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  const counts = useMemo(() => {
    const map = { all: projects.length };
    for (const item of projectFilters) {
      if (item.id === 'all') continue;
      map[item.id] = projects.filter((p) => p.tags.includes(item.id)).length;
    }
    return map;
  }, []);

  const changeFilter = (id) => {
    if (id === filter) return;
    // On mesure AVANT le rendu : le hook animera l'écart de position.
    capture();
    setFilter(id);
  };

  return (
    <section className="section" id="projets">
      <div className="container">
        <SectionHeading
          num="03"
          label="Projets"
          lead="Des modèles pensés pour la"
          accent="production"
          tail="."
          lede="Six projets de modélisation, de décisionnel et d'ingénierie de données, du portefeuille d'assurance au risque de crédit. Cliquez sur une carte pour le détail."
        />

        <Reveal>
          <div className="filters" role="group" aria-label="Filtrer les projets">
            {projectFilters.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`filter${filter === item.id ? ' is-active' : ''}`}
                onClick={() => changeFilter(item.id)}
                aria-pressed={filter === item.id}
              >
                {item.label}
                <span className="filter__count">{counts[item.id]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects" ref={containerRef}>
          {visible.map((project, index) => (
            <ProjectCard
              project={project}
              index={index}
              key={project.id}
              onOpen={setOpenProject}
            />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="projects__empty">Aucun projet dans cette catégorie.</p>
        ) : null}

        <p className="sr-only" aria-live="polite">
          {visible.length} projets affichés.
        </p>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
