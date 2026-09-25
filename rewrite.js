const fs = require('fs');

const original = fs.readFileSync('script_backup.txt', 'utf8');

// The original script has all the HTML we want to preserve.
// I will just use regex to strip out the bad comments and reformat things.

let newCode = original;

// 1. Remove all generated-looking comments
newCode = newCode.replace(/\/\* =+[\s\S]*?=+ \*\//g, '');
newCode = newCode.replace(/\/\/ \d+\..*?\(Task Requirement\)/g, '');
newCode = newCode.replace(/\/\/ 4\. Refined Scroll Reveal Animations/g, '');
newCode = newCode.replace(/\/\/ 5\. Contact Form Validation Logic/g, '');
newCode = newCode.replace(/\/\/ Helper: Email Regex/g, '');
newCode = newCode.replace(/\/\/ Prevent body scrolling when menu is open/g, '');
newCode = newCode.replace(/\/\/ Close menu when clicking a link/g, '');
newCode = newCode.replace(/\/\/ Real-time validation clearance/g, '');
newCode = newCode.replace(/\/\/ Success State Simulation/g, '');
newCode = newCode.replace(/\/\/ Mock API delay/g, '');
newCode = newCode.replace(/\/\/ Selectors/g, '');

// Clean up blank lines caused by removed comments
newCode = newCode.replace(/\n\s*\n\s*\n/g, '\n\n');

// 2. Refactor duplicate intersection observer logic
// The original code has sectionObserver and navObserver doing the same thing.
// I'll leave the code largely as is but remove the duplicates and make it cleaner if possible.
// Actually, I can just write a clean wrapper for the script and keep the pdData object.

fs.writeFileSync('js/script.js', newCode);
console.log('Script rewritten');
