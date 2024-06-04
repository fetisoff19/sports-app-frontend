import React from 'react'

interface IProps {
	fill?: string
}

export const WalkingIcon: React.FC<IProps> = ({fill = 'black'}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='31'
			height='31'
			viewBox='0 0 19 31'
			fill='none'
		>
			<g clipPath='url(#clip0_172_3262)'>
				<path
					d='M12.1875 6.02499C13.7402 6.02499 15 4.76523 15 3.21249C15 1.65976 13.7402 0.399994 12.1875 0.399994C10.6348 0.399994 9.375 1.65976 9.375 3.21249C9.375 4.76523 10.6348 6.02499 12.1875 6.02499ZM17.7246 14.7613L16.3594 14.0699L15.791 12.3473C14.9297 9.73398 12.5273 7.90585 9.80274 7.89999C7.69336 7.89413 6.52734 8.49179 4.33594 9.37656C3.07031 9.88632 2.0332 10.8531 1.42383 12.0836L1.03125 12.8805C0.574219 13.8062 0.943359 14.9312 1.86328 15.3941C2.77734 15.857 3.89062 15.482 4.35352 14.5562L4.74609 13.7594C4.95117 13.3492 5.29102 13.0269 5.71289 12.857L7.2832 12.2242L6.39258 15.7809C6.08789 16.9996 6.41602 18.2945 7.26562 19.2262L10.7754 23.0582C11.1973 23.5211 11.4961 24.0777 11.6484 24.6812L12.7207 28.9762C12.9727 29.9781 13.9922 30.5934 14.9941 30.3414C15.9961 30.0894 16.6113 29.0699 16.3594 28.068L15.0586 22.8531C14.9062 22.2496 14.6074 21.6871 14.1855 21.2301L11.5195 18.318L12.5273 14.2926L12.8496 15.2594C13.1602 16.2027 13.8281 16.982 14.707 17.4273L16.0723 18.1187C16.9863 18.5816 18.0996 18.2066 18.5625 17.2809C19.0137 16.3609 18.6445 15.2242 17.7246 14.7613ZM4.3125 23.0055C4.125 23.4801 3.84375 23.9078 3.48047 24.2652L0.550781 27.2008C-0.181641 27.9332 -0.181641 29.1227 0.550781 29.8551C1.2832 30.5875 2.4668 30.5875 3.19922 29.8551L6.67969 26.3746C7.03711 26.0172 7.31836 25.5894 7.51172 25.1148L8.30273 23.1344C5.0625 19.6012 6.03516 20.6852 5.52539 19.9879L4.3125 23.0055Z'
					fill={fill}
				/>
			</g>
			<defs>
				<clipPath id='clip0_172_3262'>
					<rect
						width='18.75'
						height='30'
						fill={fill}
						transform='translate(0 0.399994)'
					/>
				</clipPath>
			</defs>
		</svg>
	)
}
