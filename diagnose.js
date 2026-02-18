const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('--- DIAGNOSTIC SCRIPT START ---');
console.log(`Node version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Arch: ${process.arch}`);

// Check OpenSSL version
exec('openssl version', (error, stdout, stderr) => {
    if (error) {
        console.log(`OpenSSL Error: ${error.message}`);
    }
    if (stderr) {
        console.log(`OpenSSL Stderr: ${stderr}`);
    }
    console.log(`OpenSSL Version: ${stdout || 'Not found'}`);
});

// Check .prisma/client
const prismaDir = path.join(__dirname, 'node_modules', '.prisma', 'client');
console.log(`Checking prisma dir: ${prismaDir}`);

if (fs.existsSync(prismaDir)) {
    console.log('Directory exists.');
    const files = fs.readdirSync(prismaDir);
    console.log('Files in .prisma/client:');
    files.forEach(f => {
        if (f.includes('so.node')) console.log(` - ${f}`);
    });
} else {
    console.error('Directory does NOT exist.');
}

// Try to require index
try {
    const prismaClient = require('./node_modules/.prisma/client/index.js');
    console.log('Successfully required .prisma/client/index.js');
    console.log('Prisma Client Engines:', prismaClient.Prisma.dmmf ? 'DMMF Loaded' : 'No DMMF');
} catch (e) {
    console.error('Error requiring .prisma/client:', e);
}

console.log('--- DIAGNOSTIC SCRIPT END ---');
