import {useAuth, useLogin} from '@/entities/auth/api/queries'
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react'
import {EmailIcon, GithubIcon, GoogleIcon, PasswordIcon} from '@/shared/svg'
import {useSearch} from '@tanstack/react-router'
import {SERVER_URL} from '@/shared/api'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'

type Props = {
	setRegister: Dispatch<SetStateAction<boolean>>
}

export const Auth = ({setRegister}: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	
	const {mutate} = useLogin()
	const {refetch} = useAuth()
	
	const {token} = useSearch({strict: false})
	const isAuth = useStore(authStore, (state) => state.isAuth)
	
	
	useEffect(() => {
		if (token?.length && !isAuth) {
			localStorage.setItem('token', token)
			window.history.replaceState(null, '', '/')
			refetch()
		}
	}, [refetch, token, isAuth])
	
	function onSubmit(e: FormEvent) {
		e.preventDefault()
		mutate({email, password})
	}
	
	function authWithGoogle() {
		window.location.href = `${SERVER_URL}/api/auth/google/callback`
	}
	
	function authWithGithub() {
		window.location.href = `${SERVER_URL}/api/auth/github/callback`
	}
	
	return (
		<div className="flex flex-col items-center w-full h-fit text-sm gap-8">
			<form onSubmit={onSubmit} className="flex flex-col items-center w-full h-fit gap-8">
				<div className="flex flex-col gap-4">
					<label className="input flex items-center gap-2 border-none">
						<EmailIcon/>
						<input type="text" className="min-w-24 text-sm" placeholder="Email" value={email} required={true}
						       onChange={(e) => setEmail(e.target.value)}/>
					</label>
					<label className="input flex items-center gap-2 border-none">
						<PasswordIcon/>
						<input type="password" className="min-w-24 text-sm" value={password} minLength={8}
						       required={true}
						       onChange={(e) => setPassword(e.target.value)}/>
					</label>
				</div>
				<div className="link disabled hover:text-white pointer-events-none text-gray-600">
					Forgot password?
				</div>
				<button className="btn btn-success btn-wide rounded-2xl" type="submit">Login!</button>
			</form>
			<div className="">
				Don’t have an account?{' '}
				<a className="link hover:text-white " onClick={() => setRegister(() => true)}
				>Sign Up!
				</a>
			</div>
			<div className="flex flex-col gap-2">
				<button className="btn btn-outline outline-8 btn-wide rounded-2xl hover:text-white" onClick={authWithGoogle}>
					<GoogleIcon/>
					Continue with Google
				</button>
				<button
					className="btn btn-outline outline-8 btn-wide rounded-2xl hover:text-white" onClick={authWithGithub}>
					<GithubIcon/>
					Continue with Github
				</button>
			</div>
			<div className="text-gray-600">
				Would you like to inspect app?
			</div>
			<button className="btn btn-success btn-wide rounded-2xl btn-disabled">View App</button>
		</div>
	)
}
