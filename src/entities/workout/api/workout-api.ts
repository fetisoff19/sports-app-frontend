import api from '@/shared/api'
import {Workout} from "@/entities/workout";
import {UploadDoc} from "@/entities/notify";

type WorkoutApiParam = {
	limit?: number
	offset?: number
	direction?: 'DESC' | 'ASC'
	sport?: string
	param?: string
}

type Rename = {
	uuid: string
	name?: string
	note?: string
}

const PATH = 'workout'

export class WorkoutApi {

	static async upload({formData}: { formData: FormData, doc: UploadDoc }): Promise<Workout> {
		return api.post<void>(`${PATH}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	static async getOne(id: string): Promise<Workout | null> {
		return api.post(`${PATH}`, {id})
	}

	static async getMany(params?: WorkoutApiParam): Promise<Workout[]> {
		return api.get(`${PATH}`, {params})
	}

	static async rename(data: Rename): Promise<Workout> {
		return api.patch(`${PATH}`, data)
	}

	static async deleteOne({uuid}: { uuid: string }) {
		return api.delete<void>(`${PATH}`, {data: {uuid}})
	}

	static async deleteAll() {
		return api.delete<void>(`${PATH}/all`)
	}
}
