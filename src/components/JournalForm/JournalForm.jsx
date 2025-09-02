import styles from './JournalForm.module.css';
import React, {useEffect, useReducer, useState} from 'react';
import Button from '../Button/Button.jsx';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';

function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const {isValid, isFormReadyToSubmit, values} = formState;
	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			timerId = setTimeout(() => {
				console.log('Очистка состояния');
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'RESET_DATA'});
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispatchForm({type: 'SET_DATA', payload: {[e.target.name]: e.target.value}});
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input type="text" name="title" value={values.title} className={cn(styles['input-title'], {
						[styles['invalid']]: !isValid.title
					})} onChange={onChange}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="./date.svg" alt="Date icon"/>
						<span>Date</span>
					</label>
					<input type="date" name="date" id="date" value={values.date} className={cn(styles['input'], {
							   [styles['invalid']] : !isValid.date
						   })}
						   onChange={onChange}/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="tag" className={styles['form-label']}>
						<img src="./folder.svg" alt="Folder icon"/>
						<span>Tag</span>
					</label>
					<input type="text" name="tag" id="tag" value={values.tag} className={styles['input']}
						   onChange={onChange}/>
				</div>
				<textarea name="text" id="" cols="30" rows="10" value={values.text}
						  className={cn(styles['input'], {
							  [styles['invalid']]: !isValid.text
						  })}
						  onChange={onChange}/>
				<Button text="Save"/>
			</form>
		</>
	);
}

export default JournalForm;
