CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: 1234)
INSERT INTO users (username, password_hash, role)
VALUES ('admin', '$2b$10$bnwtPubRafgpkxRTUMu3He5V4eP8rF9YXNKwMFVBeuFXZOtvVWphC', 'admin')
ON CONFLICT (username) DO NOTHING;