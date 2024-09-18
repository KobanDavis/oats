import { Label } from '@kobandavis/ui'
import clsx from 'clsx'
import Checkbox from 'components/Checkbox/Checkbox'
import moment from 'moment'
import { isOverdue } from 'pages'
import { FC } from 'react'
import { Todo } from 'types'

interface TodoProps extends Todo {
	onToggle: () => void
}

const TodoComponent: FC<TodoProps> = ({ onToggle, ...todo }) => {
	return (
		<div className='flex p-2 items-center rounded bg-theme-secondary' key={todo.id}>
			<div className='flex space-x-2 items-center w-full'>
				<Checkbox onToggle={onToggle} label={todo.id} size='sm' checked={Boolean(todo.completed)} />
				<span className='font-bold'>{moment(todo.deadline).format('HH:mm')}</span>
				<span>{todo.title}</span>
			</div>
			<Label type='secondary' className={clsx('transition-opacity ml-auto text-red-400', isOverdue(todo) ? 'opacity-100' : 'opacity-0')}>
				Overdue
			</Label>
		</div>
	)
}

export default TodoComponent
