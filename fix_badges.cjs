const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/modules/**/*.tsx');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // we look for className="..." in general
    // inside the class string, if we see:
    // (bg-amber- | bg-emerald- | bg-green- | bg-red- | bg-blue- | bg-indigo- | bg-sky-)
    // AND (inline-flex OR px-2 px-3 etc)
    // AND (text-[...) or uppercase
    // then replace any rounded-\S+ or \brounded\b with rounded-full
    const regex = /className=(?:\{`|'|")([^`'"]+)(?:`\}|'|")/g;
    
    content = content.replace(regex, (match, classes) => {
        // Look for typical badge class signals
        if (
            (classes.includes('bg-emerald-') || classes.includes('bg-amber-') || classes.includes('bg-red-') || classes.includes('bg-blue-') || classes.includes('bg-sky-') || classes.includes('bg-slate-') || classes.includes('bg-gray-') ) &&
            (classes.includes('text-emerald-') || classes.includes('text-amber-') || classes.includes('text-red-') || classes.includes('text-blue-') || classes.includes('text-sky-') || classes.includes('text-slate-') || classes.includes('text-gray-') || classes.includes('text-[8.5pt]') || classes.includes('text-[8pt]')) &&
            (classes.includes('px-') || classes.includes('py-')) &&
            !classes.includes('w-full') && // Not a full width row or form
            !classes.includes('min-h-screen') && // Not a screen
            !classes.includes('p-6') && !classes.includes('p-8') && // Not a large card
            !classes.includes('absolute') // Often tooltips
        ) {
            // Is it a badge? Usually has text-[8pt] or uppercase
            if ((classes.includes('uppercase') && classes.includes('text-[')) || classes.includes('inline-flex')) {
                // Replace \brounded(-\w+)?\b with rounded-full
                const newClasses = classes.replace(/\brounded(?:-\w+)?\b/g, 'rounded-full');
                return match.replace(classes, newClasses);
            }
        }
        return match;
    });

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        console.log(`Updated badges ${file}`);
    }
});
