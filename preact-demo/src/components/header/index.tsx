import { h } from 'preact'
import IntegrationVariants from '../integration-variants'
import style from './style.css'

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<img class='logo' src='../../assets/logo.svg' alt='Preact Logo' />
		<IntegrationVariants />
	</header>
)

export default Header
