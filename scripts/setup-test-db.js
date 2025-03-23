import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Setting up test database...');

// Check if Docker is installed
exec('docker --version', (error) => {
  if (error) {
    console.error('Docker is not installed or not in PATH. Please install Docker first.');
    process.exit(1);
  }

  // Create mysql-data directory if it doesn't exist
  if (!fs.existsSync('mysql-data')) {
    fs.mkdirSync('mysql-data');
    console.log('Created mysql-data directory');
  }

  // Start the MySQL container
  console.log('Starting MySQL container...');
  exec('docker-compose up -d', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting MySQL container: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    
    console.log(stdout);
    console.log('MySQL container started successfully');
    console.log('');
    console.log('Test database is now available at:');
    console.log('Host: localhost');
    console.log('Port: 3306');
    console.log('Database: anyrh');
    console.log('Username: user');
    console.log('Password: password');
    console.log('');
    console.log('You can now run the application with:');
    console.log('node scripts/start-dev.js');
  });
});
