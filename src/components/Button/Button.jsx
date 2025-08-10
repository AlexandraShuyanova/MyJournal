import './Button.css';
import React from 'react';

function Button({text, onClick}) {
	return (
		<button className='button accent' onClick={onClick}>{text}</button>
	);
}

export default Button;
