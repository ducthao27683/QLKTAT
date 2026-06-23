const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'modules', 'thiet-bi', 'ThietBiDuPhongScreen.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add attachments field to RegistrationTicket interface
content = content.replace(
  /items: SpareItem\[\];/,
  `items: SpareItem[];\n  attachments?: {name: string; size: string}[];`
);

// 3. Update handleSaveForm
content = content.replace(
  /status: isSubmit \? 'Đăng ký' : 'Dự thảo'\n\s*\};/,
  `status: isSubmit ? 'Đăng ký' : 'Dự thảo',\n      attachments: formDocs\n    };`
);

// 4. Update handleOpenForm 'add' 
content = content.replace(
  /notes: '',\n\s*items: \[\]/,
  `notes: '',\n          items: [],\n          attachments: []`
);
// And also setFormDocs([]) when add.
content = content.replace(
  /setFormOverlay\(\{\n\s*mode: 'add',/,
  `setFormDocs([]);\n      setFormOverlay({\n        mode: 'add',`
);

// Update handleOpenForm 'edit'/'view'/'approve'
content = content.replace(
  /const target = ticketToUse \|\| selectedTicket;\n\s*if \(\!target\) return;\n\s*setFormOverlay\(\{/,
  `const target = ticketToUse || selectedTicket;\n      if (!target) return;\n      setFormDocs(target.attachments || []);\n      setFormOverlay({`
);

// Update initial formDocs to be empty
content = content.replace(
  /const \[formDocs, setFormDocs\] = useState<\{name: string; size: string\}\[\]>\(\[[\s\S]*?\]\);/,
  `const [formDocs, setFormDocs] = useState<{name: string; size: string}[]>([]);`
);

fs.writeFileSync(file, content);
console.log("Attachments feature fixed.");
