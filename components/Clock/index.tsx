import moment from 'moment'
import { FC, useEffect, useState } from 'react'

interface ClockProps {}

const Clock: FC<ClockProps> = () => {
	const [time, setTime] = useState<number>(Date.now())

	useEffect(() => {
		setInterval(() => setTime(Date.now()), 1000)
	}, [])

	return <div className='text-xl font-bold'>{moment(time).format('HH:mm')}</div>
}

export default Clock
