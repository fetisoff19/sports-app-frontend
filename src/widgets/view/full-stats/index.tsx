import {fullStatsFields, fullStatsLabels, paramNames, prepareValues, units} from '@/shared/lib'
import {Indicator} from '@/shared/types'
import {Session} from '@/entities/workout'

type Props = {
	session: Session
}

export const ViewFullStats = ({session}: Props) => {
	const orderValues = session?.cadence_coef === 2
		? ['enhanced_speed', 'hr', 'cadence', 'elevation', 'time', 'other', 'temperature',]
		: ['power', 'speed', 'hr', 'cadence', 'elevation', 'time', 'other', 'temperature']
	
	const Columns = orderValues.map((item, index) => {
		const orderFields = fullStatsFields.find((f) => f.label === item)
		const indicators: Indicator[] | undefined = orderFields?.fields.map((item: string) => {
			const quantity = Number(session?.[item as string as keyof Session]) || 0
			const value = prepareValues?.[item] ? prepareValues?.[item](quantity) : null
			return ({
				field: fullStatsLabels[item],
				value,
			})
		}).filter(elem => elem.value)
		const stats = indicators?.map((item, index) =>
			<div key={index} className="flex flex-col justify-between pb-2">
				<div className="text-lg stat-value justify-start">{item?.value}</div>
				<div className="text-xs stat-title justify-start">{item?.field}</div>
			</div>
		)
		if (indicators?.length) return (
			<div key={index} className="flex flex-col justify-start gap-2 pt-2">
				<div className="text-xs stat-title justify-start">
					{paramNames[item] + (units[item] ? (', ' + units[item]) : '')}
				</div>
				<div>
					{stats}
				</div>
			</div>
		)
	})
	
	return (
		<div className="flex items-center w-full">
			<div className="grid grid-cols-3 md:grid-cols-4 gap-2 justify-between w-full">
				{Columns}
			</div>
		</div>
	)
}
