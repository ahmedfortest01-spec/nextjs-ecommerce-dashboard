const mongoose = require('mongoose');

async function resetDb() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MONGODB_URI not defined in .env.local');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB...');

    // Drop users collection
    await mongoose.connection.collection('users').drop();
    console.log('✓ Users collection dropped successfully');

    await mongoose.disconnect();
    console.log('✓ Database reset complete!');
  } catch (error) {
    if (error.message.includes('ns not found')) {
      console.log('✓ Collection does not exist (this is fine)');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

resetDb();
