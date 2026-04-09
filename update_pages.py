import re

def update_html_file(filename, has_products=False):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update header
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
"""
    
    if has_products:
        base_css += """
        .capabilities-card {
            background-color: var(--color-navy-light);
            color: var(--color-white);
            padding: 2.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(2, 26, 63, 0.15) !important;
            border: 1px solid rgba(212, 168, 67, 0.2);
        }
        
        .capabilities-list li::before {
            content: '\\2713';
            color: var(--color-gold);
            font-weight: bold;
            font-size: 1.2rem;
            position: absolute;
            left: 0;
            top: 0px;
        }
        
        .product-block {
            background-color: var(--color-white);
            border-radius: 12px;
            padding: 2.5rem;
            margin-bottom: 3rem;
            border: 1px solid rgba(0,0,0,0.05);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
            align-items: center;
        }
        
        @media (max-width: 992px) {
            .product-block {
                grid-template-columns: 1fr;
            }
        }
        
        .product-block:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(2, 26, 63, 0.08);
            border-color: rgba(212, 168, 67, 0.3);
        }
        
        .product-img-wrapper img {
            transition: transform 0.6s ease;
        }
        
        .product-block:hover .product-img-wrapper img {
            transform: scale(1.05);
        }
"""
    else:
        base_css += """
        .project-card {
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 12px;
            overflow: hidden;
            background: var(--color-white);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
        }
        
        .project-card img {
            transition: transform 0.6s ease;
        }
        
        .project-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(2, 26, 63, 0.08);
            border-color: rgba(212, 168, 67, 0.3);
        }
        
        .project-card:hover img {
            transform: scale(1.05);
        }
        
        .project-tag {
            background-color: rgba(212, 168, 67, 0.1) !important;
            color: var(--color-gold) !important;
        }
"""

    if has_products:
        content = re.sub(r'\.capabilities-card \{[^}]+\}', '', content)
        content = re.sub(r'\.capabilities-list li::before \{[^}]+\}', '', content)
        content = content.replace('border-bottom: 2px solid var(--color-green);', 'border-bottom: 2px solid var(--color-gold);')
        content = content.replace('style="color: var(--color-green);"', 'style="color: var(--color-gold);"')

    # Inject base CSS into the head
    if '</style>' in content[:content.find('</head>')]:
        # find the last style in head
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

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_html_file('manufacturing.html', True)
update_html_file('projects.html', False)
print('Done!')
