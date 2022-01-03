import { css } from "@emotion/react"
import colors from "./color"

interface IHeaderProp {
	children: any
}

export function Header({ children }: IHeaderProp) {
	return (
		<header css={header}>
			<section css={headerContentWrapper}>
				{children}
			</section>
		</header>
	)
}

const header = css`
	width: 100%;
	height: 104px;
	display: flex;
	align-items: center;
	background: ${colors.primary[100]};
`

const headerContentWrapper = css`
	padding: 0 40px;
`

interface IBodyProp {
	children: any;
}

export function Body({ children }: IBodyProp) {
	return (
		<main css={body}>
			<section css={contentWrapper}>
				{children}
			</section>
		</main>
	)
}

const body = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 32px;
`

const contentWrapper = css`
	width: 800px;
`