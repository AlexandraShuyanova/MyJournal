import './JournalForm.css';
import React, {useState} from 'react';
import Button from '../Button/Button.jsx';

function JournalForm() {

	const [inputText, setInputText] = useState('');

	const inputTextChanged = (event) => {
		setInputText(event.target.value);
	};

	const addJournalItem = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};

	return (
		<>
			<form className="journal-form" onSubmit={addJournalItem}>
				<input type="text" name="title"/>
				<input type="date" name="date"/>
				<input type="text" name="tag" value={inputText} onChange={inputTextChanged}/>
				<textarea name="post" id="" cols="30" rows="10"/>
				<Button text="Save" onClick={() => console.log('Saved!')}/>
			</form>
		</>
	);
}

export default JournalForm;
