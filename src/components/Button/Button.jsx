import './Button.css';
import React from 'react';

function Button() {

	const [text, setText] = React.useState('Save');
	const clicked = () => {
		setText('Saved:)');
	};

	return (
		<button onClick={clicked} className='button accent'>{text}</button>
	);
}

export default Button;
