import {ReactNode} from 'react'

type Props = {
	children: ReactNode
	className?: string
}

export const Layout = ({children, className}: Props) => {
	return (
		<div className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
			<div
				className={`max-w-[1200px] m-auto py-8 px-0 sm:px-8 flex flex-col justify-items-center gap-8 ${className ?? ''}`}>
				{children}
			</div>
		</div>
	)
}
