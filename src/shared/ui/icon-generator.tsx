import React from 'react'
import {CyclingIcon, GymIcon, HikingIcon, OtherSportsIcon, RunningIcon, WalkingIcon} from '@/shared/svg'
import {sports} from '@/shared/lib'

interface IProps {
	sport: typeof sports[number]
	fill?: string
}

export const IconGenerator: React.FC<IProps> = ({sport, fill = 'rgb(74 222 128)'}) => {
	if (sport === 'cycling') return <CyclingIcon fill={fill}/>
	if (sport === 'running') return <RunningIcon fill={fill}/>
	if (sport === 'walking') return <WalkingIcon fill={fill}/>
	if (sport === 'hiking') return <HikingIcon fill={fill}/>
	if (sport === 'training') return <GymIcon fill={fill}/>
	
	return <OtherSportsIcon fill={fill}/>
}
