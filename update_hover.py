import os
import glob
import re

css_to_replace = """    .logo img {
        /* Premium Background Hover Mechanics */
        border-radius: 100px;
        padding: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s, background-color 0.4s, padding 0.4s !important;
    }

    .logo img:hover {
        transform: scale(1.05) !important;
        background-color: #ffffff;
        padding: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .footer-logo img:hover {
        transform: scale(1.05) !important;
    }"""

files = glob.glob('*.html')
count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # regex to replace the existing hover block
    pattern = r'\.logo img:hover,\s*\.footer-logo img:hover\s*\{\s*transform:\s*scale\(1\.05\)\s*!important;\s*\}'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, css_to_replace, content)
        with open(f, 'w', encoding='utf-8') as out:
            out.write(new_content)
        count += 1

print(f"Updated {count} HTML files.")
