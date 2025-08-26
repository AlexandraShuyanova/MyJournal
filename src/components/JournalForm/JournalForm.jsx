import styles from './JournalForm.module.css';
import React, {useEffect, useState} from 'react';
import Button from '../Button/Button.jsx';
import cn from 'classnames';

const INITIAL_FORM_DATA =
	{
		title: '',
		date: '',
		tag: '',
		text: ''
	};

const INITIAL_FORM_STATE =
	{
		title: true,
		date: true,
		text: true
	};

function JournalForm({onSubmit}) {

	const [formData, setFormData] = useState([]);
	const [formValidState, setFormValidState] = useState(INITIAL_FORM_STATE);

	useEffect(() => {
		let timerId;
		if (!formValidState.title || !formValidState.date || !formValidState.text) {
			timerId = setTimeout(() => {
				console.log('Очистка состояния');
				setFormValidState(INITIAL_FORM_STATE);
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);
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
		setFormData(INITIAL_FORM_DATA);
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input type="text" name="title" value={formData.title} className={cn(styles['input-title'], {
						[styles['invalid']]: !formValidState.title
					})} onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="./date.svg" alt="Date icon"/>
						<span>Date</span>
					</label>
					<input type="date" name="date" id="date" value={formData.date} className={cn(styles['input'], {
							   [styles['invalid']] : !formValidState.date
						   })}
						   onChange={e => setFormData(prev => ({...prev, date: e.target.value}))}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="tag" className={styles['form-label']}>
						<img src="./folder.svg" alt="Folder icon"/>
						<span>Tag</span>
					</label>
					<input type="text" name="tag" id="tag" value={formData.tag} className={styles['input']}
						   onChange={e => setFormData(prev => ({...prev, tag: e.target.value}))}/>
				</div>
				<textarea name="text" id="" cols="30" rows="10" value={formData.text}
						  className={cn(styles['input'], {
							  [styles['invalid']]: !formValidState.text
						  })}
						  onChange={e => setFormData(prev => ({...prev, text: e.target.value}))}/>
				<Button text="Save"/>
			</form>
		</>
	);
}

export default JournalForm;
