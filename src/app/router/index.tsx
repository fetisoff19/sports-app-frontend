import {createFileRoute} from '@tanstack/react-router'
import Login from '@/pages/login.tsx'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import Overview from '@/pages/overview.tsx'

export const Route = createFileRoute('/')({
	component: () => {
		const isAuth = useStore(authStore, (state) => state.isAuth)
		
		if (isAuth) {
			return <Overview/>
		}
		return <Login/>
	}
})
