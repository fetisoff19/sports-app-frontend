import {Link} from '@tanstack/react-router'
import {DesktopMenu, DesktopMenuButton, MobileMenu, MobileMenuIcon, UploadProgressBar} from '@/features/header'

export const Header = () => {
	return (
		<div className="navbar bg-base-100 drawer fixed shadow-2xl gap-4 z-20">
			<MobileMenuIcon/>
			<MobileMenu/>
			<div className="flex-0">
				<Link
					to="/"
					className="text-white btn-ghost text-2xl font-bold hover:bg-inherit hover:text-white hover:drop-shadow-xl"
				>
					LOGO
				</Link>
			</div>
			<DesktopMenu/>
			<UploadProgressBar/>
			<DesktopMenuButton/>
		</div>
	)
}
