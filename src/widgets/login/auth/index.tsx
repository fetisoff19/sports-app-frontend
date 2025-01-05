import {useAuth, useChangePassword, useLogin} from '@/entities/auth/api/queries'
import {Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from 'react'
import {EmailIcon, GithubIcon, GoogleIcon, PasswordIcon} from '@/shared/svg'
import {useSearch} from '@tanstack/react-router'
import {SERVER_URL} from '@/shared/api'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {Modal} from '@/shared/ui'
import {openModal} from '@/shared/lib'
import {useAuthPasswordRecovery} from '@/entities/auth/api/queries/use-auth-password-recovery.ts'
import {ChangePassword} from '@/features/change-password'
import {addNotify} from '@/entities/notify'
import axios from 'axios'

type Props = {
	setRegister: Dispatch<SetStateAction<boolean>>
}

export const Auth = ({setRegister}: Props) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [repeatNewPassword, setRepeatNewPassword] = useState<string>('')
	const {mutate: login} = useLogin()
	const {mutate: recoveryMutate} = useAuthPasswordRecovery()
	const {mutateAsync: changePassword} = useChangePassword()
	const ref = useRef<HTMLInputElement>(null)
	const {refetch} = useAuth()
	
	const {token} = useSearch({strict: false})
	const {recovery} = useSearch({strict: false})
	
	const isAuth = useStore(authStore, (state) => state.isAuth)
	
	const dialogSetEmailId = 'setEmail'
	const dialogSetPasswordId = 'setPassword'
	
	useEffect(() => {
		if (token?.length && !isAuth) {
			localStorage.setItem('token', token)
			window.history.replaceState(null, '', '/')
			refetch()
		}
	}, [refetch, token, isAuth])
	
	useEffect(() => {
		if (recovery?.length && !isAuth) {
			openModal(dialogSetPasswordId)
		}
	}, [isAuth, recovery, refetch])
	
	function onSubmit(e: FormEvent) {
		e.preventDefault()
		login({email, password})
	}
	
	function authWithGoogle() {
		window.location.href = `${SERVER_URL}/api/auth/google/callback`
	}
	
	function authWithGithub() {
		window.location.href = `${SERVER_URL}/api/auth/github/callback`
	}
	
	function recoveryPassword() {
		if (ref?.current?.checkValidity()) {
			recoveryMutate({email})
		}
	}
	
	async function onChangePassword() {
		try {
			const res = await changePassword({new: newPassword, token: recovery})
			if (res) {
				const dialog = document.getElementById(dialogSetPasswordId) as HTMLDialogElement | null
				if (dialog) {
					dialog.blur()
				}
				window.history.replaceState(null, '', '/')
			}
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				addNotify({type: 'error', message: e?.response?.data?.message || e?.message})
			}
		}
	}
	
	function closeModal() {
		const dialog = document.activeElement as HTMLLinkElement
		if (dialog) {
			dialog.blur()
		}
	}
	
	return (
		<>
			<Modal
				id={dialogSetEmailId}
				text={'Enter your email, witch you used when registration'}
				handleConfirm={recoveryPassword}
			>
				<label className="input flex items-center gap-2 border-none">
					<EmailIcon/>
					<input
						ref={ref}
						type="email"
						placeholder="Email"
						value={email}
						required={true}
						name="email"
						autoComplete="on"
						pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
						className="min-w-24 text-sm"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
			</Modal>
			<Modal id={dialogSetPasswordId} showCloseBtn={false}>
				<ChangePassword onClose={closeModal}
				                onChangePassword={onChangePassword}
				                newPassword={newPassword} setNewPassword={setNewPassword}
				                repeatNewPassword={repeatNewPassword} setRepeatNewPassword={setRepeatNewPassword}/>
			</Modal>
			<div className="flex flex-col items-center w-full h-fit text-sm gap-8">
				<form onSubmit={onSubmit} className="flex flex-col items-center w-full h-fit gap-8">
					<div className="flex flex-col gap-4">
						<label className="input flex items-center gap-2 border-none">
							<EmailIcon/>
							<input
								type="email"
								name="email"
								autoComplete="on"
								className="min-w-24 text-sm"
								placeholder="Email"
								value={email}
								required={true}
								pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label className="input flex items-center gap-2 border-none">
							<PasswordIcon/>
							<input
								type="password"
								name="password"
								autoComplete="on"
								className="min-w-24 text-sm"
								value={password}
								minLength={8}
								required={true}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
					</div>
					<div className="link disabled hover:text-white" onClick={() => openModal(dialogSetEmailId)}>
						Forgot password?
					</div>
					<button className="btn btn-success btn-wide rounded-2xl" type="submit">Login!</button>
				</form>
				<div className="">
					Don’t have an account?{' '}
					<span className="link hover:text-white " onClick={() => setRegister(() => true)}>
						Sign Up!
					</span>
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
		</>
	)
}
