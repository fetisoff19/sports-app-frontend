import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from '@/app/routeTree.gen.ts'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import '@/app/index.css'
import {DefaultCatchBoundary} from '@/pages/error.tsx'
import {NotFound} from '@/pages/not-found.tsx'
import {PendingComponent} from '@/shared/ui'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		},
	},
})

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
	defaultErrorComponent: DefaultCatchBoundary,
	defaultNotFoundComponent: NotFound,
	defaultPendingComponent: PendingComponent,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
})

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition={'bottom-left'}/>
		</QueryClientProvider>
	)
}

