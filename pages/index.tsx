import { Button } from '@kobandavis/ui'
import useLocalState from 'hooks/useLocalState'
import { FC, useState } from 'react'
import { Todo } from 'types'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateTodoModal from 'components/CreateTodoModal'
import moment from 'moment'
import clsx from 'clsx'
import TodoComponent from 'components/Todo'

type Filter = 'All' | 'Deadline' | 'General' | 'Overdue' | 'Completed'
const filters: Filter[] = ['All', 'General', 'Deadline', 'Overdue', 'Completed']
export const isOverdue = (todo: Todo) => Date.now() > todo.deadline && !todo.completed

const Home: FC = () => {
	const [todosString, setTodosString] = useLocalState('todos', '[]')
	const [todoModalIsVisible, setTodoModalIsVisible] = useState(false)
	const [selectedFilter, setSelectedFilter] = useState<Filter>('All')

	const todos: Todo[] = JSON.parse(todosString)
	const groups = todos.reduce<Record<string, Todo[]>>(
		(groups, todo) => {
			switch (selectedFilter) {
				case 'All':
					break
				case 'Deadline':
					if (!todo.deadline) return groups
					break
				case 'General':
					if (todo.deadline) return groups
					break
				case 'Overdue':
					if (!isOverdue(todo)) return groups
					break
				case 'Completed':
					if (!todo.completed) return groups
					break
			}
			let deadline = 'Todo'
			if (todo.deadline) {
				deadline = moment(todo.deadline).format('dddd')
			}

			if (deadline in groups) {
				groups[deadline].push(todo)
			} else {
				groups[deadline] = [todo]
			}

			return groups
		},
		{ Overdue: [], Todo: [] }
	)

	const submit = (todo: Todo) => {
		todos.push(todo)
		setTodoModalIsVisible(false)
		setTodosString(JSON.stringify(todos))
	}

	const updateTodoCompleted = (id: string, completed?: number) => {
		const todo = todos.find((todo) => todo.id === id)
		todo.completed = completed
		setTodosString(JSON.stringify(todos))
	}

	const results = Object.values(groups).flat().length > 0

	return (
		<>
			<div className='flex flex-col w-1/2 max-lg:w-2/3 max-md:w-full max-md:px-8 mx-auto select-none h-screen'>
				<div className='flex items-center justify-between'>
					<span className='my-4 text-2xl font-bold'>Oats 🥣</span>
					<Button onClick={() => setTodoModalIsVisible(true)} icon type='secondary'>
						<PlusIcon className='text-theme-primary h-4 w-4 fill-current' />
					</Button>
				</div>
				<div className='flex flex-col'>
					<div className='flex overflow-x-auto hide-scrollbar'>
						{filters.map((filter) => (
							<div
								onClick={() => setSelectedFilter(filter)}
								className={clsx(
									'border-b-4 py-1 px-4 transition-colors',
									filter === selectedFilter
										? 'border-b-theme-primary'
										: 'cursor-pointer border-b-theme-primary/20 hover:border-b-theme-primary/50'
								)}
							>
								{filter}
							</div>
						))}

						<div className='w-full border-b-theme-primary/20 border-b-4'></div>
					</div>
					<div className='space-y-4 bg-theme-primary/5 shadow-inner p-4 min-h-80 w-full'>
						{results ? (
							Object.entries(groups).map(([group, todos]) =>
								todos.length ? (
									<div className='flex flex-col'>
										<span className={clsx('ml-1 mb-2 font-bold text-xl', group === 'Overdue' && 'text-red-500')}>{group}</span>
										<div>
											{todos.map((todo) => (
												<TodoComponent onToggle={() => updateTodoCompleted(todo.id, !todo.completed ? Date.now() : null)} {...todo} />
											))}
										</div>
									</div>
								) : null
							)
						) : (
							<span className='font-bold text-xl'>Nothing to see here :)</span>
						)}
					</div>
				</div>
			</div>
			{todoModalIsVisible ? <CreateTodoModal close={() => setTodoModalIsVisible(false)} submit={submit} /> : null}
		</>
	)
}

export default Home
