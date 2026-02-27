const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/USER/Desktop/elixion-prime';

// Directories to search and flatten
const dirsToFlatten = ['css', 'js', 'assets/img', 'assets/icons', 'assets/images'];

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

// 1. Move files
dirsToFlatten.forEach(dir => {
    const fullDirPath = path.join(rootDir, dir);
    if (!fs.existsSync(fullDirPath)) return;

    const allFiles = getAllFiles(fullDirPath);

    allFiles.forEach(file => {
        const fileName = path.basename(file);
        const destPath = path.join(rootDir, fileName);

        // Prevent overwriting if naming collision exists (edge case)
        if (file !== destPath) {
            fs.copyFileSync(file, destPath);
            fs.unlinkSync(file); // Delete original
            console.log(`Moved: ${fileName}`);
        }
    });
});

// Remove empty directories cleanly (bottom-up approach)
function removeEmptyDirs(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            removeEmptyDirs(fullPath);
        }
    });

    // Only remove if empty
    if (fs.readdirSync(dirPath).length === 0) {
        fs.rmdirSync(dirPath);
        console.log(`Removed empty dir: ${dirPath}`);
    }
}

['css', 'js', 'assets'].forEach(dir => {
    removeEmptyDirs(path.join(rootDir, dir));
});

// 2. Update References
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const cssFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.css'));
const jsFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.js') && f !== 'flatten.js' && f !== 'footer_update.js' && f !== 'seo_update.js' && f !== 'cleanup.js' && f !== 'patch_contact.js');
const manifestFiles = ['site.webmanifest']; // Also check json configs

// Helper to replace paths
function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // HTML standard replacers
    content = content.replace(/href="css\/([^"]+)"/g, 'href="$1"');
    content = content.replace(/href="assets\/icons\/([^"]+)"/g, 'href="$1"');
    content = content.replace(/src="js\/([^"]+)"/g, 'src="$1"');
    content = content.replace(/src="assets\/images\/([^"]+)"/g, 'src="$1"');
    content = content.replace(/src="assets\/img\/([^"]+)"/g, 'src="$1"');
    content = content.replace(/content="assets\/images\/([^"]+)"/g, 'content="$1"');
    content = content.replace(/content="assets\/img\/([^"]+)"/g, 'content="$1"');

    // CSS url() replacers
    content = content.replace(/url\(['"]?\.\.\/assets\/img\/([^'"\)]+)['"]?\)/g, 'url(\'$1\')');
    content = content.replace(/url\(['"]?assets\/img\/([^'"\)]+)['"]?\)/g, 'url(\'$1\')');
    content = content.replace(/url\(['"]?\.\.\/assets\/images\/([^'"\)]+)['"]?\)/g, 'url(\'$1\')');
    content = content.replace(/url\(['"]?assets\/images\/([^'"\)]+)['"]?\)/g, 'url(\'$1\')');

    // Manifest replacers
    content = content.replace(/"src":\s*"[./]*assets\/icons\/([^"]+)"/g, '"src": "$1"');

    // JS internal fetch or references (if existing)
    content = content.replace(/['"`]\/?assets\/img\/([^'"`]+)['"`]/g, "'$1'");
    content = content.replace(/['"`]\/?assets\/images\/([^'"`]+)['"`]/g, "'$1'");

    fs.writeFileSync(filePath, content, 'utf-8');
    // console.log(`Updated paths in: ${path.basename(filePath)}`);
}

// Execute replacements
[...htmlFiles, ...cssFiles, ...jsFiles, ...manifestFiles].forEach(file => {
    replaceInFile(path.join(rootDir, file));
});

console.log("Flattening complete! All references updated.");
