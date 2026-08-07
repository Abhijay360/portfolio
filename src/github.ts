export type GithubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
  topics: string[]
  fork: boolean
}

const GITHUB_USER = 'Abhijay360'

/** Pre-college / tutorial noise to keep the college portfolio focused. */
const EXCLUDE = /^(P-\d|p-\d|Golden|Trex|trex|Cake|MyQuiz|C-\d)/i

export async function fetchPublicRepos(): Promise<GithubRepo[]> {
  const repos: GithubRepo[] = []
  let page = 1

  while (page <= 5) {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    )
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`)
    }
    const batch = (await res.json()) as GithubRepo[]
    if (!batch.length) break
    repos.push(...batch)
    if (batch.length < 100) break
    page += 1
  }

  return repos
    .filter((r) => !r.fork && !EXCLUDE.test(r.name))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}
