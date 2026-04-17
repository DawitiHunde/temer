const fs = require('fs');
const path = require('path');

const directory = 'C:\\Users\\Dawiti\\Desktop\\Temer';

const files = [
    "blog-top-10-areas.html",
    "blog-house-price.html",
    "blog-sarbet-vs-piassa.html",
    "blog-how-to-buy-property.html",
    "blog-house-price-buy-smart.html",
    "blog-investment-tips.html",
    "blog-buying-mistakes.html",
    "blog-best-renting-areas.html",
    "blog-why-choose-temer.html"
];

let successCount = 0;

for (const file of files) {
    const filePath = path.join(directory, file);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // This regex looks for the Get Started Today div with flexible whitespace matching
        const targetRegex = /(<div\s+style="[^\"]*background:\s*var\(--gray-light\)[^\"]*">\s*<h3[^>]*>📞 Get Started Today<\/h3>)/i;

        const internalLinkBlock = `<div style="margin-top: 30px; margin-bottom: 20px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fafafa;">
                        <h4 style="color: var(--dark); font-size: 18px; margin-bottom: 10px;">🏠 Explore Our Properties</h4>
                        <p style="margin-bottom: 0; line-height: 1.6;">Browse our <a href="apartments-for-sale.html" style="color: var(--gold); font-weight: bold; text-decoration: underline;">Premium Apartments</a> and <a href="houses-for-sale.html" style="color: var(--gold); font-weight: bold; text-decoration: underline;">Houses for Sale</a>. Discover top investment locations like <a href="sarbet.html" style="color: var(--gold); text-decoration: underline;">Sarbet</a>, <a href="piassa.html" style="color: var(--gold); text-decoration: underline;">Piassa</a>, and <a href="bole.html" style="color: var(--gold); text-decoration: underline;">Bole</a>.</p>
                    </div>

                    $1`;

        if (targetRegex.test(content) && !content.includes('Explore Our Properties')) {
            content = content.replace(targetRegex, internalLinkBlock);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully updated: ${file}`);
            successCount++;
        } else {
            console.log(`Skipped or not found in: ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
}

console.log(`\nUpdated ${successCount} out of ${files.length} files.`);
