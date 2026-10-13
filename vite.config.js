import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHubActions ? '/Dearly/' : '/',
})
