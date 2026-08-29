import 'server-only';
import { bucketContribution } from '@/lib/utils/format';

export interface GitHubActivityData {
  status: 'ready' | 'error';
  count: number;
  caption: string;
  weeks: number[][];
  profileUrl: string;
  repos: Array<{
    name: string;
    description: string;
    language?: string;
    href: string;
  }>;
}

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const DEFAULT_USERNAME = 'manishjangra1';

const GET_CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      url
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC, isFork: false) {
        nodes {
          name
          description
          url
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

export async function fetchGitHubActivity(username = DEFAULT_USERNAME): Promise<GitHubActivityData> {
  const token = process.env.GITHUB_TOKEN;
  const profileUrl = `https://github.com/${username}`;

  if (!token) {
    console.warn('GITHUB_TOKEN is not configured; degrading GitHub activity section.');
    return {
      status: 'error',
      count: 0,
      caption: 'contributions in the last year',
      weeks: [],
      profileUrl,
      repos: [],
    };
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'manish-portfolio-app',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: GET_CONTRIBUTIONS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub API responded with status ${response.status}`);
      return {
        status: 'error',
        count: 0,
        caption: 'contributions in the last year',
        weeks: [],
        profileUrl,
        repos: [],
      };
    }

    const json = await response.json();

    if (json.errors || !json.data?.user) {
      console.error('GitHub GraphQL Errors:', json.errors);
      return {
        status: 'error',
        count: 0,
        caption: 'contributions in the last year',
        weeks: [],
        profileUrl,
        repos: [],
      };
    }

    const user = json.data.user;
    const calendar = user.contributionsCollection?.contributionCalendar;
    const totalContributions = calendar?.totalContributions ?? 0;

    // Map 53 weeks x 7 days into discrete 0..4 bucket levels
    const rawWeeks: Array<{ contributionDays: Array<{ contributionCount: number }> }> = calendar?.weeks ?? [];
    const normalizedWeeks: number[][] = rawWeeks.map((week) =>
      week.contributionDays.map((day) => bucketContribution(day.contributionCount))
    );

    // Map top 3 repositories
    const rawRepos: Array<{ name: string; description: string | null; url: string; primaryLanguage: { name: string } | null }> =
      user.repositories?.nodes ?? [];
    const normalizedRepos = rawRepos
      .filter((r) => r && r.name)
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        description: r.description || 'Open source engineering repository.',
        language: r.primaryLanguage?.name || 'TypeScript',
        href: r.url,
      }));

    return {
      status: 'ready',
      count: totalContributions,
      caption: 'contributions in the last year',
      weeks: normalizedWeeks,
      profileUrl: user.url || profileUrl,
      repos: normalizedRepos,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub activity:', error);
    return {
      status: 'error',
      count: 0,
      caption: 'contributions in the last year',
      weeks: [],
      profileUrl,
      repos: [],
    };
  }
}
