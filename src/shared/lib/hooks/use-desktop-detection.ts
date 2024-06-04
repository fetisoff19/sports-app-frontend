import {useEffect, useState} from 'react'

export const useDesktopDetection = () => {
	const [device, setDevice] = useState<boolean>(false)
	
	useEffect(() => {
		const handleDeviceDetection = () => {
			const userAgent = navigator.userAgent.toLowerCase()
			const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent)
			const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent)
			
			if (isMobile || isTablet) {
				setDevice(() => false)
			} else {
				setDevice(() => true)
			}
		}
		
		handleDeviceDetection()
		window.addEventListener('resize', handleDeviceDetection)
		
		return () => {
			window.removeEventListener('resize', handleDeviceDetection)
		}
	}, [])
	
	return device
}
