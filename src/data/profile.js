export const profile = {
  name: 'Dhinakaran Thangaraj',
  handle: 'Dheena731',
  role: 'AI/ML Developer',
  subtitle: 'Graduate Engineer Trainee @ SQ1 Cybersecurity Solutions',
  location: 'Chennai, Tamil Nadu, India',
  email: 'dhinakaranthangaraj198@gmail.com',
  github: 'https://github.com/Dheena731',
  linkedin: 'https://www.linkedin.com/in/dhinakaran-thangaraj-a2a05a230/',
  // The résumé PDF is deliberately not published — it carries a phone number.
  // Until a redacted copy exists, every "Résumé" affordance points at LinkedIn.
  resumeHref: 'https://www.linkedin.com/in/dhinakaran-thangaraj-a2a05a230/',
  rotatingTitles: [
    'AI/ML DEVELOPER',
    'GRC AUTOMATION',
    'LLM ENGINEERING',
    'AGENTIC SYSTEMS',
    'SECURITY + AI',
  ],
  blurb:
    "I build AI that does the unglamorous work of security compliance — collecting evidence, validating controls, scoring risk, and auditing vendors. Currently shipping agentic GRC features on Stakflo at SQ1 Cybersecurity Solutions.",
  stats: [
    { value: '9', label: 'months shipping GRC AI', accent: 'orange' },
    { value: '8.2', label: 'B.Tech CGPA · AI & DS', accent: 'blue' },
    { value: '1', label: 'peer-reviewed publication', accent: 'purple' },
    { value: '90%', label: 'PCB defect detection', accent: 'teal' },
  ],
};

export const experience = [
  {
    id: 'sq1',
    company: 'SQ1 Cybersecurity Solutions',
    role: 'Graduate Engineer Trainee — AI/ML Developer',
    period: '2025 — Present',
    location: 'Futura Tech Park, Sholinganallur, Chennai',
    product: 'Stakflo — GRC & Compliance Platform',
    accent: 'orange',
    current: true,
    summary:
      'Building the AI layer of a Governance, Risk & Compliance platform — turning manual audit work into agentic workflows.',
    points: [
      'Automated evidence collection and validation pipelines that pull, parse and verify compliance artifacts against control requirements.',
      'Built control assessment and risk assessment engines that map findings to NIST, ISO and OSA control families.',
      'Shipped an AI-powered Trust Center that answers security questionnaires from a governed knowledge base.',
      'Designed AI agents for GRC auditing using LangGraph — multi-step reasoning over controls, policies and evidence.',
      'Implemented vendor assessment scoring and risk register automation, with Microsoft Entra integration for identity signals.',
      'Ran multi-provider LLM routing across OpenAI, OpenRouter, Groq and local Ollama models with runtime provider switching.',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'PostgreSQL', 'PGVector', 'Qdrant', 'Docker'],
  },
  {
    id: 'krishtec',
    company: 'Krishtec',
    role: 'Machine Learning Intern',
    period: 'Aug 2024 — Oct 2024',
    location: 'Coimbatore',
    product: 'Real-time PCB Inspection',
    accent: 'blue',
    summary:
      'Computer vision on the factory floor — edge-deployed defect detection running in the production line.',
    points: [
      'Engineered a deep-learning PCB inspection tool using object detection deployed on NVIDIA Jetson Nano.',
      'Achieved 90% defect detection accuracy in real time, improving production throughput and QA consistency.',
      'Optimised inference performance to keep up with day-to-day production speed constraints.',
    ],
    stack: ['PyTorch', 'Object Detection', 'Jetson Nano', 'OpenCV'],
  },
  {
    id: 'lenovo',
    company: 'Lenovo',
    role: 'Manufacturing Intern',
    period: 'Aug 2022',
    location: 'Pondicherry',
    product: 'Production Line Operations',
    accent: 'purple',
    summary: 'First exposure to how hardware actually gets built, tested and documented at scale.',
    points: [
      'Assisted assembly processes on the production line and learned end-to-end company operations.',
      'Supported workflow documentation and quality checks against manufacturing standards.',
    ],
    stack: ['Operations', 'QA', 'Documentation'],
  },
];

export const projects = [
  {
    id: 'tinyllama',
    title: 'Fine-tuning TinyLLaMA',
    tag: 'PEFT · LoRA',
    accent: 'orange',
    year: '2024',
    blurb:
      'Parameter-efficient fine-tuning of the TinyLLaMA transformer on the CUAD legal-contract dataset for domain text generation.',
    detail:
      'Ran LoRA adapters over TinyLLaMA on Kaggle GPUs with Weights & Biases tracking. Converged to a validation loss of 1.1219 and training loss of 1.0250 after 2,800 steps — demonstrating effective transfer learning on a small-parameter base model.',
    metrics: [
      { k: 'val loss', v: '1.1219' },
      { k: 'train loss', v: '1.0250' },
      { k: 'steps', v: '2,800' },
    ],
    stack: ['Python', 'PyTorch', 'Transformers', 'PEFT', 'LoRA', 'W&B'],
  },
  {
    id: 'webgen',
    title: 'Automated Web Development',
    tag: 'LLM · Streamlit',
    accent: 'blue',
    year: '2024',
    blurb:
      'An interactive app that auto-generates and edits HTML/CSS straight from natural-language prompts.',
    detail:
      'Wired Google Gemini Pro into a Streamlit front end so a non-technical user can describe a page, watch it render live, then refine it conversationally — collapsing the prototype loop from hours to seconds.',
    metrics: [
      { k: 'model', v: 'Gemini Pro' },
      { k: 'output', v: 'HTML/CSS' },
      { k: 'loop', v: 'live edit' },
    ],
    stack: ['Python', 'Streamlit', 'Gemini Pro', 'HTML/CSS'],
  },
  {
    id: 'infoquery',
    title: 'InfoQuery AI',
    tag: 'LangChain · Search',
    accent: 'teal',
    year: '2024',
    blurb:
      'An LLM-integrated search engine that parses a query, retrieves live results, and summarises them responsibly.',
    detail:
      'Built on LangChain agents with the DuckDuckGo API as the retrieval tool and Gemini for synthesis. Handles query decomposition, source retrieval and grounded summarisation behind a Streamlit UI.',
    metrics: [
      { k: 'agent', v: 'LangChain' },
      { k: 'retrieval', v: 'DuckDuckGo' },
      { k: 'synthesis', v: 'Gemini' },
    ],
    stack: ['Python', 'LangChain', 'Streamlit', 'DuckDuckGo API'],
  },
  {
    id: 'stakflo',
    title: 'Stakflo GRC Agents',
    tag: 'Production · Agentic',
    accent: 'purple',
    year: '2025—26',
    blurb:
      'Agentic auditing for a live compliance platform — evidence, controls, risk and vendors, assessed by AI.',
    detail:
      'The work I do day to day. LangGraph agents traverse control frameworks, request and validate evidence, and produce assessment artifacts a human auditor can sign off on. Backed by PGVector and Qdrant for retrieval over policy and evidence corpora.',
    metrics: [
      { k: 'frameworks', v: 'NIST · ISO' },
      { k: 'vector', v: 'PGVector' },
      { k: 'runtime', v: 'LangGraph' },
    ],
    stack: ['FastAPI', 'LangGraph', 'Qdrant', 'PGVector', 'SQLAlchemy', 'Docker'],
  },
];

export const skillGroups = [
  {
    label: 'AI / LLM',
    accent: 'orange',
    items: ['LangChain', 'LangGraph', 'PyTorch', 'Transformers', 'PEFT', 'LoRA', 'Ollama', 'OpenRouter', 'Groq', 'RAG'],
  },
  {
    label: 'Backend',
    accent: 'blue',
    items: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'REST APIs', 'SQL'],
  },
  {
    label: 'Data',
    accent: 'teal',
    items: ['PostgreSQL', 'PGVector', 'Qdrant', 'Pandas', 'NumPy', 'scikit-learn'],
  },
  {
    label: 'Platform',
    accent: 'purple',
    items: ['Docker', 'Git', 'GitHub', 'AWS', 'Weights & Biases', 'Streamlit'],
  },
  {
    label: 'Security & GRC',
    accent: 'yellow',
    items: ['NIST', 'ISO Mappings', 'OSA Controls', 'Trust Centers', 'Risk Registers', 'Vendor Assessment', 'MS Entra'],
  },
];

export const education = [
  {
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    school: 'Jai Shriram Engineering College',
    place: 'Avinashipalayam, India',
    period: '2021 — 2025',
    score: 'CGPA 8.2',
    accent: 'orange',
  },
  {
    degree: 'Higher Secondary Education',
    school: 'Government Higher Secondary School',
    place: 'Muthur, India',
    period: '2020 — 2021',
    score: '82.1%',
    accent: 'blue',
  },
];

export const publication = {
  title: 'AI-Based Mock Interview Platform',
  journal: 'IRJMETS',
  date: 'April 2025',
  authors: ['D. Thangaraj', 'T. Selvan', 'R. Ananth', 'A. Sivaraj'],
  doi: '10.56726/IRJMETS72440',
  url: 'https://doi.org/10.56726/IRJMETS72440',
};

export const languages = [
  { name: 'Tamil', level: 'Native' },
  { name: 'English', level: 'Professional' },
];
