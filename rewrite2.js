const fs = require('fs');
let code = fs.readFileSync('js/script.js', 'utf8');

// Remove duplicate sectionObserver block entirely
code = code.replace(/const navObserverOptions = \{[\s\S]*?\}\);\s*\}\);\s*sections\.forEach\(section => \{\s*if \(section\.id\) sectionObserver\.observe\(section\);\s*\}\);/g, '');

// Clean up any remaining multiple blank lines
code = code.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('js/script.js', code);
console.log('Duplicates removed');
