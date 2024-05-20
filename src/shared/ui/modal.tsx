import {FC, ReactNode} from "react";

type Props = {
	id: string
	text?: string
	handleConfirm?: () => void
	dropDownClose?: () => void
	children?: ReactNode
	manualClose?: boolean
}


export const Modal: FC<Props> = ({text, handleConfirm, id, children, dropDownClose, manualClose}) => {

	return (
		<dialog id={id} className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				{text && <p className="py-2">{text}</p>}
				<div className="modal-action flex flex-col t">
					<form id={id} method="dialog" className="flex flex-col gap-6">
						{children}
						<div className="flex flex-row gap-4 justify-end">
							{handleConfirm &&
                  <button className="btn btn-success bg-green-400" onClick={handleConfirm}>Confirm</button>}
							{manualClose && <button className="btn btn-neutral" onClick={dropDownClose}>Cancel</button>}
						</div>
					</form>
				</div>
			</div>
		</dialog>
	)
}