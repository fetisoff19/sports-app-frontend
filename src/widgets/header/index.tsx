import {Link} from "@tanstack/react-router";
import {useStore} from "@tanstack/react-store";
import {authStore} from "@/entities/auth/model";
import {useLogout} from "@/entities/auth/api/queries";
import {notifyStore, removeAllFiles, setUploading} from "@/entities/notify";
import {Clear} from "@/shared/svg";
import {UPLOAD} from "@/entities/workout";

export const Header = () => {
	const user = useStore(authStore, (state) => state.user);
	const files = useStore(notifyStore, state => state.files);
	const isUploading = useStore(notifyStore, state => state.isUploading)
	const status = files.length && (files.filter(({status}) => status !== "added").length) / files.length * 100

	const {refetch} = useLogout()

	function handleLogoutClock() {
		refetch()
		handleDrawerClick()
		handleDropdownClick()
	}

	function handleDrawerClick() {
		const elem = document.getElementById('my-drawer-1') as HTMLInputElement
		if (elem?.checked) {
			elem?.click();
		}
	}

	function handleDropdownClick() {
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur();
		}
	}

	function clearFileList() {
		setUploading(false)
		removeAllFiles()
	}

	function openModal() {
		const dialog = document.getElementById(UPLOAD) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}

	const Progress = () => !!files.length && <div>
		{isUploading && <div className="btn btn-ghost btn-circle group" onClick={clearFileList}><Clear/></div>}
      <div className="btn btn-ghost" onClick={openModal}>
          <progress className="progress w-40" value={status} max="100"></progress>
      </div>
  </div>

	return (
		<div className="navbar bg-base-100 drawer fixed z-10 shadow-2xl gap-2">
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
                      <img alt="Tailwind CSS Navbar component"
                           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                  </div>
              </div>
              <ul tabIndex={0}
                  className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                      <a className='pointer-events-none p-3'>
												{user?.login || 'fetisoff19@gmail.com'}
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
		</div>
	);
};
