import Highcharts from 'highcharts'

export const chartsBaseOptions: Highcharts.Options = {
	
	title: {
		text: ''
	},
	chart: {
		backgroundColor: 'transparent',
		height: 450,
		zooming: {
			type: 'x',
			resetButton: {
				theme: {
					fill: '#1d1e21',
					stroke: '#1d1e21',
					r: 8,
					style: {
						color: '#9A9FA3',
					},
					states: {
						hover: {
							fill: '#20252e',
							style: {
								color: 'white'
							}
						}
					}
				}
			}
		}
	},
	legend: {
		enabled: false
	},
	xAxis: {
		labels: {
			style: {
				color: '#9A9FA3'
			},
		},
		gridLineColor: '#9A9FA3',
		lineColor: '#9A9FA3',
	},
	yAxis: {
		labels: {
			style: {
				color: '#9A9FA3'
			}
		},
		title: {
			text: ''
		},
		gridLineColor: '#9A9FA3',
		lineColor: '#9A9FA3',
	},
	tooltip: {
		backgroundColor: '#1e1f22',
		useHTML: true,
	},
	accessibility: {
		enabled: false
	}
	
}
