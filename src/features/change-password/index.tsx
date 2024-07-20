import {Dispatch, FormEvent, SetStateAction} from 'react'

type Props = {
	currentPassword?: string,
	setCurrentPassword?: Dispatch<SetStateAction<string>>,
	newPassword: string,
	setNewPassword: Dispatch<SetStateAction<string>>,
	repeatNewPassword: string,
	setRepeatNewPassword: Dispatch<SetStateAction<string>>,
	onChangePassword: () => void
	onClose: () => void
}

export const ChangePassword = (
	{
		currentPassword,
		setCurrentPassword,
		newPassword,
		setNewPassword,
		repeatNewPassword,
		setRepeatNewPassword,
		onChangePassword,
		onClose
	}: Props) => {
	const isEqual = newPassword.length > 7 && newPassword === repeatNewPassword
	const isShort = !!newPassword.length && !!repeatNewPassword.length && (setCurrentPassword && !!currentPassword?.length)
		&& (newPassword.length < 8 || repeatNewPassword.length < 8 || (!!setCurrentPassword && currentPassword?.length < 8))
	const isInputError = !!newPassword.length && !!repeatNewPassword.length && (isShort || !isEqual)
	
	async function changePassword(e: FormEvent) {
		e.preventDefault()
		onChangePassword()
	}
	
	return (
		<div className="flex flex-col gap-8 w-full px-8">
			<h3>Enter your current and new password</h3>
			{setCurrentPassword && <input type="password" min="8" placeholder="Current password"
                                    onChange={e => setCurrentPassword(e.target.value)} value={currentPassword}
                                    className={`input input-bordered rounded-2xl w-full ${isShort && 'input-error'}`}/>}
			<input type="password" min="8" placeholder="New password"
			       onChange={e => setNewPassword(e.target.value)}
			       className={`input input-bordered rounded-2xl w-full ${isInputError && 'input-error'}`}
			       value={newPassword}/>
			<label className="w-full">
				<input type="password" min="8" placeholder="Repeat new password"
				       onChange={e => setRepeatNewPassword(e.target.value)}
				       className={`input input-bordered rounded-2xl w-full ${isInputError && 'input-error'}`}
				       value={repeatNewPassword}/>
				<div className="label h-4 py-6">
							<span className="label-text text-red-300">
								{isInputError && (isShort ? 'Use at least 8 characters' : !isEqual ? `Passwords aren't equal` : '')}
							</span>
				</div>
			</label>
			<div className="flex flex-row gap-4 justify-end">
				<button className="btn btn-neutral w-32" onClick={onClose}>
					Cancel
				</button>
				<button className="btn btn-success w-32" onClick={changePassword}
				        disabled={!isEqual || (currentPassword !== undefined && currentPassword.length < 8)}>
					Success
				</button>
			</div>
		</div>
	)
}
