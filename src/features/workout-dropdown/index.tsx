import {useWorkoutDelete, useWorkoutRename, WorkoutFromDb, WorkoutItem} from '@/entities/workout'
import {ThreeDotsIcon} from '@/shared/svg'
import {Modal} from '@/shared/ui'
import {useState} from 'react'
import {useLocation} from '@tanstack/react-router'
import {openModal} from '@/shared/lib'

type Props = {
	data: Pick<WorkoutItem | WorkoutFromDb, 'name' | 'uuid' | 'note'>
	withEditNotes?: boolean
}


export const WorkoutDropdown = ({data, withEditNotes = false}: Props) => {
	const {mutate: rename} = useWorkoutRename()
	const {mutate: remove} = useWorkoutDelete()
	
	const [name, setName] = useState<string>(data.name)
	const [note, setNote] = useState<string | null>(data.note)
	
	const location = useLocation()
	
	
	function handleRenameClick() {
		rename({uuid: data.uuid, name, note})
		handleDropdownClick()
	}
	
	
	function handleDeleteClick() {
		remove({uuid: data.uuid})
		if (location.pathname.includes('view')) {
			window.history.back()
		}
		handleDropdownClick()
	}
	
	
	const handleDropdownClick = (type?: string) => {
		type && openModal(type)
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur()
		}
	}
	
	
	return (
		<>
			<div className="dropdown dropdown-end ">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle group">
					<ThreeDotsIcon/>
				</div>
				<ul
					tabIndex={0}
					className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-xl
			mt-3 z-[1] p-3 w-52 left-[-144px] top-[56px]"
				>
					{withEditNotes && <li onClick={() => handleDropdownClick('editNote')}>
            <a className="p-3 rounded-xl hover:text-white">{data.note?.length ? 'Edit Notes' : 'Add Notes'}</a>
          </li>}
					<li onClick={() => handleDropdownClick(data.uuid + 'rename')}>
						<a className="p-3 rounded-xl hover:text-white">Rename</a>
					</li>
					<li onClick={() => handleDropdownClick(data.uuid + 'delete')}>
						<a className="p-3 rounded-xl hover:text-white">Delete</a>
					</li>
				</ul>
			</div>
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
				<textarea
					className="textarea textarea-bordered h-36" placeholder="Type here" value={note || ''}
					onChange={e => setNote(e.target.value)}
				/>
			</Modal>
			<Modal
				id={data.uuid + 'delete'} text={`Do you want to delete workout "${data.name}?"`}
				handleConfirm={handleDeleteClick} dropDownClose={handleDropdownClick}/>
		</>
	
	)
}
