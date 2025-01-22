import {Auth, Motivation, Register} from '@/widgets/login/'
import {useState} from 'react'

const Login = () => {
	const [isRegister, setRegister] = useState<boolean>(false)
	
	return (
		<div className="bg-[url('/auth-bg-mobile.webp')] md:bg-[url('/auth-bg-desktop.webp')]
			bg-center bg-cover bg-no-repeat h-screen w-screen fixed"
		>
			<div className="absolute top-0 h-[calc(100vh-4rem)] w-screen overflow-y-auto overflow-x-hidden
				flex flex-col items-center justify-between"
			>
				<div className="flex flex-col justify-between gap-8 md:flex-row leading-6 max-w-[1200px] p-8">
					<div className="rounded-2xl p-8 bg-base-100/85 max-w-96 shadow-xl h-fit">
						{isRegister ? <Register setRegister={setRegister}/> : <Auth setRegister={setRegister}/>}
					</div>
					<div className="rounded-2xl p-8 bg-base-100/85 max-w-96 shadow-xl md:max-w-full">
						<Motivation/>
					</div>
				</div>
				<div className="text-sm text-center w-full text-gray-200 pb-8 lg:text-right lg:pr-10">
					photo by{' '}
					<a className="link hover:text-white" href="https://www.pexels.com/@pavel-danilyuk">Pavel Danilyuk</a>
				</div>
			</div>
		</div>
	)
}

export default Login

