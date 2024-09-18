import { useState } from 'react'

export default function useLocalState(key: string, defaultValue?: string): [string, (v: string) => void] {
	const localValue = localStorage.getItem(key)
	const [state, setState] = useState(localValue ?? defaultValue ?? null)

	if (!localValue && defaultValue) {
		localStorage.setItem(key, defaultValue)
	}

	function updateState(value: string): void {
		setState(value)
		localStorage.setItem(key, value)
	}

	return [state, updateState]
}
