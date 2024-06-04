import {createLazyFileRoute} from '@tanstack/react-router'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import Stats from '@/pages/stats'
import Login from '@/pages/login.tsx'

export const Route = createLazyFileRoute('/stats')({
	component: () => {
		const isAuth = useStore(authStore, (state) => state.isAuth)
		if (isAuth) {
			return <Stats/>
		}
		return <Login/>
	}
})
