// Minimal multi-repo admin dashboard: matcherly-admin & clawbot-infra.
// Toont naam, branch, laatste commit hash, timestamp. Haalt data uit status-bestanden.

import fs from 'fs';
import path from 'path';

function loadMatcherlyAdmin() {
  const statusPath = path.resolve(process.cwd(), 'ADMIN_STATUS.md');
  let branch = 'unknown';
  let commit = 'unknown';
  let timestamp = '-'; // niet in ADMIN_STATUS.md
  try {
    const content = fs.readFileSync(statusPath, 'utf-8');
    branch = content.match(/Current branch:\n(.+)/)?.[1]?.trim() || branch;
    commit = content.match(/Last commit hash:\n(.+)/)?.[1]?.trim() || commit;
  } catch {/* ignore */}
  return { name: 'matcherly-admin', branch, commit, timestamp };
}

function loadClawbotInfra() {
  const statusPath = path.resolve(process.cwd(), '../clawbot-infra/ops/REPO_STATUS.md');
  let branch = '-'; // niet in status file
  let commit = 'unknown';
  let timestamp = 'unknown';
  try {
    const content = fs.readFileSync(statusPath, 'utf-8');
    commit = content.match(/Last commit hash:\n(.+)/)?.[1]?.trim() || commit;
    timestamp = content.match(/Date\/time of check:\n(.+)/)?.[1]?.trim() || timestamp;
  } catch {/* ignore */}
  return { name: 'clawbot-infra', branch, commit, timestamp };
}

export default async function DashboardPage() {
  const repos = [loadMatcherlyAdmin(), loadClawbotInfra()];
  return (
    <main>
      <h1>Admin Dashboard (multi-repo)</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.name}>
            <b>{repo.name}</b>
            <ul>
              <li>Branch: {repo.branch}</li>
              <li>Last commit hash: {repo.commit}</li>
              <li>Timestamp: {repo.timestamp}</li>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
