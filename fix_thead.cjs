const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/modules/**/*.tsx');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace bg-[#164399]/5 with bg-[#f0f4fa]
    const oldBg = /bg-\[\#164399\]\/5/g;
    if (oldBg.test(content)) {
        content = content.replace(oldBg, 'bg-[#f0f4fa]');
    }

    // 2. Find <thead className="sticky top-0 z-10 shadow-sm"> and similar without bg
    const theadRegex = /<thead\s+className="([^"]*)"/g;
    content = content.replace(theadRegex, (match, classes) => {
        if (!classes.includes('bg-')) {
            return `<thead className="${classes} bg-[#f0f4fa]"`;
        }
        return match;
    });
    
    // Also "Tất cả các ô trạng thái toàn APP: Bo tròn 4 góc 50." -> implies rounded-full 
    // Usually they are in span.inline-flex.px-2.py-0.5.rounded-md format. Let's find common patterns.
    // E.g., rounded, rounded-sm, rounded-md, rounded-xl inside inline-flex that are statuses
    // For safety, I'll do this in a separate pass.
    
    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        console.log(`Updated Thead ${file}`);
    }
});
