import {Dispatch, SetStateAction} from 'react'

type DropdownProps = {
	value: string;
	setValue: Dispatch<SetStateAction<string>> | ((param: string) => void);
	valueList: string[],
	fields?: Record<string, string>
	btnSuccess?: boolean
	style?: string
	
}

export const Dropdown = ({value, setValue, valueList, fields, btnSuccess, style}: DropdownProps) => {
	const handleDropdownClick = (type: string) => {
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur()
		}
		setValue(type)
	}
	
	return (
		<div className={`dropdown dropdown-end flex-1 ${style}`}>
			<div
				tabIndex={0}
				role="button"
				className={`btn rounded-2xl w-full sm:min-w-44 ${btnSuccess ? 'btn-success' : 'shadow-xl'}`}>
				{valueList.includes(value) ? (fields?.[value] || value) : (fields?.['date'] || value)}
			</div>
			<ul
				tabIndex={0}
				className="menu dropdown-content bg-base-100 rounded-box shadow-xl mt-3 z-[1] w-full">
				{valueList
					.map(item =>
						<li key={item} onClick={() => handleDropdownClick(item)}>
							<button className={
								`inline-block btn btn-ghost rounded-xl text-left hover:text-white ${value === item && 'text-white' +
								' bg-secondary'}`
							}>
								{fields?.[item] || item}
							</button>
						</li>)}
			</ul>
		</div>
	)
}
