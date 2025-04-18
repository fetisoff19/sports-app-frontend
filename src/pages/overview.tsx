import {mockWorkout, useWorkoutGetSome, workoutsStore} from '@/entities/workout'
import {useMemo, useRef} from 'react'
import {useObserver} from '@/shared/lib/hooks'
import {OverviewToolbar} from '@/features/overview-toolbar'
import {authStore} from '@/entities/auth/model'
import {useStore} from '@tanstack/react-store'
import {Observer} from '@/shared/ui'
import {Card} from '@/widgets/overview-card'
import {AddFirstWorkout} from '@/features/add-first-workout'
import {QueryLimit} from '@/shared/api'
import {Layout} from '@/widgets/layout'


const Overview = () => {
	const name = useStore(workoutsStore, state => state.overviewName)
	const user = useStore(authStore, state => state.user)
	
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isShowingLoader
	} = useWorkoutGetSome('OVERVIEW', {name, param: 'date', sport: 'all', direction: 'DESC'})
	
	const workoutCount = user?.workoutCount ?? 0
	const flatData = useMemo(() => data?.pages?.flatMap(page => page) ?? [], [data])
	const mockData = (workoutCount - flatData.length > 0)
		? Array(workoutCount >= QueryLimit ? QueryLimit : workoutCount).fill('')
		: []
	
	const observerElem = useRef(null)
	useObserver(observerElem, fetchNextPage, hasNextPage)
	
	
	if (!user) return
	if (user?.workoutCount === 0) return (
		<AddFirstWorkout/>
	)
	return (
		<Layout>
			<OverviewToolbar/>
			<div className="xl:grid xl:grid-cols-2 flex flex-col items-center gap-8">
				{flatData.map(item => <Card key={item.uuid} data={item} isLoading={false}/>)}
				{isShowingLoader && mockData.map((_, index) =>
					<Card key={index} data={mockWorkout} isLoading={isShowingLoader}/>)}
			</div>
			<Observer reference={observerElem}/>
		</Layout>
	)
}

export default Overview
