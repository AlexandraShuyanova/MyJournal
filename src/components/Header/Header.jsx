import './Header.css';

function Header({children}) {
	return (
		<img className="logo" src="/logo.svg" alt="logo"></img>
	);
}

export default Header;