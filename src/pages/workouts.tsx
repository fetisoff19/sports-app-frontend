import {mockWorkout, useWorkoutGetSome, workoutsStore} from '@/entities/workout'
import {useObserver} from '@/shared/lib/hooks'
import {useMemo, useRef} from 'react'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {WorkoutToolbar} from '@/features/workout-toolbar'
import {Observer} from '@/shared/ui'
import {ListItem} from '@/widgets/list-item'
import {AddFirstWorkout} from '@/features/add-first-workout'
import {useStatsGetMain} from '@/entities/stats'
import {QueryLimit} from '@/shared/api'
import {Layout} from '@/widgets/layout'


const Workouts = () => {
	const name = useStore(workoutsStore, state => state.workoutName)
	const sport = useStore(workoutsStore, state => state.sport)
	const param = useStore(workoutsStore, state => state.param)
	const direction = useStore(workoutsStore, state => state.direction)
	const user = useStore(authStore, state => state.user)
	const {data: mainStats} = useStatsGetMain()
	
	const sportsList = ['all', ...(mainStats?.map(({sport}) => sport) || [])]
	
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isShowingLoader,
	} = useWorkoutGetSome('WORKOUTS', {name, param, direction, sport})
	
	const observerElem = useRef(null)
	useObserver(observerElem, fetchNextPage, hasNextPage)
	
	const workoutCount = user?.workoutCount ?? 0
	const flatData = useMemo(() => data?.pages?.flatMap(page => page) ?? [], [data])
	const mockData = (workoutCount - flatData.length > 0)
		? Array(workoutCount >= QueryLimit ? QueryLimit : workoutCount).fill('')
		: []
	
	if (!user) return
	if (user?.workoutCount === 0) return (
		<AddFirstWorkout/>
	)
	
	return (
		<Layout className="w-80 sm:w-full">
			<WorkoutToolbar sportsList={sportsList}/>
			<div className="flex flex-col items-center gap-8">
				{flatData.map(item => <ListItem key={item.uuid} data={item} isLoading={false}/>)}
				{isShowingLoader && mockData.map((_, index) =>
					<ListItem key={index} data={mockWorkout} isLoading={isShowingLoader}/>)
				}
			</div>
			<Observer reference={observerElem}/>
		</Layout>
	)
}

export default Workouts
