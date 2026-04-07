const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
});

const mongoose = require('mongoose');

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('🔍 Testing MongoDB Connection...');
    console.log('URI:', uri ? uri.substring(0, 50) + '...' : 'Not found');

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully!');
    
    // List all databases
    const admin = mongoose.connection.getClient().db('admin');
    const databases = await admin.admin().listDatabases();
    console.log('\n📦 Available Databases:');
    databases.databases.forEach(db => {
      console.log(`  - ${db.name}`);
    });

    // Create a test collection
    const testCollection = mongoose.connection.collection('users');
    console.log('\n✅ Users collection ready');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  }
}

testConnection();
