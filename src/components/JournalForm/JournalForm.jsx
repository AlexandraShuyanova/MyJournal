import styles from './JournalForm.module.css';
import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import Button from '../Button/Button.jsx';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		if (!isValid.title)
			titleRef.current.focus();
		else if(!isValid.date)
			dateRef.current.focus();
		else if(!isValid.text)
			textRef.current.focus();
	};

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			timerId = setTimeout(() => {
				focusError(isValid);
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
	}, [isFormReadyToSubmit, values, onSubmit]);

	useEffect(() => {
		dispatchForm({type: 'SET_DATA', payload: {userId}});
	}, [userId]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispatchForm({type: 'SET_DATA', payload: {[e.target.name]: e.target.value}});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type="text" name="title" isValid={isValid.title} ref={titleRef} value={values.title} appearance="title"
					   onChange={onChange}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="./date.svg" alt="Date icon"/>
					<span>Date</span>
				</label>
				<Input type="date" name="date" isValid={isValid.date} ref={dateRef} id="date" value={values.date}
					   onChange={onChange}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="./folder.svg" alt="Folder icon"/>
					<span>Tag</span>
				</label>
				<Input type="text" name="tag" id="tag" value={values.tag}
					   onChange={onChange}/>
			</div>
			<textarea name="text" id="" ref={textRef} cols="30" rows="10" value={values.text}
					  className={cn(styles['input'], {
						  [styles['invalid']]: !isValid.text
					  })}
					  onChange={onChange}/>
			<Button text="Save"/>
		</form>
	);
}

export default JournalForm;
