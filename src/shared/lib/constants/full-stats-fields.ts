export const fullStatsFields: { label: string, fields: string[] }[] = [
	{
		label: 'hr',
		fields: [
			'max_heart_rate',
			'avg_heart_rate'
		],
	},
	{
		label: 'speed',
		fields: [
			'max_speed',
			'avg_speed'
		],
	},
	{
		label: 'enhanced_speed',
		fields: [
			'enhanced_max_speed',
			'enhanced_avg_speed'
		],
	},
	{
		label: 'power',
		fields: [
			'max_power',
			'avg_power',
			'normalized_power',
		],
	},
	{
		label: 'time',
		fields: [
			'total_timer_time',
			'total_elapsed_time',
			'start_time',
			'end_time'
		],
	},
	{
		label: 'cadence',
		fields: [
			'max_cadence',
			'avg_cadence'
		],
	},
	{
		label: 'elevation',
		fields: [
			'total_ascent',
			'total_descent',
			'max_altitude',
			'min_altitude'
		],
	},
	{
		label: 'temperature',
		fields: [
			'max_temperature',
			'avg_temperature'
		],
	},
	{
		label: 'other',
		fields: [
			'training_stress_score',
			'total_calories',
			'total_strides',
		],
	},
]
