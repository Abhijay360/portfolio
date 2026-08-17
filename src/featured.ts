export type FeaturedProject = {
  repo: string
  title: string
  blurb: string
  tags: string[]
  stack: string
  liveUrl?: string
  githubUrl?: string
  image: string
  images?: string[]
  accent: string
  coAuthor?: string
}

export function githubUrlFor(project: FeaturedProject): string {
  return project.githubUrl ?? `https://github.com/Abhijay360/${project.repo}`
}

/** Hand-tuned featured college projects with live deploy URLs. */
export const FEATURED: FeaturedProject[] = [
  {
    repo: 'CUTC-Hackathon-2026',
    title: 'BenchPilot',
    blurb:
      'CUTC Transform Hackathon experiment advisor — Gaussian Process + Expected Improvement suggests the next trial, with a BenchPilot vs random-search demo.',
    tags: ['Python', 'FastAPI', 'React'],
    stack: 'Python, FastAPI, React, scikit-learn',
    liveUrl: 'https://benchpilot-web.onrender.com',
    githubUrl: 'https://github.com/RatnabhK/CUTC-Hackathon-2026',
    image: '/projects/benchpilot.jpg',
    images: ['/projects/benchpilot.jpg', '/projects/benchpilot-demo.jpg'],
    accent: '#2DD4BF',
    coAuthor: 'Ratnabh',
  },
  {
    repo: 'pitchcast',
    title: 'PitchCast',
    blurb:
      'Premier League season predictor — Dixon-Coles + Monte Carlo on Transfermarkt data, with goalscorer odds and a FastAPI dashboard.',
    tags: ['Python', 'FastAPI', 'Monte Carlo'],
    stack: 'Python, FastAPI, Monte Carlo',
    liveUrl: 'https://pitchcast.onrender.com',
    image: '/projects/pitchcast.jpg',
    accent: '#1F6F5B',
  },
  {
    repo: 'aetherguard',
    title: 'AetherGuard',
    blurb:
      'Orbital safety platform for conjunction assessment and evasive maneuvers — SGP4 propagation, collision probability, and a 3D operator globe.',
    tags: ['Python', 'Three.js', 'SGP4'],
    stack: 'Python, Three.js, SGP4',
    liveUrl: 'https://aetherguard-8hc9.onrender.com',
    image: '/projects/aetherguard.jpg',
    accent: '#2A5A8C',
    coAuthor: 'Aryan',
  },
  {
    repo: 'flight-delay-predictor',
    title: 'Flight Delay Predictor',
    blurb:
      'Flags high delay risk before airlines update status by joining live NOAA TAF weather with scheduled flights on an animated 3D globe.',
    tags: ['Python', 'FastAPI', 'NOAA'],
    stack: 'Python, FastAPI, NOAA',
    liveUrl: 'https://flight-delay-predictor-v6eb.onrender.com',
    image: '/projects/flight-delay.jpg',
    accent: '#B85C38',
  },
  {
    repo: 'HackUmass-Umatch-Dorms',
    title: 'UMatch',
    blurb:
      'HackUMass dorm & roommate recommender — Next.js questionnaire paired with a FastAPI ranking engine over UMass housing data.',
    tags: ['TypeScript', 'Next.js', 'FastAPI'],
    stack: 'TypeScript, Next.js, FastAPI',
    liveUrl: 'https://umatch.onrender.com',
    image: '/projects/umatch.jpg',
    accent: '#8B1E3F',
  },
]
