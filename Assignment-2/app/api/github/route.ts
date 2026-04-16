import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'atharvez';
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'NextJS-Portfolio-App'
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }

    const data = await response.json();

    const repos = data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      updated_at: repo.updated_at
    }));

    return NextResponse.json(repos);
  } catch (error: any) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
