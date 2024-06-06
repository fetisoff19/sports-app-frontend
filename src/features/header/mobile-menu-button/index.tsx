import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'

export const MobileMenuIcon = () => {
	const user = useStore(authStore, (state) => state.user)
	
	function handleDrawerClick() {
		const elem = document.getElementById('header-drawer') as HTMLInputElement
		if (elem?.checked) {
			elem?.click()
		}
	}
	
	if (user) return (
		<>
			<input id="header-drawer" type="checkbox" className="drawer-toggle" onClick={handleDrawerClick}/>
			<div className="drawer-content lg:hidden pr-2">
				<label htmlFor="header-drawer" className="drawer-button btn btn-square btn-ghost hover:text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
					     className="inline-block w-5 h-5 stroke-current">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
					</svg>
				</label>
			</div>
		</>
	)
}
