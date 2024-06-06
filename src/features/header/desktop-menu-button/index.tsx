import {Link} from '@tanstack/react-router'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {useLogout} from '@/entities/auth/api/queries'
import {UserImage} from '@/features/header/user-image'

export const DesktopMenuButton = () => {
	const user = useStore(authStore, (state) => state.user)
	const {refetch} = useLogout()
	
	function handleDrawerClick() {
		const elem = document.getElementById('header-drawer') as HTMLInputElement
		if (elem?.checked) {
			elem?.click()
		}
	}
	
	function handleDropdownClick() {
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur()
		}
	}
	
	function handleLogoutClock() {
		refetch()
		handleDrawerClick()
		handleDropdownClick()
	}
	
	if (user) return (
		<div className="flex-none gap-2 hidden lg:block">
			<div className="dropdown dropdown-end">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<UserImage/>
					</div>
				</div>
				<ul tabIndex={0}
				    className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
					<li>
						<a className="pointer-events-none p-3">
							{user?.login}
						</a>
					</li>
					<li onClick={handleDropdownClick}>
						<Link to="/settings" className="[&.active]:text-white p-3 rounded-xl">
							Settings
						</Link>
					</li>
					<li onClick={handleLogoutClock}>
						<a className="p-3 rounded-xl">
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
