import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {TanStackRouterVite} from '@tanstack/router-vite-plugin'
import path from 'path'

export default defineConfig(({mode}) => {
	const env: Record<string, string | number> = loadEnv(mode, process.cwd())
	return {
		plugins: [
			react(),
			TanStackRouterVite(),
		],
		base: './',
		server: {
			port: Number(env.VITE_LOCALHOST_PORT),
			open: !!env.VITE_DEV_OPEN_BROWSER,
		},
		preview: {
			host: true,
			port: Number(env.VITE_CLIENT_PORT)
		},
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
