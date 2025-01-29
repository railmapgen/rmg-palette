/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config
export default defineConfig({
    base: '/rmg-palette/',
    plugins: [
        react(),
        legacy({
            targets: ['defaults', '>0.2%', 'not dead'],
            modernPolyfills: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux', 'react-i18next'],
                    chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion', 'react-icons'],
                    mantine: ['@mantine/core', '@mantine/hooks'],
                },
            },
        },
    },
    test: {
        globals: true,
        root: './src/',
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        server: {
            deps: {
                fallbackCJS: false,
            },
        },
        watch: false,
    },
});
