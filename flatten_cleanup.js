const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/USER/Desktop/elixion-prime';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf-8');

    // Fix absolute URLs in open graph/twitter images
    content = content.replace(/content="https:\/\/elixionprimeinternational\.com\/assets\/images\/(.+?)"/g, 'content="https://www.elixionprimeinternational.com/$1"');
    content = content.replace(/content="https:\/\/www\.elixionprimeinternational\.com\/assets\/images\/(.+?)"/g, 'content="https://www.elixionprimeinternational.com/$1"');

    fs.writeFileSync(path.join(rootDir, file), content, 'utf-8');
    console.log("Cleaned " + file);
});
