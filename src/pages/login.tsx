import {Auth, Motivation, Register} from '@/widgets/login/'
import {useState} from 'react'

const Login = () => {
	const [isRegister, setRegister] = useState<boolean>(false)
	
	return (
		<div
			className="bg-[url('/auth-bg-mobile.webp')] md:bg-[url('/auth-bg-desktop.webp')]
			md:h-[calc(100vh-4rem)] bg-cover bg-center overflow-hidden bg-att
			mt-16 w-screen bg-fixed flex flex-col items-center justify-between mx-auto">
			<div className="flex flex-col gap-8 m-8 md:flex-row leading-6 max-w-[1200px]">
				<div className="rounded-2xl p-8 bg-base-100/85 h-fit max-w-96 xs:max-w-80 shadow-xl">
					{isRegister ? <Register setRegister={setRegister}/> : <Auth setRegister={setRegister}/>}
				</div>
				<div className="rounded-2xl p-8 bg-base-100/85 h-fit shadow-xl max-w-96 xs:max-w-80 md:max-w-full">
					<Motivation/>
				</div>
			</div>
			<div className="text-sm text-center w-full text-gray-200 pb-4 lg:text-right lg:pr-10">
				photo by{' '}
				<a className="link hover:text-white" href="https://www.pexels.com/@pavel-danilyuk">Pavel Danilyuk</a>
			</div>
		</div>
	)
}

export default Login

