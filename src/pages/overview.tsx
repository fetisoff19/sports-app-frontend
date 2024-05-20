import {useWorkoutGet, Workout} from "@/entities/workout";
import {useMemo, useRef, useState} from "react";
import {useObserver} from "@/shared/lib/hooks";
import {Indicator} from "@/shared/types";
import {SERVER_PORT, SERVER_URL} from "@/shared/api";
import {IconGenerator} from "@/shared/ui/icon-generator.tsx";
import {fieldsForCard, firstCapitalLetter, orderValues, prepareValues, units} from "@/shared/lib";
import {mockWorkout, QueryLimit} from "@/shared/constants";
import {Toolbar} from "@/widgets/toolbar";
import {authStore} from "@/entities/auth/model";
import {useStore} from "@tanstack/react-store";


type Props = {
	data: Workout,
	isLoading: boolean
}


const Card = ({data, isLoading}: Props) => {
	const src = `${SERVER_URL}:${SERVER_PORT}/${data.map}`
	const indicators: Indicator[] | undefined = orderValues.map((item) => ({
		field: fieldsForCard[item],
		value: prepareValues[item](data?.[item] || 0) + ' ' + units[item],
	}))
	const skeleton = (w: number | string = 10, h: number = 4) => isLoading ?
		`skeleton text-transparent disabled:pointer-events-none disabled:transform-none w-${w} h-${h}` : ''

	const Stats = indicators?.map((item) =>
		<div key={item.field} className="flex flex-col justify-between gap-2">
			<div className={`${skeleton(16)} text-xs stat-title justify-start`}>{item?.field}</div>
			<div className={`${skeleton(18, 6)} text-xl stat-value justify-start`}>{item?.value}</div>
		</div>
	)

	return (
		<div
			className="flex sm:flex-row justify-between md:max-w-[800px] sm:w-full p-8 bg-base-100 shadow-xl hover:bg-base-100/75 rounded-xl flex-col gap-5">
			<div className="w-64 sm:max-w-64 flex items-start flex-col gap-3">
				<div className="flex flex-0 gap-3">
					<div className="flex justify-center items-center w-8 h-10">
						{!isLoading ? <IconGenerator sport={data.sport}/> :
							<div className="skeleton w-12 h-12 rounded-full shrink-0"/>}
					</div>
					<div className="flex flex-col gap-1 w-max">
						<div
							className={`${isLoading ? skeleton(18) : 'card-title hover:text-white link '} text-base block max-w-56 link-hover truncate`}>
							{data.name}
						</div>
						<div className={`${skeleton(18)} flex-row items-start w-full text-xs stat-title`}>
							{data && (firstCapitalLetter(data.sport) + ', ' + new Date(data.date).toLocaleString())}
						</div>
					</div>
				</div>
				<div className="flex flex-1 items-center w-full">
					<div className="grid grid-cols-2 gap-3 justify-between w-full">
						{Stats}
					</div>
				</div>
				<div
					className={`${isLoading ? skeleton(52) : ''} sm:max-w-52 block truncate text-xs hover:text-white hover:cursor-pointer`}>
					{data?.note || !isLoading && 'Add notes...'}
				</div>
			</div>
			<div className="flex items-center ">
				<div className={`${isLoading ? skeleton(0, 0) : 'no-map'} sm:w-52 sm:h-52 w-64`}>
					{data.map && <img src={src} alt={data?.name} className="rounded-xl filter"/>}
				</div>
			</div>
		</div>
	)
}


const Overview = () => {
	const [name, setName] = useState<string>('')
	const user = useStore(authStore, state => state.user)

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isShowingLoader
	} = useWorkoutGet('OVERVIEW', {name})

	const workoutCount = user?.workoutCount ?? 0
	const flatData = useMemo(() => data?.pages?.flatMap(page => page) ?? [], [data])
	const mockData = workoutCount - flatData.length > 0 ? Array(workoutCount >= QueryLimit ? QueryLimit : workoutCount).fill('') : []

	const observerElem = useRef(null)
	useObserver(observerElem, fetchNextPage, hasNextPage)

	return (
		<div className="flex flex-col justify-items-center gap-8 pt-8 xl:w-[1128px]">
			<Toolbar setValue={setName}/>
			{workoutCount > 0 ? <>
					<div className="xl:grid xl:grid-cols-2 flex flex-col items-center gap-8">
						{flatData.map(item => <Card key={item.uuid} data={item} isLoading={false}/>)}
						{isShowingLoader && mockData.map((_, index) =>
							<Card key={index} data={mockWorkout} isLoading={isShowingLoader}/>)}
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

export default Overview;