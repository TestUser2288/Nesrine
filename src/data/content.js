/**
 * Contenu du portfolio — source unique de vérité.
 * Modifier ce fichier suffit à mettre à jour l'ensemble du site.
 */

export const profile = {
  name: 'Nesrine Boussenna',
  firstName: 'Nesrine',
  initial: 'N',
  role: 'Ingénieure en Statistique & Data Science',
  location: 'Ariana — Soukra, Tunisie',
  email: 'nesrineboussenna0@gmail.com',
  phone: '+216 90 130 432',
  phoneHref: '+21690130432',
  linkedin: 'https://www.linkedin.com/in/nesrine-boussenna',
  github: 'https://github.com/',
  cv: '/Nesrine_Boussenna_CV.pdf',
  portrait: '/portrait.jpg',
};

export const nav = [
  { id: 'profil', label: 'Profil' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
];

export const hero = {
  availability: 'Ouverte aux opportunités',
  greeting: 'Bonjour, je suis',
  lastName: 'Boussenna',
  lede: [
    { text: 'Ingénieure en ' },
    { text: 'Statistique & Data Science', hl: 'brand' },
    { text: ', spécialisée en ' },
    { text: 'machine learning', hl: 'magenta' },
    { text: ' et ' },
    { text: 'gestion des risques', hl: 'amber' },
    {
      text: '. Je transforme des données assurantielles et financières en modèles qui tiennent la route — de la préparation jusqu’à la mise en production.',
    },
  ],
  stats: [
    { value: 8, suffix: '', label: 'Modèles comparés sur le PFE STAR Assurances' },
    { value: 3, suffix: '', label: 'Expériences en entreprise et institution' },
    { value: 5, suffix: ' ans', label: 'De formation scientifique supérieure' },
    { value: 15, suffix: '+', label: 'Technologies maîtrisées au quotidien' },
  ],
  badges: [
    { value: 'Python · R', label: 'Stack principale', tone: 'var(--series-1)', soft: 'var(--series-1-soft)' },
    { value: 'Solvabilité II', label: 'Cadre actuariel', tone: 'var(--series-3)', soft: 'var(--series-3-soft)' },
  ],
};

export const about = {
  titleLead: 'La rigueur statistique au service de la',
  titleAccent: 'décision',
  paragraphs: [
    "Diplômée de l'École Supérieure de la Statistique et de l'Analyse de l'Information (ESSAI), je travaille à l'intersection du machine learning, de l'actuariat et de la finance : modélisation prédictive, analyse des risques et mise en production de solutions fondées sur les données.",
    "De la modélisation du comportement de rachat en assurance vie aux pipelines d'extraction documentaire par OCR, mon approche reste la même : comprendre le métier avant le modèle, et valider chaque résultat par des métriques qui ont un sens pour ceux qui décident.",
  ],
  quote:
    "« Un modèle n'a de valeur que si la décision qu'il éclaire est meilleure que celle qu'on aurait prise sans lui. »",
  focus: [
    {
      icon: 'trend',
      title: 'Modélisation prédictive',
      text: "Feature engineering, comparaison rigoureuse de modèles et validation par des métriques d'erreur adaptées au métier.",
      tone: 'var(--series-1)',
      soft: 'var(--series-1-soft)',
    },
    {
      icon: 'shield',
      title: 'Risque & actuariat',
      text: 'Analyse de survie, probabilité de défaut, tarification et stress tests Solvabilité II pour fiabiliser Best Estimate et SCR.',
      tone: 'var(--series-2)',
      soft: 'var(--series-2-soft)',
    },
    {
      icon: 'layers',
      title: 'Mise en production',
      text: "Applications Django et R Shiny, pipelines OCR et tableaux de bord analytiques : le modèle devient un outil qu'on utilise.",
      tone: 'var(--series-3)',
      soft: 'var(--series-3-soft)',
    },
  ],
};

export const marquee = [
  'Machine Learning',
  'Analyse de survie',
  'Solvabilité II',
  'Deep Learning',
  'Gestion des risques',
  'Actuariat',
  'Monte Carlo',
  'Économétrie',
  'LLM',
  'Big Data',
];

export const experience = [
  {
    id: 'star',
    period: '02/2026 — 06/2026',
    kind: "Projet de fin d'études",
    org: 'STAR Assurances',
    role: "Modélisation du comportement de rachat en assurance vie épargne par des techniques avancées d'IA",
    tone: 'var(--series-1)',
    points: [
      "Développement d'un pipeline de prédiction du taux annuel de rachat combinant feature engineering macroéconomique et comportemental.",
      'Comparaison de 8 modèles sur deux voies — machine learning pur et analyse de survie actuarielle — évaluées par des métriques d’erreur sur taux agrégé.',
      'Application des stress tests Solvabilité II pour fiabiliser le Best Estimate et le calcul du SCR.',
    ],
    stack: [
      'Python',
      'scikit-learn',
      'scikit-survival',
      'Cox',
      'Forêt de survie',
      'XGBoost',
      'CatBoost',
      'Solvabilité II',
      'GAP',
    ],
  },
  {
    id: 'wevioo',
    period: '07/2025',
    kind: "Stage d'ingénieur",
    org: 'WEVIOO',
    role: "Automatisation de l'extraction de bilans comptables par pipeline multi-OCR",
    tone: 'var(--series-2)',
    points: [
      "Développement d'une application web Django automatisant l'extraction de bilans comptables à partir de fichiers PDF et la génération de fichiers Excel formatés.",
      "Intégration d'un pipeline multi-OCR (Doctr, Tesseract, Docling) pour une reconnaissance précise du texte.",
      "Création d'un tableau de bord analytique en temps réel et automatisation de l'export de rapports Excel.",
    ],
    stack: [
      'Python',
      'Django',
      'PyPDF2',
      'OpenCV',
      'Pandas',
      'NumPy',
      'OCR',
      'TailwindCSS',
      'JavaScript',
    ],
  },
  {
    id: 'ins',
    period: '07/2024',
    kind: "Stage d'insertion",
    org: 'Institut National de la Statistique',
    role: 'Application R Shiny interactive de cartographie statistique nationale',
    tone: 'var(--series-3)',
    points: [
      "Développement d'une application R Shiny avec carte choroplèthe de la Tunisie et visualisations dynamiques.",
      'Exploration des données par gouvernorat, district et bureau, avec filtres et tableaux interactifs.',
    ],
    stack: ['R', 'Shiny', 'shinydashboard', 'DT', 'dplyr', 'purrr', 'corrplot', 'ggplot2'],
  },
];

export const projectFilters = [
  { id: 'all', label: 'Tous' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'risk', label: 'Actuariat & risque' },
  { id: 'app', label: 'Applications' },
];

export const projects = [
  {
    id: 'rachat',
    title: 'Prédiction du taux de rachat en assurance vie',
    context: 'Projet de fin d’études · STAR Assurances · 2026',
    tags: ['ml', 'risk'],
    tagLabel: 'Assurance vie',
    tone: 'var(--series-1)',
    summary:
      "Pipeline de prédiction du taux annuel de rachat en épargne, construit sur deux voies concurrentes : machine learning pur et analyse de survie actuarielle.",
    points: [
      'Feature engineering combinant variables macroéconomiques et signaux comportementaux des assurés.',
      'Comparaison de 8 modèles sur deux approches, évaluées par des métriques d’erreur sur taux agrégé.',
      'Stress tests Solvabilité II appliqués pour fiabiliser le Best Estimate et le calcul du SCR.',
    ],
    metrics: [
      { value: '8', label: 'Modèles comparés' },
      { value: '2', label: 'Voies méthodologiques' },
      { value: 'SCR', label: 'Impact prudentiel' },
    ],
    stack: ['Python', 'scikit-learn', 'scikit-survival', 'Cox', 'XGBoost', 'CatBoost'],
  },
  {
    id: 'defaut',
    title: 'Modélisation de la probabilité de défaut',
    context: 'Projet académique · Risque de crédit',
    tags: ['ml', 'risk'],
    tagLabel: 'Risque de crédit',
    tone: 'var(--series-2)',
    summary:
      "Modèle de classification binaire prédisant le défaut de crédit, pensé pour alimenter un système de notation interne.",
    points: [
      'Identification des facteurs financiers déterminants du risque de défaut.',
      "Sélection de variables et normalisation via SelectKBest et MinMaxScaler.",
      "Évaluation des performances en vue d'une intégration dans un système de notation interne (SNI).",
    ],
    metrics: [
      { value: 'SNI', label: 'Cible d’intégration' },
      { value: 'Binaire', label: 'Type de classification' },
    ],
    stack: ['Python', 'scikit-learn', 'pandas', 'seaborn', 'MinMaxScaler', 'SelectKBest'],
  },
  {
    id: 'tarification',
    title: 'Tarification automobile via machine learning',
    context: 'Projet académique · Actuariat non-vie',
    tags: ['ml', 'risk', 'app'],
    tagLabel: 'Actuariat non-vie',
    tone: 'var(--series-3)',
    summary:
      'Application analytique de tarification automobile fondée sur une prédiction coût-fréquence, combinant modèles statistiques classiques et algorithmes de machine learning.',
    points: [
      'Modélisation séparée de la fréquence et du coût des sinistres.',
      'Comparaison entre approches statistiques classiques et algorithmes de machine learning.',
      'Restitution dans une application Shiny avec cartographie et tableaux interactifs.',
    ],
    metrics: [
      { value: 'Coût ×', label: 'Approche fréquence' },
      { value: 'Shiny', label: 'Restitution' },
    ],
    stack: ['R', 'caret', 'MASS', 'recipes', 'tidyverse', 'sf', 'tmap', 'Shiny'],
  },
  {
    id: 'ocr',
    title: 'Extraction automatisée de bilans comptables',
    context: 'Stage d’ingénieur · WEVIOO · 2025',
    tags: ['app', 'ml'],
    tagLabel: 'OCR & automatisation',
    tone: 'var(--series-1)',
    summary:
      "Application web Django qui lit des bilans comptables en PDF, en extrait les postes via un pipeline multi-OCR et génère des fichiers Excel formatés.",
    points: [
      "Pipeline multi-OCR combinant Doctr, Tesseract et Docling pour fiabiliser la reconnaissance du texte.",
      'Prétraitement des images et des PDF avec OpenCV et PyPDF2.',
      "Tableau de bord analytique en temps réel et export automatisé des rapports Excel.",
    ],
    metrics: [
      { value: '3', label: 'Moteurs OCR combinés' },
      { value: 'PDF → XLSX', label: 'Chaîne automatisée' },
    ],
    stack: ['Python', 'Django', 'OpenCV', 'PyPDF2', 'Pandas', 'TailwindCSS'],
  },
  {
    id: 'shiny-ins',
    title: 'Cartographie statistique interactive de la Tunisie',
    context: 'Stage d’insertion · INS · 2024',
    tags: ['app'],
    tagLabel: 'Data visualisation',
    tone: 'var(--series-2)',
    summary:
      "Application R Shiny d'exploration des données statistiques nationales, articulée autour d'une carte choroplèthe et de visualisations dynamiques.",
    points: [
      'Carte choroplèthe de la Tunisie reliée à des filtres dynamiques.',
      'Exploration à trois niveaux : gouvernorat, district et bureau.',
      'Tableaux interactifs et matrices de corrélation pour l’analyse exploratoire.',
    ],
    metrics: [
      { value: '3', label: "Niveaux d'analyse" },
      { value: 'Choroplèthe', label: 'Visualisation clé' },
    ],
    stack: ['R', 'Shiny', 'shinydashboard', 'DT', 'dplyr', 'ggplot2', 'corrplot'],
  },
];

/**
 * Niveaux de maîtrise — auto-évaluation indicative (0-100), à ajuster.
 * Ils ne figurent pas sur le CV : ils traduisent la fréquence d'usage et la
 * profondeur d'application constatées sur les stages, le PFE et les projets.
 */
export const skills = [
  {
    title: 'Programmation & requêtage',
    count: '01',
    tone: 'var(--series-1)',
    items: [
      { label: 'Python', value: 95 },
      { label: 'R', value: 90 },
      { label: 'SQL / PostgreSQL', value: 80 },
      { label: 'SAS', value: 65 },
      { label: 'JavaScript / HTML / CSS', value: 60 },
      { label: 'C / Java', value: 50 },
    ],
  },
  {
    title: 'Outils & plateformes',
    count: '02',
    tone: 'var(--series-2)',
    items: [
      { label: 'Django', value: 80 },
      { label: 'R Shiny', value: 88 },
      { label: 'Power BI', value: 70 },
      { label: 'Excel avancé', value: 82 },
      { label: 'Git / VS Code', value: 72 },
      { label: 'TailwindCSS', value: 60 },
    ],
  },
  {
    title: 'Bibliothèques data & ML',
    count: '03',
    tone: 'var(--series-3)',
    items: [
      { label: 'pandas / NumPy', value: 92 },
      { label: 'scikit-learn', value: 90 },
      { label: 'XGBoost / CatBoost', value: 85 },
      { label: 'scikit-survival', value: 80 },
      { label: 'tidyverse / ggplot2', value: 85 },
      { label: 'OCR (Doctr, Tesseract)', value: 68 },
    ],
  },
];

/** Profil de domaines — même échelle indicative que les niveaux ci-dessus. */
export const domains = [
  { label: 'Machine Learning', value: 90 },
  { label: 'Analyse de survie', value: 85 },
  { label: 'Gestion des risques', value: 82 },
  { label: 'Actuariat', value: 78 },
  { label: 'Économétrie', value: 80 },
  { label: 'Deep Learning & LLM', value: 72 },
];

export const timeline = [
  { year: '2021', label: 'IPEI Monastir', meta: 'Prépa maths & physique', kind: 'formation' },
  { year: '2023', label: 'ESSAI', meta: 'Cycle ingénieur — Data Science', kind: 'formation' },
  { year: '07/2024', label: 'INS', meta: "Stage d'insertion — R Shiny", kind: 'experience' },
  { year: '07/2025', label: 'WEVIOO', meta: "Stage d'ingénieur — Django & OCR", kind: 'experience' },
  { year: '2026', label: 'STAR Assurances', meta: "PFE puis diplôme d'ingénieur", kind: 'experience' },
];

export const education = [
  {
    period: '2023 — 2026',
    school: "École Supérieure de la Statistique et de l'Analyse de l'Information (ESSAI)",
    degree: "Diplôme national d'ingénieur en Statistique et Data Science",
  },
  {
    period: '2021 — 2023',
    school: "Institut Préparatoire aux Études d'Ingénieurs de Monastir",
    degree: 'Diplôme préparatoire — Mathématiques et Physique',
  },
];

export const extras = [
  { title: 'Vie associative', value: 'Scouts Tunisiens — Trésorière' },
  { title: 'Langues', value: 'Arabe · Français · Anglais' },
];

export const contact = {
  titleLead: 'Construisons la',
  titleAccent: 'suite',
  text: 'Ouverte aux opportunités en data science, actuariat et gestion des risques — en Tunisie comme à l’international. Une question, une offre, un projet : le formulaire ou un email direct, au choix.',
};
