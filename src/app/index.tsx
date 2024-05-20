import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/app/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import '@/app/index.css';

const queryClient = new QueryClient()
const router = createRouter({routeTree})

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition={"bottom-right"}/>
		</QueryClientProvider>
	)
}

