import {useState} from 'react'
import {useSuspenseQuery} from '@tanstack/react-query'
import {Link, useParams} from '@tanstack/react-router'
import {Charts, Map, ViewFullStats, ViewMainStats} from '@/widgets/view'
import {WorkoutDropdown} from '@/features/workout-dropdown'
import {useWorkoutGetOne} from '@/entities/workout'
import {firstCapitalLetter} from '@/shared/lib'

export const View = () => {
	const {uuid} = useParams({strict: false})
	const {data} = useSuspenseQuery(useWorkoutGetOne(uuid))
	const [index, setIndex] = useState<number>(0)
	
	if (!data) {
		return (
			<div className="flex flex-col justify-center items-center pt-16 gap-2">
				<div className="text-xl">Ups... Workout Not Found!</div>
				<Link className="link hover:text-white text-lg" to={`/`}>{'To Overview -->'}</Link>
			</div>
		)
	}
	
	function openModal() {
		const dialog = document.getElementById(data?.uuid + 'editNote') as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
		const elem = document.activeElement as HTMLLinkElement
		if (elem) {
			elem?.blur()
		}
	}
	
	return (
		<div
			className="lg:flex-row-reverse flex flex-col justify-items-center gap-8 py-8 h-full w-full xl:w-[1200px] sm:w-[600px] lg:w-full">
			<div
				className="flex flex-col rounded-xl bg-base-100 gap-4 p-4 h-fit  sm:p-8 min-w-[320px] w-full lg:basis-2/5 shadow-xl">
				<div className="flex flex-col gap-2 justify-between">
					<div className="flex gap-2 justify-between">
						<div className="flex flex-col gap-2">
							<div title={data.name.length > 30 ? data.name : ''}
							     className="card-title text-white text-base block max-w-60 sm:max-w-72 truncate">
								{data.name}
							</div>
							<div className="flex-row items-start w-full text-xs stat-title">
								{firstCapitalLetter(data.sport) + ', ' + new Date(data.date).toLocaleString()}
							</div>
						</div>
						<WorkoutDropdown data={data} withEditNotes={true}/>
					</div>
					<div
						className="block w-full h-full text-xs text-ellipsis overflow-hidden hover:cursor-pointer hover:text-white"
						onClick={openModal}>
						{data.note || 'Add notes'}
					</div>
				</div>
				<ViewMainStats session={data.session}/>
				<Map points={data?.polyline?.points} index={index}/>
				<ViewFullStats session={data.session}/>
				<div className="text-xs stat-title">
					{data?.device.length ? `Device: ${firstCapitalLetter(data?.device)}` : ''}
				</div>
			</div>
			<div
				className="rounded-xl  bg-base-100 flex-col gap-8 p-4 sm:p-8 h-full w-full min-w-[320px] lg:basis-3/5 shadow-xl">
				<Charts data={data} setIndex={setIndex}/>
			</div>
		</div>
	)
}
