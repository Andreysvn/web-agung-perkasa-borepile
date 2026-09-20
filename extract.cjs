const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\Asus\\.gemini\\antigravity\\brain\\1aa83abe-20dd-4c18-9aae-e56f0ef59ce3\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = data.split('\n');

for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'write_to_file' && call.args.CodeContent && call.args.CodeContent.includes('import pageData from \'../../../../data/harga-diameter/30cm.json\'')) {
                    fs.writeFileSync('recovered_30cm.astro', call.args.CodeContent);
                    console.log('Found and wrote 30cm/index.astro!');
                    break;
                }
            }
        }
    } catch(e) {}
}
