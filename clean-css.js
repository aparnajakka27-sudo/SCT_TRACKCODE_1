const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Remove massive block comment dividers like:
// /* ==================================================
//    1. THEME TOGGLE (Light/Dark Mode)
// ================================================== */
css = css.replace(/\/\* ={10,}\s+(.*?)\s+={10,} \*\//g, '/*  */');

// Same for any other similar blocks
css = css.replace(/\/\* ={10,}\s*(.*?)\s*={10,} \*\//g, '/*  */');

fs.writeFileSync('css/style.css', css);
console.log('CSS dividers cleaned');
