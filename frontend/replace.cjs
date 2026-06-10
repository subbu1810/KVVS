const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/bg-\[#030303\]/g, 'bg-white')
      .replace(/text-slate-100/g, 'text-slate-900')
      .replace(/text-white/g, 'text-black')
      .replace(/text-slate-200/g, 'text-slate-800')
      .replace(/text-slate-300/g, 'text-slate-700')
      .replace(/text-slate-400/g, 'text-slate-600')
      .replace(/bg-slate-900/g, 'bg-slate-100')
      .replace(/bg-slate-950/g, 'bg-slate-50');
      
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});

let indexHtml = path.join(__dirname, 'index.html');
if (fs.existsSync(indexHtml)) {
  let content = fs.readFileSync(indexHtml, 'utf8');
  let newContent = content
    .replace(/bg-\[#030303\]/g, 'bg-white')
    .replace(/text-slate-100/g, 'text-slate-900');
  if (content !== newContent) {
    fs.writeFileSync(indexHtml, newContent, 'utf8');
    console.log('Updated', indexHtml);
  }
}
