import {paramNames, prepareValues, units} from '@/shared/lib'
import {Indicator} from '@/shared/types'
import {Session, WorkoutFromDb} from '@/entities/workout'
import {orderCyclingValues, orderRunningValues} from './lib/constants.ts'

type Props = {
	session: WorkoutFromDb['session'] | undefined | null
}

export const ViewMainStats = ({session}: Props) => {
	const orderValues = session?.cadence_coef === 1 ? orderCyclingValues : orderRunningValues
	const indicators: Indicator[] | undefined = orderValues
		.map((item) => {
			const value = Number(session?.[item as keyof Session] || 0)
			return ({
				field: paramNames[item],
				value: prepareValues[item](value) + ' ' + units[item],
			})
		})
	
	const stats = indicators?.map((item, index) =>
		<div key={index} className="flex flex-col justify-between gap-2">
			<div className="text-xs stat-title justify-start">{item?.field}</div>
			<div className="text-lg stat-value justify-start">{item?.value}</div>
		</div>
	)
	
	return (
		<div className="flex flex-1 items-center w-full">
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-between w-full">
				{stats}
			</div>
		</div>
	)
}
