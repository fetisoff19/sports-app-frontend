import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {TanStackRouterVite} from '@tanstack/router-vite-plugin'
import path from 'path'

export default defineConfig(() => {
	return {
		plugins: [
			react(),
			TanStackRouterVite(),
		],
		base: './',
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@app': path.resolve(__dirname, 'src/app'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@widgets': path.resolve(__dirname, 'src/widgets'),
				'@features': path.resolve(__dirname, 'src/features'),
				'@entities': path.resolve(__dirname, 'src/entities'),
				'@shared': path.resolve(__dirname, 'src/shared'),
			}
		}
	}
})
