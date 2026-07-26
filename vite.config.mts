import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { coverageConfigDefaults, defaultExclude } from 'vitest/config';

// https://vitejs.dev/config
export default defineConfig({
    base: '/rmg-palette/',
    plugins: [react()],
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { test: /node_modules\/react/, name: 'react' },
                        { test: /node_modules\/@mantine/, name: 'mantine' },
                    ],
                },
            },
        },
    },
    test: {
        globals: true,
        // root: './src/',
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        watch: false,
        coverage: {
            provider: 'v8',
            exclude: coverageConfigDefaults.exclude,
            skipFull: true,
        },
        exclude: [...defaultExclude, 'package/**/*'],
    },
});
