import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// The site lives under /ballons/ on GitHub Pages, so every URL must be relative.
export default defineConfig({
    root: 'src',
    base: './',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                ru: resolve(__dirname, 'src/index.html'),
                en: resolve(__dirname, 'src/en/index.html'),
            },
        },
    },
});
