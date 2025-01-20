import {WorkoutItem, workoutsStore} from '@/entities/workout'
import {Indicator} from '@/shared/types'
import {firstCapitalLetter, orderItemValues, paramNames, units} from '@/shared/lib'
import {IconGenerator} from '@/shared/ui'
import {Link} from '@tanstack/react-router'
import {WorkoutDropdown} from '@/features/workout-dropdown'
import {useStore} from '@tanstack/react-store'
import {prepareValues} from '@/shared/lib/helpers'

type Props = {
	data: WorkoutItem,
	isLoading: boolean
}


export const ListItem = ({data, isLoading}: Props) => {
	const param = useStore(workoutsStore, state => state.param) as keyof WorkoutItem
	const paramOrder: string[] = param === 'date' ? orderItemValues :
		[...new Set<string>([param, ...orderItemValues])].splice(0, 4)
	
	const indicators: Indicator[] | undefined = paramOrder.map((item) => {
		const value = Number(data?.[item as keyof WorkoutItem] || 0)
		return ({
			field: paramNames[item],
			value: prepareValues[item](value) + ' ' + units[item],
		})
	})
	
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
					<Link
						to="/view/$uuid"
						params={{uuid: data.uuid}}
						className={`${isLoading ? skeleton(24) : 'card-title hover:text-white link '} text-base block link-hover truncate`}>
						{data.name}
					</Link>
					<div className={`${skeleton(18)} flex-row items-start w-full text-xs stat-title`}>
						{data && (firstCapitalLetter(data.sport) + ', ' + new Date(data.date).toLocaleString())}
					</div>
				</div>
			</div>
			<div className="hidden sm:flex justify-between items-center gap-8
				md:max-w-56 lg:max-w-96 xl:max-w-[600px]
				[&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:flex
				[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex
				[&>*:nth-child(4)]:hidden xl:[&>*:nth-child(4)]:flex"
			>
				{Stats}
			</div>
			{!isLoading ? <WorkoutDropdown data={data}/> : <div className="w-12"/>}
		</div>
	)
}
