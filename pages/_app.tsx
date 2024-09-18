import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { ThemeProvider, useTheme } from '@kobandavis/ui'
import { AppProps } from 'next/app'
import 'styles/globals.css'
import { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import moment from 'moment'

const satoshi = localFont({
	src: [
		{ path: './Satoshi-Variable.woff2', style: 'normal' },
		{ path: './Satoshi-VariableItalic.woff2', style: 'italic' },
	],
})

const defaultTheme = { primary: '#286983', secondary: '#faf4ed' }

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	const { setThemeColor } = useTheme()

	useEffect(() => {
		moment.updateLocale('en', {
			calendar: {
				lastDay: '[Yesterday]',
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				lastWeek: '[Last] dddd',
				nextWeek: '[Next] dddd',
				sameElse: 'MMMM Do',
			},
		})

		document.body.classList.add(satoshi.className)
		setThemeColor('primary', localStorage.getItem('primary') ?? defaultTheme.primary)
		setThemeColor('secondary', localStorage.getItem('secondary') ?? defaultTheme.secondary)
	}, [])

	return (
		<ThemeProvider>
			<Head>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥣</text></svg>'
				/>
				<title>Oats</title>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

const AppWithTheme = (props: AppProps) => {
	return (
		<ThemeProvider>
			<App {...props} />
		</ThemeProvider>
	)
}

// ssr is for losers
// export default AppWithTheme
export default dynamic(Promise.resolve(AppWithTheme), { ssr: false })
