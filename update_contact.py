import re

def update_contact_html():
    filename = 'contact.html'
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update header position relative
    content = content.replace('<div class=\"container nav-container\">', '<div class=\"container nav-container\" style=\"position: relative;\">')

    base_css = """
        /* Premium Page Overrides */
        .page-hero {
            position: relative;
            background-color: var(--color-primary) !important;
            background-image: linear-gradient(to right, rgba(2, 26, 63, 0.95) 0%, rgba(2, 26, 63, 0.8) 100%), url('hero-bg.png') !important;
            background-size: cover !important;
            background-position: center !important;
            padding: clamp(8rem, 12vw, 10rem) 0 clamp(4rem, 6vw, 6rem) !important;
            color: var(--color-white) !important;
            margin-top: -80px; /* Pull up behind the transparent header */
            text-align: center;
        }

        .page-hero h1 {
            color: var(--color-white) !important;
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            margin-bottom: 1rem;
            position: relative;
            z-index: 2;
        }

        .page-hero p {
            position: relative;
            z-index: 2;
        }

        .contact-card {
            transition: transform 0.4s ease, box-shadow 0.4s ease !important;
            background: var(--color-white);
            border-radius: 8px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid rgba(0,0,0,0.03);
            will-change: transform;
        }

        .contact-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 20px 40px rgba(2, 26, 63, 0.08) !important;
            border-color: rgba(212, 168, 67, 0.3) !important;
        }

        .form-container {
            border: 1px solid rgba(212, 168, 67, 0.2);
        }
"""
    
    # Inject base CSS into the head
    if '</style>' in content[:content.find('</head>')]:
        head_end = content.find('</head>')
        last_style_idx = content.rfind('</style>', 0, head_end)
        content = content[:last_style_idx] + base_css + '</style>' + content[last_style_idx+8:]
    else:
        content = content.replace('</head>', f'<style>{base_css}</style></head>')

    premium_header_styles = """
    /* Premium Header Layout & Breakout Logo Positioning */
    .header {
        background: rgba(2, 26, 63, 0.9) !important;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .logo {
        position: relative;
        display: flex;
        align-items: center;
        height: 80px; 
        width: 140px; 
    }

    .logo img {
        position: absolute;
        top: 20px; 
        height: 120px !important;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s !important;
        transform-origin: top left;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
        z-index: 1001; 
    }

    @media (max-width: 768px) {
        .logo img {
            height: 80px !important;
            top: 50%;
            transform: translateY(-50%) !important;
        }
    }

    .footer-logo img {
        height: 100px !important;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        transform-origin: center center;
    }

    .logo img:hover,
    .footer-logo img:hover {
        transform: scale(1.05) !important;
    }

    .nav-link {
        color: #fff !important; 
        opacity: 0.9;
    }
    .nav-link:hover, .nav-link.active {
        color: var(--color-gold) !important;
        opacity: 1;
    }
"""

    content = re.sub(r'/\*\s*1\. Logo Size Increase[\s\S]*?(?=\s*/\*\s*[23]\.)', '', content)
    content = re.sub(r'/\*\s*2\. Glassmorphism Navigation Bar[\s\S]*?(?=\s*/\*\s*[34]\.)', premium_header_styles, content)

    # Make target update for the script to handle contact-card
    content = content.replace("h2, .card,", "h2, .card, .contact-card, .form-container,")

    # Replace colors
    content = content.replace('color: var(--color-green);', 'color: var(--color-gold);')
    content = content.replace('color: #25D366;', 'color: var(--color-gold);')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_contact_html()
print('Contact page updated')
