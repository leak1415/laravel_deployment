import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['Frontend/src/styles/app.css', 'Frontend/src/app.js'],
            publicDirectory: 'Backend/public',
            refresh: [
                'Backend/app/**',
                'Backend/bootstrap/**',
                'Backend/config/**',
                'Backend/database/**',
                'Backend/resources/views/**',
                'Backend/routes/**',
            ],
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
