import {UPLOAD} from '@/entities/workout'


export const AddFirstWorkout = () => {
	function openModal() {
		const dialog = document.getElementById(UPLOAD) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}
	
	return (
		<>
			<div onClick={openModal} className="flex justify-center items-center h-20">
				<div className="link hover:text-white text-lg">
					Add First Workout!
				</div>
			</div>
		</>
	)
}
