import {createRootRouteWithContext, Outlet, ScrollRestoration} from '@tanstack/react-router'
import {useEffect} from 'react'
import {useAuth} from '@/entities/auth/api/queries'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import classnames from 'classnames'
import {notifyStore} from '@/entities/notify'
import {QueryClient} from '@tanstack/react-query'
import {Header} from '@/widgets/header'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: () => {
		const toasts = useStore(notifyStore, state => state.toasts)
		const isAuth = useStore(authStore, (state) => state.isAuth)
		const user = useStore(authStore, (state) => state.user)
		const {refetch} = useAuth()
		
		useEffect(() => {
			if (isAuth && !user) {
				refetch()
			}
		}, [user, isAuth, refetch])
		
		return (
			<>
				<Header/>
				<div className="w-screen h-screen">
					<ScrollRestoration/>
					<Outlet/>
				</div>
				{!!toasts?.length && <div className="fixed top-0 left-0 z-50">
          <div className="toast toast-top toast-center w-full max-w-[1200px] whitespace-normal px-8">
						{toasts.map(toast =>
							<div
								key={toast.uuid}
								className={classnames({
									'alert font-bold': true,
									'alert-info': toast.type === 'info',
									'alert-success': toast.type === 'success',
									'alert-error': toast.type === 'error',
								})}
							>
								<span>{toast.message}</span>
							</div>)}
          </div>
        </div>}
			</>
		)
	}
})
