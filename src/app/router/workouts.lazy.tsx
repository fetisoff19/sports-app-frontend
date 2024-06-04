import {createLazyFileRoute} from '@tanstack/react-router'
import Workouts from '@/pages/workouts.tsx'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import Login from '@/pages/login.tsx'

export const Route = createLazyFileRoute('/workouts')({
	component: () => {
		const isAuth = useStore(authStore, (state) => state.isAuth)
		if (isAuth) {
			return <Workouts/>
		}
		return <Login/>
	}
})
