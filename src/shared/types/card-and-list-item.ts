import {Workout} from '@/shared/types'

export interface ICardAndListItem {
	data: Workout
	withNotes?: boolean
	loading: boolean
}
