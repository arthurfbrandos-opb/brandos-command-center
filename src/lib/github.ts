const GITHUB_USER = 'arthurfbrandos-opb';

const getHeaders = () => ({
  'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
});

export interface CommitInfo {
  sha: string;
  commit: {
    message: string;
    author: { date: string };
  };
}

export async function getLastCommit(repo: string): Promise<CommitInfo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits?per_page=1`,
      { headers: getHeaders(), cache: 'no-store' }
    );
    if (!res.ok) return null;
    const commits = await res.json();
    return commits[0] || null;
  } catch { return null; }
}
