const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USER/Desktop/elixion-prime';
const files = ['index.html', 'about.html', 'services.html', 'industries.html', 'manufacturing.html', 'projects.html', 'contact.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove old multi-line meta descriptions that the first script missed
    content = content.replace(/<meta name="description"[\s\S]*?content="[^"]*">/gi, (match) => {
        // Only keep the newly generated one (which is on a single line and matches our new text)
        if (match.includes('provides professional cleaning') || match.includes('Learn about Elixion') || match.includes('Top-tier cleaning') || match.includes('Get in touch') || match.includes('We manufacture') || match.includes('Explore our successful') || match.includes('provides tailored')) {
            return match; // Keep the good one
        }
        return ''; // Remove the old one
    });

    fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Cleanup applied successfully');
