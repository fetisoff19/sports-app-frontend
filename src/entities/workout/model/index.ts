export type Workout = {
	uuid: string
	distance: number | null
	time: number | null
	elevation: number | null
	speed: number | null
	hr: number | null
	power: number | null
	cadence: number | null
	name: string
	sport: string
	note: string
	date: Date
	map: string | null
}


export const QUERY_KEY_WORKOUTS = 'WORKOUTS'
export const UPLOAD = 'UPLOAD'
