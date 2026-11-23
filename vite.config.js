import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' gera caminhos relativos, para o app funcionar tanto em
// localhost quanto numa subpasta do GitHub Pages (usuario.github.io/repositorio/).
export default defineConfig({
  base: './',
  plugins: [react()],
});
