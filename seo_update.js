const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USER/Desktop/elixion-prime';
const files = ['index.html', 'about.html', 'services.html', 'industries.html', 'manufacturing.html', 'projects.html', 'contact.html'];

const pageMetadata = {
    'index.html': { title: 'Elixion Prime International | Cleaning, Procurement & Manufacturing', desc: 'Elixion Prime provides professional cleaning services, fumigation, procurement, and manufacturing of consumables in Nigeria.', url: 'https://elixionprimeinternational.com/' },
    'about.html': { title: 'About Us | Elixion Prime International', desc: 'Learn about Elixion Prime International Limited. We are committed to excellence in cleaning, facility management, and supply chain solutions.', url: 'https://elixionprimeinternational.com/about.html' },
    'services.html': { title: 'Professional Cleaning & Fumigation Services | Elixion Prime', desc: 'Top-tier cleaning, fumigation, and pest control services for residential, corporate, and industrial spaces in Lagos and across Nigeria.', url: 'https://elixionprimeinternational.com/services.html' },
    'industries.html': { title: 'Industries We Serve | Elixion Prime', desc: 'Elixion Prime provides tailored cleaning, procurement, and manufacturing solutions across various sectors including corporate, industrial, and residential.', url: 'https://elixionprimeinternational.com/industries.html' },
    'manufacturing.html': { title: 'Manufacturing of Consumables | Elixion Prime', desc: 'We manufacture high-quality consumables including gloves, tissue paper, and sanitary pads for wholesale and distribution.', url: 'https://elixionprimeinternational.com/manufacturing.html' },
    'projects.html': { title: 'Our Projects & Portfolio | Elixion Prime', desc: 'Explore our successful projects in professional cleaning, facility management, and procurement across Nigeria.', url: 'https://elixionprimeinternational.com/projects.html' },
    'contact.html': { title: 'Contact Us | Elixion Prime International', desc: 'Get in touch with Elixion Prime for quotes, service requests, and inquiries. Chat with us on WhatsApp or request a fast quote today.', url: 'https://elixionprimeinternational.com/contact.html' }
};

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    const meta = pageMetadata[file];

    content = content.replace(/<title>.*?<\/title>/gi, `<title>${meta.title}</title>`);
    content = content.replace(/<meta name="description".*?>\n?/gi, '');

    if (!content.includes('og:title')) {
        const seoChunk = `
    <meta name="description" content="${meta.desc}">
    <link rel="canonical" href="${meta.url}">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.desc}">
    <meta property="og:url" content="${meta.url}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://elixionprimeinternational.com/assets/images/logo.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.desc}">
    <meta name="twitter:image" content="https://elixionprimeinternational.com/assets/images/logo.png">
    
    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    
    <!-- Schema Injection -->
    <script src="js/schema.js" defer></script>`;

        content = content.replace(/(<title>.*?<\/title>)/i, `$1\n${seoChunk}`);
    }

    // Replace old phone numbers safely
    content = content.replace(/2349034168823(?!3)/g, '23490341688233');
    content = content.replace(/\+234 903 416 8823(?!\d)/g, '+234 903 416 88233');

    // Defer scripts
    content = content.replace(/<script src="js\/main\.js"><\/script>/g, '<script src="js/main.js" defer></script>');
    content = content.replace(/<script type="module" src="js\/whatsapp\.js"><\/script>/g, '<script type="module" src="js/whatsapp.js" defer></script>');
    content = content.replace(/<script type="module" src="js\/form\.js"><\/script>/g, '<script type="module" src="js/form.js" defer></script>');

    // Defer font
    if (content.includes('fonts.googleapis.com') && !content.includes('display=swap')) {
        content = content.replace(/family=([^"&>]+)(["&>])/g, 'family=$1&display=swap$2');
    }

    // Lazy load images
    let imgRegex = /<img([^>]+)>/gi;
    content = content.replace(imgRegex, (match, p1) => {
        if (p1.includes('loading=') || p1.includes('hero-img') || p1.includes('logo')) {
            return match;
        }
        return `<img${p1} loading="lazy" decoding="async">`;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('SEO updates applied successfully');
