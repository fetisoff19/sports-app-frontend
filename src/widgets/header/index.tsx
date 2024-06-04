import {Link} from '@tanstack/react-router'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {useLogout} from '@/entities/auth/api/queries'
import {notifyStore, removeAllFiles, setUploading} from '@/entities/notify'
import {ClearIcon} from '@/shared/svg'
import {UPLOAD} from '@/entities/workout'
import {Modal} from '@/shared/ui'
import {Upload} from '@/widgets/upload'
import classnames from 'classnames'

export const Header = () => {
	const user = useStore(authStore, (state) => state.user)
	const files = useStore(notifyStore, state => state.files)
	const isUploading = useStore(notifyStore, state => state.isUploading)
	const status = files.length && (files.filter(({status}) => status !== 'added').length) / files.length * 100
	
	const {refetch} = useLogout()
	
	function handleLogoutClock() {
		refetch()
		handleDrawerClick()
		handleDropdownClick()
	}
	
	function handleDrawerClick() {
		const elem = document.getElementById('my-drawer-1') as HTMLInputElement
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
	
	function clearFileList() {
		if (isUploading) {
			setUploading(false)
			removeAllFiles()
		}
	}
	
	function openModal() {
		const dialog = document.getElementById(UPLOAD) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}
	
	const Progress = () => !!files.length && <div>
    <div className={classnames({
			'btn btn-ghost btn-circle group opacity-0': true,
			'opacity-100': isUploading,
			'hover:cursor-default': !isUploading,
		})} onClick={clearFileList}>
      <ClearIcon/>
    </div>
    <div className="btn btn-ghost p-2 no-animation" onClick={openModal}>
      <progress className="progress w-32 sm:w-40" value={status} max="100"/>
    </div>
  </div>
	
	
	return (
		<div className="navbar bg-base-100 drawer fixed z-10 shadow-2xl gap-4">
			<input id="my-drawer-1" type="checkbox" className="drawer-toggle" onClick={handleDrawerClick}/>
			{user && <div className="drawer-content lg:hidden pr-2">
        <label htmlFor="my-drawer-1" className="drawer-button btn btn-square btn-ghost hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </label>
      </div>}
			<div className="drawer-side top-16 lg:hidden">
				<label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"/>
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
						<a className="p-3" onClick={openModal}>
							Add Workout
						</a>
					</li>
					<li>
						<div className="divider pointer-events-none h-1"></div>
					</li>
					<li>
						<div className="avatar pointer-events-none">
							<div className="w-5 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
								/>
							</div>
							<span className="avatar p-3">
								{user?.login || 'fetisoff19@gmail.com'}
							</span>
						</div>
					</li>
					<li onClick={handleDrawerClick} className="px-10">
						<Link to="/settings" className="[&.active]:text-white p-3 ">
							Settings
						</Link>
					</li>
					<li onClick={handleLogoutClock} className="px-10">
						<a className="p-3">
							Logout
						</a>
					</li>
				</ul>
			</div>
			<div className="flex-0">
				<Link
					to="/"
					className="text-white btn-ghost text-2xl font-bold hover:bg-inherit hover:text-white hover:drop-shadow-xl"
				>
					LOGO
				</Link>
			</div>
			{user && <div className="flex-1 px-3 gap-3 hidden lg:flex " onClick={handleDrawerClick}>
        <Link to="/"
              className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl">
          Overview
        </Link>
        <Link to="/workouts"
              className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl">
          Workouts
        </Link>
        <Link to="/stats"
              className="[&.active]:text-white btn-ghost text-xl hover:bg-inherit hover:text-white hover:drop-shadow-xl">
          Stats
        </Link>
      </div>}
			<Progress/>
			{user && <div className="flex-none gap-2 hidden lg:block">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
							{user?.image ? <img alt="Tailwind CSS Navbar component" src={user.image}/>
								: <div className="flex items-center justify-center h-full text-lg bg-gray-600">
									{user?.email?.[0]?.toUpperCase()}
								</div>
							}
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
      </div>}
			<Modal id={UPLOAD} text={'Drop files on format .fit here or select'} showCloseBtn={false}>
				<Upload/>
			</Modal>
		</div>
	)
}
