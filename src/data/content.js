export const profile = {
  name: 'Aryan Maheshwari',
  role: 'Forward Deployed Engineer',
  location: 'San Francisco, CA',
  email: 'aryanmaheshwari@gmail.com',
  github: 'https://github.com/aryanmaheshwari',
  linkedin: 'https://www.linkedin.com/in/aryanmaheshwari',
  resume: '/Aryan_Maheshwari_Resume.pdf',
  openToWork: true,
};

// One greeting per language Aryan speaks — rotated in the hero.
export const greetings = [
  { text: 'Hello', lang: 'en' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'آداب', lang: 'ur', dir: 'rtl' },
  { text: 'Hola', lang: 'es' },
  { text: 'Olá', lang: 'pt' },
];

export const stats = [
  { value: '39%→0%', label: 'unnecessary escalations after an agent fix' },
  { value: '3–4 hrs', label: 'saved per person, per day, for an 8-person ops team' },
  { value: '12', label: 'production agents built or re-architected' },
  { value: '1M+', label: 'subjects handled by Bulk Lock & Freeze' },
];

// Current role, shown in its own section above the Playground.
export const current = {
  company: 'BackOps AI',
  role: 'Forward Deployed Engineer',
  period: 'Feb 2026 — Present',
  intro:
    'I own enterprise accounts end to end at BackOps AI: leading discovery calls, scoping, then shipping and iterating on agentic systems in live customer environments. Three accounts at once, as the sole or primary engineer.',
  items: [
    {
      title: 'Parent–child agent orchestration',
      summary:
        'Designed a LangChain architecture that fans a task out across specialized child agents, pinpoints the exact sub-task that failed, and logs each result. Those traces became eval sets for tracking reliability across multi-step workflows.',
      outcome: 'Evals built from real traces',
      tags: ['LangChain', 'Multi-agent', 'Evals'],
    },
    {
      title: 'Fixing a legacy agent',
      summary:
        'Root-caused a failing legacy agent for our longest-running client and rewrote the logic that was triggering escalations it never needed.',
      outcome: 'Escalations 39% → 0%',
      tags: ['Debugging', 'Agent logic', 'RCA'],
    },
    {
      title: 'Automating bulk actions',
      summary:
        'Spotted a recurring manual workflow during a discovery call I led, then designed an agent that runs it twice a day for the customer’s ops team.',
      outcome: '3–4 hrs/day saved × 8 people',
      tags: ['Discovery', 'Scheduled agents', 'Automation'],
    },
    {
      title: 'Enterprise analytics dashboards',
      summary:
        'Built dashboards for a major account that surface carrier performance rankings and top claim drivers, giving the client insights that directly shaped their strategy.',
      outcome: 'Carrier rankings · claim drivers',
      tags: ['Dashboards', 'Data viz', 'UX'],
    },
  ],
};

export const caseStudies = [
  {
    title: 'Bulk Lock & Freeze',
    company: 'Veeva Systems',
    summary:
      'Led development of a core clinical-trial analytics workflow that locks and freezes data across datasets with more than a million subjects — built to stay reliable and responsive at that scale.',
    outcome: '1M+ subjects per operation',
    tags: ['React', 'TypeScript', 'REST APIs'],
  },
  {
    title: 'Backbone.js → React migration',
    company: 'Veeva Systems',
    summary:
      'Spearheaded moving critical front-end infrastructure off Backbone.js and onto a shared React component architecture, standardizing how multiple teams build analytics products.',
    outcome: '50% faster renders',
    tags: ['React', 'Architecture', 'Performance'],
  },
  {
    title: 'Terabyte-scale collaborative uploads',
    company: 'Veeva Systems',
    summary:
      'Built real-time collaborative interfaces for uploads of up to 1TB, focusing on resilience and keeping the UI responsive while massive transfers are in flight.',
    outcome: 'Up to 1TB per upload',
    tags: ['Real-time', 'Resilience', 'UX'],
  },
];

export const experience = [
  {
    company: 'BackOps AI',
    role: 'Forward Deployed Engineer',
    location: 'San Francisco, CA',
    period: 'Feb 2026 — Present',
    highlights: [
      'Own 3 enterprise accounts at once as sole or primary engineer: managing live deployments, leading discovery calls, and driving agent improvements in parallel.',
      'Designed a parent–child agent orchestration architecture in LangChain that pinpoints the failing sub-task and logs each child agent’s result; built eval sets from those traces to track reliability.',
      'Reduced unnecessary escalations from 39% to 0% for our longest-running client through root cause analysis and targeted agent logic fixes.',
      'Designed a twice-daily automated agent run, found during a discovery call I led, that saves an 8-person ops team 3–4 hours each per day.',
      'Built analytics dashboards for a major enterprise account surfacing carrier performance rankings and top claim drivers.',
      'Built 4 AI agents from scratch and migrated 8 legacy agents to a modern architecture, turning debugging learnings into product improvements.',
    ],
    tags: ['LangChain', 'LangGraph', 'Claude', 'OpenAI', 'Python', 'Evals'],
  },
  {
    company: 'Spare CS',
    role: 'Sr. Frontend & Applied AI Engineer · Founding Engineer',
    location: 'Remote',
    period: 'Aug 2025 — Feb 2026',
    highlights: [
      'Architected a production React component library from zero with WCAG 2.1 AA compliance, ARIA support, and a full i18n/l10n framework: the foundation for all product UI.',
      'Designed and deployed a 24/7 multilingual RAG chatbot on OpenAI APIs for localized, context-aware customer support.',
      'Productionized a PyTorch model delivering predictive insights that improved client retention and informed marketing strategy.',
      'Restructured navigation in core user flows, cutting required click-throughs by 75%.',
    ],
    tags: ['React', 'Node.js', 'OpenAI', 'RAG', 'PyTorch', 'WCAG 2.1 AA'],
  },
  {
    company: 'Veeva Systems',
    role: 'Full-Stack Software Developer',
    location: 'Pleasanton, CA',
    period: 'Aug 2022 — Aug 2025',
    highlights: [
      'Led development of Bulk Lock and Freeze, managing datasets with 1M+ subjects and delivering reliable, performant UIs for core analytics workflows.',
      'Spearheaded the migration of critical infrastructure from Backbone.js to React, standardizing front-end development across teams.',
      'Raised unit test coverage from 40% to 90% with Jest, improving product quality, deployment reliability, and release velocity.',
      'Built real-time collaborative interfaces for large-scale data uploads (up to 1TB), focused on resilience and UI responsiveness.',
      'Designed, built, tested, and delivered scalable front-end solutions for clinical-trial analytics with React, TypeScript, and REST APIs.',
      'Drove automatic language translation across Spanish, Portuguese, French, and Mandarin markets.',
      'Worked with product and design in Agile cycles: presenting designs, reviewing code, and mentoring junior engineers.',
    ],
    tags: ['React', 'TypeScript', 'Jest', 'REST APIs', 'GitLab CI/CD'],
  },
  {
    company: 'IBM',
    role: 'Software Developer Co-op',
    location: 'San Jose, CA',
    period: 'May 2021 — Dec 2021',
    highlights: [
      'Automated key operational processes with Ansible and REST APIs to improve scalability and reliability for internal analytics products.',
      'Modernized deployment pipelines for consistent environment provisioning.',
      'Built up experience in cloud and AI technologies supporting analytics and reporting backends.',
    ],
    tags: ['Ansible', 'REST APIs', 'Cloud'],
  },
];

export const education = {
  school: 'San José State University',
  degree: 'B.S. Computer Science',
  location: 'San Jose, CA',
  period: 'Aug 2019 — Aug 2022',
  coursework: ['Data Structures', 'OOP in Java', 'Unit Testing', 'Artificial Intelligence', 'Machine Learning', 'Python', 'Bioinformatics', 'Game Studies'],
};

export const projects = [
  {
    title: 'AI Chatbot',
    description: 'A chatbot interface that connects to LLM APIs and answers user prompts with contextual responses.',
    language: 'JavaScript',
    tags: ['React', 'LLM APIs', 'Node.js'],
    href: 'https://github.com/aryanmaheshwari/ai-chatbot',
  },
  {
    title: 'Comment Section',
    description: 'A Reddit-style threaded comment system with nested replies and collapsible threads.',
    language: 'JavaScript',
    tags: ['React', 'Recursive UI', 'State'],
    href: 'https://github.com/aryanmaheshwari/comment-section',
  },
  {
    title: 'Weather App',
    description: 'A type-safe React app that fetches current weather data for any city.',
    language: 'TypeScript',
    tags: ['TypeScript', 'React', 'Weather API'],
    href: 'https://github.com/aryanmaheshwari/weatherapp',
  },
  {
    title: 'Employee Directory',
    description: 'A React app for creating, reading, updating, and deleting employee contacts.',
    language: 'JavaScript',
    tags: ['React', 'Bootstrap', 'REST'],
    href: 'https://github.com/aryanmaheshwari/react-crud',
  },
];

export const skills = [
  { group: 'AI & Agents', items: ['Claude', 'OpenAI', 'LangChain', 'LangGraph', 'Multi-agent orchestration', 'Eval set design', 'Tool-using agents', 'MCP servers', 'RAG', 'Context engineering', 'Prompt design'] },
  { group: 'ML & Data', items: ['PyTorch', 'MLflow', 'Time-series forecasting', 'Batch inference', 'Feature engineering'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Component libraries', 'WCAG 2.1 AA', 'ARIA', 'i18n / l10n', 'Jest'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'MySQL'] },
  { group: 'Platforms', items: ['AWS', 'CI/CD', 'GitHub', 'GitLab', 'Jira', 'Agile'] },
];
