import {ChartPoint} from '@/entities/workout'
import {baseSeries} from '@/widgets/view/charts/lib/constants.ts'
import {paramNames, prepareValues} from '@/shared/lib'

type Props = {
	points: ChartPoint[] | undefined
	coef: number | undefined
	value: number
	type: boolean
	chartNames: string[]
}

export const LiveStats = ({points, coef, value, type, chartNames}: Props) => {
	
	if (points) return [...new Set(chartNames), 'ts'].map(item => {
		const field: 'd' | 'ts' = type && points?.at(-1)?.d ? 'd' : 'ts'
		const point = points.find(elem => elem[field] === value)
		const color = baseSeries.find(elem => elem.name === item)?.color || '#b2ccd699'
		const quantity = point?.[item as keyof ChartPoint]
		const para = coef === 2 && item === 's' ? 'enhanced_speed' : item
		
		return (
			<div className={`w-16`} key={item}>
				<div className="text-xs stat-title ">
					{paramNames[para]}
				</div>
				<div className="stat-value text-base" style={{color}}>
					{quantity ? prepareValues[para](quantity) : '--'}
				</div>
			</div>
		)
	})
}
