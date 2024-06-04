import {useEffect, useState} from 'react'

export function useDebounce<T = string | number>(value: T, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)
	
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay)
		
		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])
	
	return debouncedValue
}
