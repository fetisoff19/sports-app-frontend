type Props = {
	title: string
	description?: string
	btnText: string
	onClick: () => void
	disabled?: boolean
	btnError: boolean
}

export const SettingsCard = ({title, description, btnText, btnError, onClick, disabled}: Props) => {
	return (
		<div className="bg-base-100 p-8 rounded-2xl flex flex-col gap-4 shadow-xl">
			<div className="text-xl">
				{title}
			</div>
			<div>
				{description}
			</div>
			<div className="flex justify-end">
				<button className={`btn ${btnError ? 'btn-error' : 'btn-success'} btn-wide rounded-2xl`} onClick={onClick}
				        disabled={disabled}>
					{btnText}
				</button>
			</div>
		</div>
	)
}
