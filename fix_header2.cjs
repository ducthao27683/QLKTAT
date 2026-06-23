const fs = require('fs');
let file = 'src/shared/components/layout/Header.tsx';
let content = fs.readFileSync(file, 'utf8');

/*
<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative"> setShowNotifications(!showNotifications)}
            >
*/

content = content.replace(
    /<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative"> setShowNotifications\(!showNotifications\)\}\s*>/g,
    '<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative" onClick={() => setShowNotifications(!showNotifications)}>'
);

content = content.replace(
    /<button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative"> setShowUserMenu\(!showUserMenu\)\}\s*>/g,
    '<button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-200 overflow-hidden cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>'
);

fs.writeFileSync(file, content);
console.log('Fixed header 2');
