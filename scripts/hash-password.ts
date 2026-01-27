import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password to hash');
  console.log('Usage: npx tsx scripts/hash-password.ts <your-password>');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('---------------------------------------------------');
console.log('Password:', password);
console.log('Hash (Add this to ADMIN_PASSWORD_HASH in .env):');
console.log(hash);
console.log('---------------------------------------------------');
