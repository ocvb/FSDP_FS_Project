import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import obfuscator from 'rollup-plugin-obfuscator';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            emitError: false,
            failOnError: false,
        }),
        // obfuscator({
        //     global: true,
        // }),
    ],
    server: {
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: '3000',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@api': path.resolve(__dirname, './src/api'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
        },
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes('node_modules')) {
    //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //         }
    //       },
    //     },
    //   },
    // },
});
