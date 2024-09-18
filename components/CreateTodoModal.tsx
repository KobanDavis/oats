import { Button, Card, Input, Label, Modal } from '@kobandavis/ui'
import { FC, useState } from 'react'
import { Todo } from 'types'

interface CreateTodoModalProps {
	submit: (todo: Todo) => void
	close: () => void
}

const CreateTodoModal: FC<CreateTodoModalProps> = ({ close, submit }) => {
	const [title, setTitle] = useState<string>('')
	const [deadline, setDeadline] = useState<number>(null)

	return (
		<Modal close={close}>
			{() => (
				<Card className='h-min min-w-[20rem] select-none' title='Create new todo'>
					<div className='space-y-4'>
						<div className='flex flex-col space-y-2'>
							<Label type='primary'>Title</Label>
							<Input onChange={(e) => setTitle(e.target.value)} />
						</div>
						<div className='flex flex-col space-y-2'>
							<Label type='primary'>Deadline</Label>
							<Input htmlType='datetime-local' onChange={(e) => setDeadline(Number(new Date(e.target.value)))} />
						</div>

						<Button
							className='w-full'
							disabled={!title}
							onClick={() => submit({ id: Math.random().toString().substring(3, 10), title, deadline, created: Date.now() })}
							type='primary'
						>
							Create todo
						</Button>
					</div>
				</Card>
			)}
		</Modal>
	)
}

export default CreateTodoModal
