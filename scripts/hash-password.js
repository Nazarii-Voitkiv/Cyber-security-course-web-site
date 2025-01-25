const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function hashPassword() {
  const password = process.env.ADMIN_PASSWORD;
  
  if (!password) {
    console.error('Error: ADMIN_PASSWORD not found in environment variables');
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('\nHashed password (add this to your .env.local file):');
    console.log('ADMIN_PASSWORD_HASH=' + hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
    process.exit(1);
  }
}

hashPassword();
