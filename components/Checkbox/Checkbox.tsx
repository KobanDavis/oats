import clsx from 'clsx'
import React, { FC, MouseEvent } from 'react'
import { backgroundPrimaryActive, backgroundSecondaryActive } from '@kobandavis/ui'

type CheckboxSize = 'sm' | 'md' | 'lg'

interface CheckboxProps {
	checked?: boolean
	className?: string
	label?: string
	onToggle?(checked: boolean, e: MouseEvent<HTMLButtonElement>): void
	size?: CheckboxSize
	disabled?: boolean
}

const Checkbox: FC<CheckboxProps> = ({ disabled = false, size = 'md', checked = false, className, label, onToggle }) => {
	const sizeStyles = {
		sm: `p-0.5 h-4 w-4`,
		md: `p-1 h-6 w-6`,
		lg: `p-1.5 h-8 w-8`,
	}

	const activeStyles: any = {
		false: backgroundSecondaryActive,
		true: backgroundPrimaryActive,
	}

	return (
		<button
			aria-checked={checked}
			role='checkbox'
			id={label}
			disabled={disabled}
			onClick={(e): void => onToggle?.(!checked, e)}
			className={clsx(
				className,
				'rounded-[3px] cursor-pointer transition-colors',
				sizeStyles[size],
				activeStyles[disabled ? 'false' : Boolean(checked).toString()],
				disabled && 'pointer-events-none'
			)}
		>
			{checked ? <Check size={size} /> : null}
		</button>
	)
}

const Check: FC<{ size: CheckboxSize }> = ({ size }) => {
	const checkStyles = {
		sm: {
			dimensions: 12,
			strokeWidth: 2,
		},
		md: {
			dimensions: 16,
			strokeWidth: 2,
		},
		lg: {
			dimensions: 20,
			strokeWidth: 4,
		},
	}
	return (
		<svg
			strokeWidth={checkStyles[size].strokeWidth}
			stroke='#ffffff'
			fill='none'
			viewBox='0 0 24 24'
			width={checkStyles[size].dimensions}
			height={checkStyles[size].dimensions}
			xmlns='http://www.w3.org/2000/svg'
			clipRule='evenodd'
		>
			<path d='M 0 12 L 8 20 L 24 4' />
		</svg>
	)
}

export default Checkbox
