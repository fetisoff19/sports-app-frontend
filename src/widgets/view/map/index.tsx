import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet'
import L, {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ReactDOMServer from 'react-dom/server'
import {PointIcon} from '@/shared/svg'
import {ReactNode, useLayoutEffect, useState} from 'react'

type MarkerProps = {
	position: LatLngExpression
	icon: ReactNode
}

const CustomMarker = ({position, icon}: MarkerProps) => {
	// const newIcon = new Leaflet.Icon({
	// 	iconUrl: icon,
	// 	iconSize: [30, 30],
	// 	iconAnchor: [15, 29]
	// })
	const newIcon = L.divIcon({
		html: ReactDOMServer.renderToString(icon),
		className: 'map-icon',
		iconSize: [30, 30],
		iconAnchor: [15, 29]
	})
	return <Marker position={position} icon={newIcon}/>
}

type Props = {
	points: LatLngExpression[] | undefined
	index: number
}

export const Map = ({points, index}: Props) => {
	const [isMountMap, setIsMountMap] = useState(false)
	
	//to prevent map re-initialization
	useLayoutEffect(() => {
		setIsMountMap(true)
		return () => {
			setIsMountMap(false)
		}
	}, [])
	
	if (!points?.length) {
		return null
	}
	
	let i = Math.round(index * points.length - 1)
	if (i >= points.length - 1) {
		i = points.length - 1
	}
	if (i < 0) {
		i = 0
	}
	
	
	if (isMountMap) return (
		<MapContainer className="filter h-[300px]" bounds={L.latLngBounds(points)}>
			<TileLayer attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
			<CustomMarker position={points[points.length - 1]} icon={<PointIcon isEnd={true}/>}/>
			<CustomMarker position={points[i]} icon={<PointIcon/>}/>
			<Polyline positions={points} color="black"/>
		</MapContainer>
	)
}
