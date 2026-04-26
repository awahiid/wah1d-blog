import { readFileSync, writeFileSync } from 'fs';

const path = './src/api/types.gen.ts';
let content = readFileSync(path, 'utf-8');

content = content.replace(
    /export type JsonNode = \{[\s\S]*?\};/,
    `export type JsonNode = string | number | boolean | null | JsonNode[] | { [key: string]: JsonNode };`
);

writeFileSync(path, content);
console.log('✅ JsonNode patched');