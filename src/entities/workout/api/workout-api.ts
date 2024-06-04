import api from '@/shared/api'
import {WorkoutApiParam, WorkoutFromDb, WorkoutItem} from '@/entities/workout'
import {UploadDoc} from '@/entities/notify'


type Rename = {
	uuid: string
	name?: string
	note?: string | null
}

const PATH = 'workout'

export class WorkoutApi {
	
	static async upload({formData}: { formData: FormData, doc: UploadDoc }): Promise<WorkoutItem> {
		return api.post(`${PATH}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}
	
	static async getOne(params: { uuid: string }): Promise<WorkoutFromDb | null> {
		return api.get(`${PATH}/one`, {params})
	}
	
	static async getMany(params?: WorkoutApiParam): Promise<WorkoutItem[]> {
		return api.get(`${PATH}`, {params})
	}
	
	static async rename(data: Rename): Promise<WorkoutItem> {
		return api.patch(`${PATH}`, data)
	}
	
	static async deleteOne({uuid}: { uuid: string }) {
		return api.delete<void>(`${PATH}`, {data: {uuid}})
	}
	
	static async deleteAll() {
		return api.delete<void>(`${PATH}/all`)
	}
}
