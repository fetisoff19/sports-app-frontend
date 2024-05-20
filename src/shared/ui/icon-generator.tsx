import React from 'react'
import {CyclingIcon, RunningIcon, WalkingIcon} from '@/shared/svg'

interface IProps {
	sport: string | null
	fill?: string
}

export const IconGenerator: React.FC<IProps> = ({sport, fill = 'rgb(74 222 128)'}) => {
	if (sport === 'cycling') return <CyclingIcon fill={fill}/>
	if (sport === 'running') return <RunningIcon fill={fill}/>
	if (sport === 'walking') return <WalkingIcon fill={fill}/>
	return <svg/>
}
