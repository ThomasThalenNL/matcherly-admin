// Minimal admin dashboard showing repo name, branch, commit hash, timestamp.

import fs from 'fs';
import path from 'path';

export default async function DashboardPage() {
  // Read current status from ADMIN_STATUS.md
  const statusFile = path.resolve(process.cwd(), 'ADMIN_STATUS.md');
  let repoName = 'matcherly-admin';
  let branch = 'unknown';
  let commit = 'unknown';
  let timestamp = new Date().toISOString();
  
  try {
    const content = fs.readFileSync(statusFile, 'utf-8');
    branch = content.match(/Current branch:\n(.+)/)?.[1]?.trim() || branch;
    commit = content.match(/Last commit hash:\n(.+)/)?.[1]?.trim() || commit;
  } catch (e) {
    // fallback: could not read status file
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>Repository: {repoName}</li>
        <li>Current branch: {branch}</li>
        <li>Last commit hash: {commit}</li>
        <li>Timestamp: {timestamp}</li>
      </ul>
    </main>
  );
}
