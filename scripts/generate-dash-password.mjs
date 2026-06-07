import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = createInterface({ input, output });

const password = await rl.question('Dashboard password: ');
rl.close();

if (!password || password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const salt = randomBytes(16).toString('base64url');
const hash = scryptSync(password, salt, 64).toString('base64url');

console.log(`DASH_ADMIN_PASSWORD_HASH=scrypt$${salt}$${hash}`);
console.log(`DASH_COOKIE_SECRET=${randomBytes(32).toString('base64url')}`);
