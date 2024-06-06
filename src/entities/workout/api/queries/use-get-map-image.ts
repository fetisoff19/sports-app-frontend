import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_MAP_IMAGE} from '@/entities/workout'
import {WorkoutApi} from '@/entities/workout/api/workout-api.ts'

export function useGetMapImage(path: string | null) {
	const {isLoading: imgIsLoading, data: img,} = useQuery({
		queryKey: [QUERY_KEY_MAP_IMAGE, path],
		queryFn: () => WorkoutApi.getImage(path),
		select: data => data && URL.createObjectURL(data),
		enabled: !!path,
		staleTime: 24 * 3600 * 1000,
	})
	
	return {imgIsLoading, img}
}
