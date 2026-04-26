import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://localhost:8080/v3/api-docs',
    output: './src/api',
    plugins: [
        {
            name: '@hey-api/typescript',
            definitions: {
                case: 'preserve',
            },
        },
        {
            name: '@hey-api/sdk',
            operations: {
                strategy: 'byTags',
                containerName: '{{name}}Service',
            },
        }
    ],
});