export interface GitHubData {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
    followers: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: Array<{
        name: string;
        description: string;
        stargazerCount: number;
        forkCount: number;
        url: string;
        languages: {
          edges: Array<{
            size: number;
            node: { name: string; color: string };
          }>;
        };
        repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
        pushedAt: string;
      }>;
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            date: string;
            color: string;
          }>;
        }>;
      };
    };
  };
  events: Array<any>;
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const response = await fetch('/api/github');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch GitHub data');
  }
  return response.json();
}

export function getLanguageStats(repos: any[]) {
  const stats: Record<string, { size: number; color: string }> = {};
  repos.forEach(repo => {
    repo.languages.edges.forEach((edge: any) => {
      const { name, color } = edge.node;
      if (!stats[name]) {
        stats[name] = { size: 0, color };
      }
      stats[name].size += edge.size;
    });
  });
  return Object.entries(stats)
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10);
}
