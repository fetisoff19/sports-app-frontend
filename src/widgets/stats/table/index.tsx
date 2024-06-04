import {useEffect, useMemo, useState} from 'react'
import {TableStats} from '@/entities/stats'
import {paramNames, prepareValues, units} from '@/shared/lib'

type Props = {
	data: TableStats | undefined | null
	isLoading: boolean
}


type Row = {
	field: string,
	value: string | number
}


export const StatsTable = ({data, isLoading}: Props) => {
	const [tableData, setTableData] = useState<Row[]>([])
	const mockData: Row[] = useMemo(() => Array(15).fill({field: '', value: 0}), [])
	
	useEffect(() => {
		if (data) {
			const result: Row[] = []
			for (const key in data) {
				const value = data[key as keyof TableStats]
				result.push({
					field: paramNames?.[key] || key,
					value: (prepareValues?.[key] ? prepareValues?.[key](value || 0) : value) + ' ' + (units?.[key] || '')
				})
			}
			setTableData(() => result)
		}
	}, [data, isLoading])
	
	if (data?.count == 0) {
		return <div className='flex justify-center items-center h-20 text-lg'>
			There's no data available for your selection
		</div>
	}
	
	return (
		<table className="table">
			<tbody>
			{isLoading ? mockData.map((_, index) =>
					<tr className={`flex`} key={index}>
						<td className={`flex-1`}>
							<div className={`skeleton max-w-72 h-5`}/>
						</td>
						<td className={`flex-1`}>
							<div className={`skeleton max-w-72 h-5`}/>
						</td>
					</tr>
				)
				: tableData.map(({field, value}, index) =>
					<tr className={`flex`} key={index}>
						<td className={`flex-1`}>{field}</td>
						<td className={`flex-1`}>{value}</td>
					</tr>
				)
			}
			</tbody>
		</table>
	)
}
