import {RefObject, useCallback, useEffect} from 'react'

export const useObserver = (
	observerElem: RefObject<HTMLElement>,
	fetchNextPage: () => void,
	hasNextPage: boolean | unknown,
) => {
	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [target] = entries
			if (target.isIntersecting) {
				fetchNextPage()
			}
		},
		[fetchNextPage],
	)
	
	useEffect(() => {
		const element = observerElem.current
		const option = {rootMargin: '300px'}
		
		const observer = new IntersectionObserver(handleObserver, option)
		if (element) {
			observer.observe(element)
			return () => observer.unobserve(element)
		}
	}, [fetchNextPage, hasNextPage, handleObserver, observerElem])
	
}
