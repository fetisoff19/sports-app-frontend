import {FC, ReactNode} from 'react'

type Props = {
	id: string
	text?: string
	handleConfirm?: () => void
	dropDownClose?: () => void
	children?: ReactNode
	showCloseBtn?: boolean
}


export const Modal: FC<Props> = ({text, handleConfirm, id, children, dropDownClose, showCloseBtn = true}) => {
	
	return (
		<dialog id={id} className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				{text && <p className="py-2">{text}</p>}
				<div className="modal-action flex flex-col t">
					<form id={id} method="dialog" className="flex flex-col gap-6">
						{children}
						{(showCloseBtn || handleConfirm) && <div className="flex flex-row gap-4 justify-end">
							{showCloseBtn && <button className="btn btn-neutral w-32" onClick={dropDownClose}>Cancel</button>}
							{handleConfirm && <button className="btn btn-success w-32" onClick={handleConfirm}>
                Confirm
              </button>}
            </div>}
					</form>
				</div>
			</div>
		</dialog>
	)
}
