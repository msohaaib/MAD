const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const chrome =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const html = path.join(__dirname, 'SRS_v2.html');
const pdf = path.join(__dirname, 'SRS_v2.pdf');

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  `--print-to-pdf=${pdf}`,
  '--no-pdf-header-footer',
  `file://${html}`,
]);

if (!fs.existsSync(pdf) || fs.statSync(pdf).size < 1000) {
  throw new Error('PDF was not created');
}

console.log('Wrote', pdf, fs.statSync(pdf).size, 'bytes');
