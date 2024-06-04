import {createLazyFileRoute} from '@tanstack/react-router'
import Settings from '@/pages/settings.tsx'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import Login from '@/pages/login.tsx'

export const Route = createLazyFileRoute('/settings')({
	component: () => {
		const isAuth = useStore(authStore, (state) => state.isAuth)
		if (isAuth) {
			return <Settings/>
		}
		return <Login/>
	}
})
