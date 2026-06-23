const fs = require('fs');

let file = 'src/shared/components/layout/Header.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<buttonrounded-lg>/g, '<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative">');
content = content.replace(/<buttonrounded-lg> (.*?) \}\}/g, '<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative" onClick={() => $1 }}');
content = content.replace(/<buttonrounded-lg> (.*?)\}/g, '<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative" onClick={() => $1}');

// Also there is probably `<buttonrounded-lg> setShowUserMenu(!showUserMenu)}`
content = content.replace(/<buttonrounded-lg> setShowUserMenu\(!showUserMenu\)\}/g, '<button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-200 overflow-hidden cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}');

fs.writeFileSync(file, content);
console.log('Fixed Header');
