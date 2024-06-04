import {Auth, Motivation, Register} from '@/widgets/login/'
import {useState} from 'react'

const Login = () => {
	const [isRegister, setRegister] = useState<boolean>(false)
	
	return (
		<div
			className="bg-[url('/auth-bg-mobile.jpg')] md:bg-[url('/auth-bg-desktop.jpg')] md:h-[calc(100vh-4rem)] w-full bg-cover bg-center bg-fixed flex flex-col items-center justify-between">
			<div className="flex flex-col gap-8 m-8 md:flex-row leading-6 max-w-[1200px]">
				<div className="rounded-2xl p-8 bg-base-100/85 h-fit max-w-96 sm:max-w-80 shadow-xl">
					{isRegister ? <Register setRegister={setRegister}/> : <Auth setRegister={setRegister}/>}
				</div>
				<div className="rounded-2xl p-8 bg-base-100/85 h-fit shadow-xl">
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


// const Login = () => {
// 	return (
// 		<>
// 			<picture className="object-cover absolute h-screen w-screen z-1">
// 				<source
// 					type="image/webp"
// 					media="(max-width: 768px)"
// 					srcSet="/login-bg-mobile.jpg"
// 				/>
// 				<img src="/login-bg-desktop.jpg" alt="background"/>
// 			</picture>
// 			<div
// 				className="absolute h-full top-16 flex flex-col items-center justify-between z-10">
// 				<div className="flex flex-col gap-8 m-8 md:flex-row leading-6 max-w-[1200px]">
// 					<div className="rounded-2xl p-8 bg-base-100/85 h-fit max-w-96 sm:max-w-80">
// 						<AuthRegister/>
// 					</div>
// 					<div className="rounded-2xl p-8 bg-base-100/85 h-fit">
// 						<Motivation/>
// 					</div>
// 				</div>absolute
// 				<div className="text-sm text-center w-full text-gray-200 pb-4 lg:text-right lg:pr-10">
// 					photo by{' '}
// 					<a className="link hover:text-white" href="https://www.pexels.com/@pavel-danilyuk">Pavel Danilyuk</a>
// 				</div>
// 			</div>
// 		</>
//
// 	)
// }
