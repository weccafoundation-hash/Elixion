const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\USER\\Desktop\\elixion-prime';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const quoteScript = `window.open(window.buildWaLink('Hello Elixion Prime, I’d like to request a quote. Service: [Cleaning/Fumigation/Procurement/Manufacturing/Energy/Construction]. Location: [ ].'), '_blank'); return false;`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');

    // Replace <script src="main.js"></script> with whatsapp script first
    if (!content.includes('whatsapp.js')) {
        content = content.replace(
            /<script src="js\/main\.js"><\/script>/g,
            `<script type="module" src="whatsapp.js"></script>\n    <script src="main.js"></script>`
        );
    }

    if (!content.includes('whatsapp.js') && !content.includes('js/main.js')) {
        // Fallback if main.js is not present
        console.log(`Warning: js/main.js not found in ${file}`);
    }

    // Replace form.js if present to be module
    content = content.replace(
        /<script src="js\/form\.js"><\/script>/g,
        `<script type="module" src="form.js"></script>`
    );

    // Replace WhatsApp float
    content = content.replace(
        /<a href="[^"]*" class="whatsapp-float"([^>]*)>/g,
        `<a href="https://wa.me/2349034168823" class="whatsapp-float" aria-label="Chat with Elixion on WhatsApp" target="_blank" rel="noopener">`
    );

    // Replace "contact.html" buttons with WhatsApp onClick
    content = content.replace(
        /<a href="contact\.html"([^>]*)class="btn([^"]*)"([^>]*)>/gi,
        `<a href="#" onclick="${quoteScript}" $1class="btn$2"$3>`
    );

    content = content.replace(
        /<a href="manufacturing\.html"([^>]*)class="btn([^"]*)"([^>]*)>Request Quote/gi,
        `<a href="#" onclick="${quoteScript}" $1class="btn$2"$3>Request Quote`
    );

    // Specifically for WhatsApp Us button:
    content = content.replace(
        /<a href="#" class="btn btn-secondary">WhatsApp Us<\/a>/g,
        `<a href="https://wa.me/2349034168823" class="btn btn-secondary" target="_blank" rel="noopener">WhatsApp Us</a>`
    );

    fs.writeFileSync(path.join(dir, file), content, 'utf-8');
});
console.log('HTML files updated.');
