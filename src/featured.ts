export type FeaturedProject = {
  repo: string
  title: string
  blurb: string
  tags: string[]
  liveUrl: string
  accent: string
}

/** Hand-tuned featured college projects with live deploy URLs. */
export const FEATURED: FeaturedProject[] = [
  {
    repo: 'pitchcast',
    title: 'PitchCast',
    blurb:
      'Premier League season predictor — Dixon-Coles + Monte Carlo on Transfermarkt data, with goalscorer odds and a FastAPI dashboard.',
    tags: ['Python', 'FastAPI', 'Monte Carlo'],
    liveUrl: 'https://pitchcast.onrender.com',
    accent: '#1F6F5B',
  },
  {
    repo: 'aetherguard',
    title: 'AetherGuard',
    blurb:
      'Orbital safety platform for conjunction assessment and evasive maneuvers — SGP4 propagation, collision probability, and a 3D operator globe.',
    tags: ['Python', 'Three.js', 'SGP4'],
    liveUrl: 'https://aetherguard.onrender.com',
    accent: '#2A5A8C',
  },
  {
    repo: 'flight-delay-predictor',
    title: 'Flight Delay Predictor',
    blurb:
      'Flags high delay risk before airlines update status by joining live NOAA TAF weather with scheduled flights on an animated 3D globe.',
    tags: ['Python', 'FastAPI', 'NOAA'],
    liveUrl: 'https://flight-delay-predictor-v6eb.onrender.com',
    accent: '#B85C38',
  },
  {
    repo: 'HackUmass-Umatch-Dorms',
    title: 'UMatch',
    blurb:
      'HackUMass dorm & roommate recommender — Next.js questionnaire paired with a FastAPI ranking engine over UMass housing data.',
    tags: ['TypeScript', 'Next.js', 'FastAPI'],
    liveUrl: 'https://umatch.onrender.com',
    accent: '#8B1E3F',
  },
]
