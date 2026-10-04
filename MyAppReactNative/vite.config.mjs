import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const extensions = [
  '.web.mjs', '.mjs',
  '.web.js', '.js',
  '.web.ts', '.ts',
  '.web.tsx', '.tsx',
  '.web.jsx', '.jsx',
  '.json',
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: /^react-native$/, replacement: 'react-native-web'},
    ],
    extensions,
  },
  optimizeDeps: {
    rolldownOptions: {
      resolve: {
        extensions,
      },
    },
  },
});