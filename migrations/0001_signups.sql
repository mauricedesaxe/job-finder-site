CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL,
  level TEXT NOT NULL,
  region TEXT NOT NULL,
  looking TEXT NOT NULL DEFAULT '',
  email TEXT
);

CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups (created_at);
