import {useWorkoutDelete, useWorkoutRename, Workout} from "@/entities/workout";
import {ThreeDotsIcon} from "@/shared/svg";
import {Modal} from "@/shared/ui";
import {useState} from "react";

type Props = {
	data: Workout
}

type Actions = 'delete' | 'rename' | 'editNote'


export const Dropdown = ({data}: Props) => {
	const {mutate: rename} = useWorkoutRename()
	const {mutate: remove} = useWorkoutDelete()

	const [name, setName] = useState<string>(data.name);
	const [note, setNote] = useState<string>(data.note);


	function handleRenameClick() {
		rename({uuid: data.uuid, name, note})
	}

	function handleDeleteClick() {
		remove({uuid: data.uuid})
	}

	function openModal(type: Actions) {
		const dialog = document.getElementById(data.uuid + type) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}


	const handleDropdownClick = (type?: Actions) => {
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur();
		}
		type && openModal(type)
	};


	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-circle group">
				<ThreeDotsIcon/>
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-xl
			mt-3 z-[1] p-3 w-52 left-[-144px] top-[56px]"
			>
				<li onClick={() => handleDropdownClick('editNote')}><a
					className="p-3 rounded-xl hover:text-white">{data.note?.length ? 'Edit Notes' : 'Add Notes'}</a>
				</li>
				<li onClick={() => handleDropdownClick('rename')}><a className="p-3 rounded-xl hover:text-white">Rename</a></li>
				<li onClick={() => handleDropdownClick('delete')}><a className="p-3 rounded-xl hover:text-white">Delete</a></li>
			</ul>
			<Modal id={data.uuid + 'rename'} text={`Enter a new name`} handleConfirm={handleRenameClick}
			       dropDownClose={handleDropdownClick}>
				<input
					type="text"
					placeholder="Type here"
					className="textarea textarea-bordered invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</Modal>
			<Modal id={data.uuid + 'editNote'} text={'Enter notes'}
			       handleConfirm={handleRenameClick} dropDownClose={handleDropdownClick}>
				<textarea className="textarea textarea-bordered" placeholder="Type here" value={note}
				          onChange={e => setNote(e.target.value)}/>
			</Modal>
			<Modal id={data.uuid + 'delete'} text={`Do you want to delete workout "${data.name}?"`}
			       handleConfirm={handleDeleteClick} dropDownClose={handleDropdownClick}/>
		</div>
	)
}