import {UPLOAD} from '@/entities/workout'
import {openModal} from '@/shared/lib'


export const AddFirstWorkout = () => {
	return (
		<div onClick={() => openModal(UPLOAD)} className="flex justify-center pt-8 m-auto">
			<div className="link hover:text-white text-lg">
				Add First Workout!
			</div>
		</div>
	)
}
