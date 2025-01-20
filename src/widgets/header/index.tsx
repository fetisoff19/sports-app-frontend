import {Link} from '@tanstack/react-router'
import {DesktopMenu, DesktopMenuButton, MobileMenu, MobileMenuIcon, UploadProgressBar} from '@/features/header'

export const Header = () => {
	return (
		<div className="navbar bg-base-100 drawer shadow-2xl gap-4 z-20 h-16">
			<MobileMenuIcon/>
			<MobileMenu/>
			<div className="flex justify-center w-full pl-2 mr-[4.5rem] lg:m-0 lg:block lg:w-fit">
				<Link
					to="/"
					className="text-white text-2xl hover:bg-inherit font-logo tracking-wide hover:text-white hover:drop-shadow-xl"
				>
					SportsApp
				</Link>
			</div>
			<DesktopMenu/>
			<UploadProgressBar/>
			<DesktopMenuButton/>
		</div>
	)
}
