import {RefObject} from 'react'

type Props = {
	reference: RefObject<HTMLDivElement>
}

export const Observer = ({reference}: Props) => {
	return (
		<div ref={reference}>
			<div className="h-1 w-1"/>
		</div>
	)
}
