/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config
export default defineConfig({
    base: '/rmg-palette/',
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        '@reduxjs/toolkit',
                        'react-redux',
                        'react-i18next',
                    ],
                    mantine: ['@mantine/core', '@mantine/hooks', '@railmapgen/mantine-components'],
                },
            },
        },
    },
    test: {
        globals: true,
        root: './src/',
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        watch: false,
        coverage: {
            provider: 'v8',
            exclude: coverageConfigDefaults.exclude,
            skipFull: true,
        },
    },
});
