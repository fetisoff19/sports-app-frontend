import {useRegistration} from '@/entities/auth/api/queries'
import {Dispatch, FormEvent, SetStateAction, useState} from 'react'
import {EmailIcon, PasswordIcon} from '@/shared/svg'
import {addNotify} from '@/entities/notify'

type Props = {
	setRegister: Dispatch<SetStateAction<boolean>>
}

export const Register = ({setRegister}: Props) => {
	const {mutateAsync} = useRegistration()
	
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	
	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		try {
			const user = await mutateAsync({email, password})
			if (user) {
				addNotify({type: 'success', message: 'Created successfully!'})
			}
			setRegister(() => false)
		} catch (e: unknown) {
			console.log(e)
		}
	}
	
	
	return (
		<div className="flex flex-col items-center w-full h-fit text-sm gap-8">
			<form onSubmit={onSubmit} className="flex flex-col items-center w-full h-fit gap-8">
				<div className="flex flex-col gap-4">
					<label className="input flex items-center gap-2 border-none">
						<EmailIcon/>
						<input
							type="email"
							className="min-w-24 text-sm"
							placeholder="Email"
							value={email}
							required
							pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label className="input flex items-center gap-2 border-none">
						<PasswordIcon/>
						<input
							type="password"
							className="min-w-24 text-sm"
							value={password}
							minLength={8}
							required={true}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<button className="btn btn-success btn-wide rounded-2xl" type="submit">Sign Up!</button>
			</form>
			<div className="">
				Do you have an account?{' '}
				<span className="link hover:text-white " onClick={() => setRegister(() => false)}>
					Log In!
				</span>
			</div>
		</div>
	)
}
