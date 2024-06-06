import {createRootRouteWithContext, Outlet, ScrollRestoration} from '@tanstack/react-router'
import {Header} from '@/widgets/header'
import {useEffect} from 'react'
import {useAuth} from '@/entities/auth/api/queries'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import classnames from 'classnames'
import {notifyStore} from '@/entities/notify'
import {QueryClient} from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	component: () => {
		const toasts = useStore(notifyStore, state => state.toasts)
		const isAuth = useStore(authStore, (state) => state.isAuth)
		const {refetch} = useAuth()
		
		useEffect(() => {
			if (isAuth) {
				refetch()
			}
		}, [isAuth, refetch])
		
		return (
			<>
				<Header/>
				<div className="flex h-full justify-center items-center no-scrollbar">
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
					<ScrollRestoration/>
					<Outlet/>
				</div>
			</>
		)
	}
})
