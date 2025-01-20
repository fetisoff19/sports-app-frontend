import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {Link} from '@tanstack/react-router'

export const DesktopMenu = () => {
	const user = useStore(authStore, (state) => state.user)
	
	if (user) {
		return (
			<div className="flex-1 pr-3 gap-3 hidden lg:flex">
				<Link
					to="/"
					className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl"
				>
					Overview
				</Link>
				<Link
					to="/workouts"
					className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl"
				>
					Workouts
				</Link>
				<Link
					to="/stats"
					className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl"
				>
					Stats
				</Link>
			</div>
		)
	}
}
