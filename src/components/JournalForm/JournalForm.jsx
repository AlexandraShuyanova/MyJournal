import './JournalForm.css';
import React, {useState} from 'react';
import Button from '../Button/Button.jsx';

function JournalForm({onSubmit}) {

	const [formValidState, setFormValidState] = useState({
		title: true,
		date: true,
		text: true
	});

	const addJournalItem = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		let isValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}
		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isValid = false;
		} else {
			setFormValidState(state => ({...state, text: true}));
		}
		if (!isValid) {
			return;
		}
		onSubmit(formProps);
		setFormData(INITIAL_DATA);
	};

	const INITIAL_DATA =
		{
			title: '',
			date: '',
			tag: '',
			text: ''
		};

	const [formData, setFormData] = useState(INITIAL_DATA);

	return (
		<>
			<form className="journal-form" onSubmit={addJournalItem}>
				<input type="text" name="title" value={formData.title} style={{border: formValidState.title ? 'none' : '1px solid red'}} onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}/>
				<input type="date" name="date" value={formData.date} style={{border: formValidState.date ? 'none' : '1px solid red'}} onChange={e => setFormData(prev => ({...prev, date: e.target.value}))}/>
				<input type="text" name="tag" value={formData.tag} onChange={e => setFormData(prev => ({...prev, tag: e.target.value}))}/>
				<textarea name="text" id="" cols="30" rows="10" value={formData.text} style={{border: formValidState.text ? 'none' : '1px solid red'}} onChange={e => setFormData(prev => ({...prev, text: e.target.value}))}/>
				<Button text="Save"/>
			</form>
		</>
	);
}

export default JournalForm;
