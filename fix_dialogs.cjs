const fs = require('fs');

const file = 'src/modules/thi-nghiem/components/TestingDialogs.tsx';
let content = fs.readFileSync(file, 'utf8');

// Dialog container
content = content.replace(/max-w-4xl bg-white rounded-full shadow-2xl/g, 'max-w-4xl bg-white rounded-2xl shadow-2xl');

// Action buttons
content = content.replace(/rounded-full bg-green-600/g, 'rounded-lg bg-green-600');
content = content.replace(/hover:bg-gray-100 rounded-full/g, 'hover:bg-gray-100 rounded-lg');
content = content.replace(/hover:bg-gray-200 rounded-full/g, 'hover:bg-gray-200 rounded-lg');
content = content.replace(/bg-pink-600 text-white rounded-full/g, 'bg-pink-600 text-white rounded-lg');
content = content.replace(/hover:bg-gray-50 transition-all uppercase/g, 'hover:bg-gray-50 transition-all uppercase rounded-lg'); // adjust
content = content.replace(/border border-gray-200 text-gray-500 font-bold rounded-full/g, 'border border-gray-200 text-gray-500 font-bold rounded-lg');

// Inputs
content = content.replace(/border-gray-200 rounded-full focus:ring-2/g, 'border-gray-200 rounded-lg focus:ring-2');
content = content.replace(/border-gray-200 rounded-full text-\[11pt\]/g, 'border-gray-200 rounded-lg text-[11pt]');

// Small cards
content = content.replace(/p-3 bg-white rounded-full border/g, 'p-3 bg-white rounded-2xl border');


fs.writeFileSync(file, content);
console.log('Fixed Dialogs screen remaining radius issues');
