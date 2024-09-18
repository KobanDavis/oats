const { kdUI } = require('@kobandavis/ui')

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	plugins: [],
}

kdUI(module.exports)
