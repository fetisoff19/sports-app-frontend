export const PointIcon = ({isEnd = false}) => {
	return (
		<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
		     className="custom-marker"
		     width="18px" height="18px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
			<g>
				<path fill={isEnd ? '#ef6a56' : '#0989dc'} d="M32,52.789l-12-18C18.5,32,16,28.031,16,24c0-8.836,7.164-16,16-16s16,7.164,16,16
					c0,4.031-2.055,8-4,10.789L32,52.789z"/>
				<g>
					<path fill="white" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289
						l16,24C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289
						C54.289,34.008,56,29.219,56,24C56,10.746,45.254,0,32,0z M44,34.789l-12,18l-12-18C18.5,32,16,28.031,16,24
						c0-8.836,7.164-16,16-16s16,7.164,16,16C48,28.031,45.945,32,44,34.789z"/>
					<circle fill="white" cx="32" cy="24" r="8"/>
				</g>
			</g>
		</svg>
	)
}