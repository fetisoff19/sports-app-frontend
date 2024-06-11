import {Link} from '@tanstack/react-router'
import {UPLOAD} from '@/entities/workout'
import {useLogout} from '@/entities/auth/api/queries'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {UserImage} from '@/features/header/user-image'
import {openModal} from '@/shared/lib'

export const MobileMenu = () => {
	const user = useStore(authStore, (state) => state.user)
	
	const {refetch} = useLogout()
	
	function handleLogoutClock() {
		refetch()
		handleDrawerClick()
		handleDropdownClick()
	}
	
	function handleDropdownClick() {
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur()
		}
	}
	
	function handleDrawerClick() {
		const elem = document.getElementById('header-drawer') as HTMLInputElement
		if (elem?.checked) {
			elem?.click()
		}
	}
	
	return (
		<div className="drawer-side top-16 lg:hidden">
			<label htmlFor="header-drawer" aria-label="close sidebar" className="drawer-overlay"/>
			<ul className="menu p-4 min-w-full min-h-full bg-base-200 text-base-content">
				<li onClick={handleDrawerClick}>
					<Link to="/" className="[&.active]:text-white p-3 ">
						Overview
					</Link>
				</li>
				<li onClick={handleDrawerClick}>
					<Link to="/workouts" className="[&.active]:text-white p-3 ">
						Workouts
					</Link>
				</li>
				<li onClick={handleDrawerClick}>
					<Link to="/stats" className="[&.active]:text-white p-3 ">
						Stats
					</Link>
				</li>
				<li onClick={handleDrawerClick} className="sm:hidden">
					<a className="p-3" onClick={() => openModal(UPLOAD)}>
						Add Workout
					</a>
				</li>
				<li>
					<div className="divider pointer-events-none h-1"></div>
				</li>
				<li>
					<div className="avatar pointer-events-none">
						<div className="w-8 rounded-full">
							<UserImage/>
						</div>
						<span className="avatar p-3">
								{user?.login}
							</span>
					</div>
				</li>
				<li onClick={handleDrawerClick} className="pl-14">
					<Link to="/settings" className="[&.active]:text-white p-3 ">
						Settings
					</Link>
				</li>
				<li onClick={handleLogoutClock} className="pl-14">
					<a className="p-3">
						Logout
					</a>
				</li>
			</ul>
		</div>
	)
}
