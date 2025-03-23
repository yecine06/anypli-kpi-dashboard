import { spawn } from 'child_process';
import fs from 'fs';

// Copy .env.test to .env for development
try {
  fs.copyFileSync('.env.test', '.env');
  console.log('Using test database configuration (.env.test → .env)');
} catch (error) {
  console.error('Error copying .env.test to .env:', error);
  process.exit(1);
}

// Start the development server
console.log('Starting development server...');
const devProcess = spawn('npm', ['run', 'dev:all'], { stdio: 'inherit', shell: true });

devProcess.on('error', (error) => {
  console.error('Failed to start development server:', error);
});

process.on('SIGINT', () => {
  console.log('Stopping development server...');
  devProcess.kill('SIGINT');
  process.exit(0);
});
