export const profile = {
  name: 'Aryan Maheshwari',
  role: 'Product Engineer',
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

// Flagship product case study, shown right after the hero. Chapter and decision times are seconds
// into the demo video, so "Watch" links land on the moment each decision shows up in the product.
export const featured = {
  name: 'Self-Serve Fashion',
  eyebrow: 'Case study · Built solo, 0 → 1',
  title: 'an AI stylist that decides what you wear',
  problem:
    'Most men find putting outfits together harder than it should be, and wardrobe apps make it worse: they hand you a catalog to maintain and a blank canvas to fill. I wanted the opposite. Open the app, and today’s outfit is already picked from clothes you own, matched to your coloring and the forecast.',
  bet: 'The bet: make the decision for him. Everything else in the app exists to make that one answer better.',
  facts: [
    { label: 'My role', value: 'Solo: product, design, engineering' },
    { label: 'Platform', value: 'Installable PWA, phone-first' },
    { label: 'Stack', value: 'React 19, TypeScript, FastAPI, Claude' },
    { label: 'AI', value: '4 agents, each with a rule-based fallback' },
  ],
  video: {
    src: '/projects/self-serve-fashion/demo.mp4',
    poster: '/projects/self-serve-fashion/poster.jpg',
    duration: 95.6,
    label:
      'Screen recording of Self-Serve Fashion on a phone: signing up, color analysis from a selfie, making an avatar, adding clothes, then the daily outfit, week plan, styling and sponsored picks.',
  },
  chapters: [
    { t: 0, label: 'Sign up & colors' },
    { t: 12.1, label: 'Avatar' },
    { t: 20.5, label: 'Closet in seconds' },
    { t: 31.3, label: 'Routine & weather' },
    { t: 41.8, label: 'Today’s outfit' },
    { t: 61.2, label: 'Closet & week plan' },
    { t: 73.4, label: 'Styling' },
    { t: 84.5, label: 'Sponsored picks' },
  ],
  decisions: [
    {
      title: 'Answer, don’t ask',
      body: 'The home screen isn’t a closet or a feed. It’s one outfit, worn by your avatar, next to today’s forecast, with the rest of the week a tap away.',
      tradeoff: 'Less browsing up front. Swap and the Style tab are there for people who want to choose.',
      t: 41.8,
    },
    {
      title: 'Make photographing your closet optional',
      body: 'Photographing a whole wardrobe is the main reason people abandon these apps. So you can tap the staples you own instead (oxford shirt, chinos, white sneakers) and get outfits immediately. In the demo, 11 pieces go in in about ten seconds.',
      tradeoff: 'Generic illustrations instead of your clothes, until you swap in real photos.',
      t: 20.5,
    },
    {
      title: 'Value before effort',
      body: 'Setup is four short steps, about three minutes, ending in a ready outfit. Every step can be skipped and finished later, it resumes where you left off, and skipping everything still lands on a useful screen.',
      tradeoff: 'Thinner profiles at first, so every agent has to work with partial data.',
      t: 0,
    },
    {
      title: 'Plan around real life',
      body: 'The planner picks an outfit per day against the local forecast and your weekday routine, avoids repeats, and sends a morning reminder in your time zone. When it tops up the week, it never changes a day you’ve already seen.',
      tradeoff: 'More planning logic in exchange for a plan people can trust.',
      t: 68.2,
    },
    {
      title: 'Sponsored, never pay-to-rank',
      body: 'Partner brands pay to be eligible, but picks are ranked purely on fit: gaps in your closet and colors that suit you. Budget never affects order, and every pick is labeled Sponsored with a plain-language disclosure.',
      tradeoff: 'Brands can’t buy the top slot. A stylist you can’t trust isn’t worth paying for.',
      t: 84.5,
    },
    {
      title: 'AI with a floor',
      body: 'Claude handles color analysis, styling and shopping with schema-constrained output. Every agent also has a rule-based fallback (pixel analysis plus classic menswear rules), so the morning outfit never fails because an API did. Every run is logged with the provider used.',
      tradeoff: 'Two implementations per agent to maintain.',
      t: 73.4,
    },
  ],
  cuts: [
    { what: '3D avatar', why: 'A 2D avatar delivers the “see it on you” moment now. 3D needs an avatar service or a custom pipeline.' },
    { what: 'Pinterest API', why: 'Needs an approved developer app and per-user OAuth. A curated inspiration library links out instead.' },
    { what: 'Real payments', why: 'Campaigns are marked paid in test mode. A Stripe webhook is the swap-in.' },
    { what: 'Push & email', why: 'Reminders arrive in-app and as browser notifications first. Web Push plugs into one service.' },
    { what: 'App Store', why: 'An installable PWA ships today. Wrapping it with Capacitor comes once people use it.' },
  ],
  craft: [
    { what: 'Accessible', why: 'WCAG AA contrast, large touch targets, AI-written alt text for every garment, and text size, contrast and motion settings that follow the account.' },
    { what: 'Inclusive avatar', why: 'Five builds, ten skin tones or one matched from the selfie, seven hairstyles, and wheelchair or cane options.' },
    { what: 'Private', why: 'Location data is stripped from uploads, photos are only served to their owner, and deleting an account deletes its photos.' },
    { what: 'Written-down design', why: 'A design doc every screen follows: black and white structure, one copper accent that means “you can act here”, native patterns.' },
  ],
  build: [
    'Frontend: React 19 and TypeScript, an installable PWA with a tab bar on phones and a sidebar on desktop. Sheets are built on the native <dialog> for focus handling.',
    'Backend: Python, FastAPI and SQLAlchemy 2 across 17 tables, with SQLite in development and MySQL in production.',
    'Agents: color (selfie to seasonal palette, plus a verdict for every garment), styling (outfits for an occasion from your own closet), shopping (sponsored picks ranked on fit) and planner (up to 14 days against the forecast).',
    'Weather: Open-Meteo forecasts become a warmth target, outerwear and rain needs, and plain-language tips that every agent uses.',
    'Tests: 26 API and agent tests, plus Playwright browser tests at phone and desktop sizes, in light and dark, each run against a throwaway database.',
  ],
  repo: 'https://github.com/aryanmaheshwari/self-serve-fashion',
};

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
  { group: 'Product', items: ['Discovery calls', 'Scoping & prioritization', 'UX & interaction design', 'Design systems', 'Onboarding & activation', 'PWAs'] },
  { group: 'AI & Agents', items: ['Claude', 'OpenAI', 'LangChain', 'LangGraph', 'Multi-agent orchestration', 'Eval set design', 'Tool-using agents', 'MCP servers', 'RAG', 'Context engineering', 'Prompt design'] },
  { group: 'ML & Data', items: ['PyTorch', 'MLflow', 'Time-series forecasting', 'Batch inference', 'Feature engineering'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Component libraries', 'WCAG 2.1 AA', 'ARIA', 'i18n / l10n', 'Jest', 'Playwright'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Python', 'FastAPI', 'SQLAlchemy', 'Django', 'PostgreSQL', 'MongoDB', 'MySQL'] },
  { group: 'Platforms', items: ['AWS', 'CI/CD', 'GitHub', 'GitLab', 'Jira', 'Agile'] },
];
