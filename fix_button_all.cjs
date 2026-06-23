const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<buttonrounded-lg>')) {
        content = content.replace(/<buttonrounded-lg> ([\w\s\(!]+\)\})/g, '<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onClick={() => $1');
        content = content.replace(/<buttonrounded-lg> ([A-Za-z0-9_]+\(![A-Za-z0-9_]+\)\})/g, '<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onClick={() => $1');
        
        // Brute force replace
        content = content.replace(/<buttonrounded-lg> setShowBranchTreePopup\(false\)\}/g, '<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onClick={() => setShowBranchTreePopup(false)}');
        content = content.replace(/<buttonrounded-lg> setShowDeviceTreePopup\(false\)>/g, '<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onClick={() => setShowDeviceTreePopup(false)}>');
        
        content = content.replace(/<buttonrounded-lg>/g, '<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">');
        
        fs.writeFileSync(file, content);
    }
});

console.log('Fixed buttonrounded-lg globally');
