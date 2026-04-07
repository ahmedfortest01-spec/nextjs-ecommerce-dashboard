const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');

// Parse properly
const lines = envFile.split('\n');
const env = {};
lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const index = trimmed.indexOf('=');
    if (index > 0) {
      const key = trimmed.substring(0, index);
      const value = trimmed.substring(index + 1);
      env[key] = value;
    }
  }
});

console.log('Environment Variables:');
console.log('MONGODB_URI:', env.MONGODB_URI);
console.log('JWT_SECRET:', env.JWT_SECRET);

// Check if URI is valid
if (!env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not found in .env.local');
  process.exit(1);
}

if (!env.MONGODB_URI.includes('ecommerce_db')) {
  console.error('ERROR: MONGODB_URI does not contain database name "ecommerce_db"');
  console.log('Expected format: mongodb+srv://user:pass@host/ecommerce_db?retryWrites=true&w=majority');
  process.exit(1);
}

console.log('✅ Configuration looks good!');
