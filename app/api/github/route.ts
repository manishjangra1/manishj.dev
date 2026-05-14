import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'manishjangra1'; // Default or from settings

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

const GET_CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      bio
      avatarUrl
      company
      location
      twitterUsername
      websiteUrl
      followers {
        totalCount
      }
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          pushedAt
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
        startedAt
        endedAt
      }
    }
  }
`;

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: GET_CONTRIBUTIONS_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL Errors:', data.errors);
      return NextResponse.json({ error: 'Failed to fetch from GitHub GraphQL API' }, { status: 500 });
    }

    // Also fetch recent events via REST for activity timeline
    const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=20`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    const events = await eventsResponse.json();

    return NextResponse.json({
      user: data.data.user,
      events: events,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
