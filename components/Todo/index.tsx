import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Label } from '@kobandavis/ui'
import clsx from 'clsx'
import Checkbox from 'components/Checkbox/Checkbox'
import moment from 'moment'
import { isOverdue } from 'pages'
import { FC } from 'react'
import { Todo } from 'types'

interface TodoProps extends Todo {
	onToggle: () => void
	deleteTodo: (id: string) => void
	editTodo: (id: string) => void
}

const TodoComponent: FC<TodoProps> = ({ onToggle, deleteTodo, editTodo, ...todo }) => {
	return (
		<div className='overflow-hidden flex p-2 items-center rounded bg-theme-secondary group' key={todo.id}>
			<div className='flex space-x-2 items-center w-full'>
				<Checkbox onToggle={onToggle} label={todo.id} size='sm' checked={Boolean(todo.completed)} />
				{todo.deadline ? <span className='font-bold'>{moment(todo.deadline).format('HH:mm')}</span> : null}
				<span>{todo.title}</span>
			</div>
			<Label
				type='secondary'
				className={clsx('transition-all translate-x-12 group-hover:translate-x-0 ml-auto text-red-400', isOverdue(todo) ? 'opacity-100' : 'opacity-0')}
			>
				Overdue
			</Label>
			<div className='flex items-center ml-3 space-x-1 transition-transform translate-x-12 group-hover:translate-x-0'>
				<PencilIcon onClick={() => editTodo(todo.id)} className='h-4 w-4 cursor-pointer' />
				<TrashIcon onClick={() => deleteTodo(todo.id)} className='h-4 w-4 text-red-400 fill-current cursor-pointer' />
			</div>
		</div>
	)
}

export default TodoComponent
