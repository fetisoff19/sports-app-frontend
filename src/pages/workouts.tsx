import {useWorkoutGet, Workout} from "@/entities/workout";
import {useObserver} from "@/shared/lib/hooks";
import {useMemo, useRef, useState} from "react";
import {useStore} from "@tanstack/react-store";
import {authStore} from "@/entities/auth/model";
import {mockWorkout, QueryLimit} from "@/shared/constants";
import {Indicator} from "@/shared/types";
import {fieldsForCard, firstCapitalLetter, orderValues, prepareValues, units} from "@/shared/lib";
import {IconGenerator} from "@/shared/ui/icon-generator.tsx";
import {Toolbar} from "@/widgets/toolbar";
import {Dropdown} from "@/features/dropdown";

type Props = {
	data: Workout,
	isLoading: boolean
}


const ListItem = ({data, isLoading}: Props) => {

	const indicators: Indicator[] | undefined = orderValues.map((item) => ({
		field: fieldsForCard[item],
		value: prepareValues[item](data?.[item] || 0) + ' ' + units[item],
	}))

	const skeleton = (w: number | string = 10, h: number = 4) => isLoading ?
		`skeleton text-transparent disabled:pointer-events-none disabled:transform-none w-${w} h-${h}` : ''


	const Stats = indicators?.map((item) =>
		<div key={item.field} className="flex flex-col justify-between gap-2 w-28">
			<div className={`${skeleton(16)} text-xl stat-value justify-start`}>{item?.value}</div>
			<div className={`${skeleton(18, 6)} text-xs stat-title justify-start`}>{item?.field}</div>
		</div>
	)


	return (
		<div
			className="flex w-full h-20 gap-2 p-4 justify-between bg-base-100 shadow-xl hover:bg-base-100/75 rounded-xl min-w-80">
			<div className="flex gap-2 w-64">
				<div className="flex items-center w-12 h-12 justify-center">
					{!isLoading ? <IconGenerator sport={data.sport}/> :
						<div className="skeleton w-12 h-12 rounded-full shrink-0"/>}
				</div>
				<div className="flex flex-col gap-1 w-44 sm:w-64">
					<div
						className={`${isLoading ? skeleton(24) : 'card-title hover:text-white link '} text-base block link-hover truncate`}>
						{data.name}
					</div>
					<div className={`${skeleton(18)} flex-row items-start w-full text-xs stat-title`}>
						{data && (firstCapitalLetter(data.sport) + ', ' + new Date(data.date).toLocaleString())}
					</div>
				</div>
			</div>
			<div className="hidden sm:flex justify-between items-center gap-4
				md:max-w-56 lg:max-w-96 xl:max-w-[600px]
				[&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:flex
				[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex
				[&>*:nth-child(4)]:hidden xl:[&>*:nth-child(4)]:flex"
			>
				{Stats}
			</div>
			{!isLoading ? <Dropdown data={data}/> : <div className="w-12"/>}

		</div>
	)
}

const Workouts = () => {
	const [name, setName] = useState<string>('')
	const user = useStore(authStore, state => state.user)

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isShowingLoader
	} = useWorkoutGet('WORKOUTS', {name})

	const workoutCount = user?.workoutCount ?? 0
	const flatData = useMemo(() => data?.pages?.flatMap(page => page) ?? [], [data])
	const mockData = workoutCount - flatData.length > 0 ? Array(workoutCount >= QueryLimit ? QueryLimit : workoutCount).fill('') : []

	const observerElem = useRef(null)
	useObserver(observerElem, fetchNextPage, hasNextPage)

	return (
		<div className="flex flex-col justify-items-center gap-8 p-8 w-full xl:max-w-[1192px]">
			<Toolbar setValue={setName}/>
			{workoutCount > 0 ? <>
					<div className="flex flex-col items-center gap-8 w-full">
						{flatData.map(item => <ListItem key={item.uuid} data={item} isLoading={false}/>)}
						{isShowingLoader && mockData.map((_, index) =>
							<ListItem key={index} data={mockWorkout} isLoading={isShowingLoader}/>)}
					</div>
					<div ref={observerElem}>
						<div className="h-1 bg-amber-500"/>
					</div>
				</>
				: <div>"Add first workout!"</div>
			}
		</div>
	);
};

export default Workouts;