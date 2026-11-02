import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' so the built dist/ also works from any folder or the old serve.ps1
export default defineConfig({ plugins: [react()], base: './' });
