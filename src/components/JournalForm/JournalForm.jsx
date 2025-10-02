import styles from './JournalForm.module.css';
import React, {useContext, useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button.jsx';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalForm({onSubmit, selectedItem, onRemove}) {

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
		if(!selectedItem) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type: 'SET_DATA', payload: {userId}});
		}
		if (selectedItem) {
			dispatchForm({type: 'SET_DATA', payload:{...selectedItem}});
		}
	}, [selectedItem]);

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
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type: 'SET_DATA', payload: {userId}});
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

	const removeJournalItem = () => {
		onRemove(selectedItem.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({type: 'SET_DATA', payload: {userId}});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type="text" name="title" isValid={isValid.title} ref={titleRef} value={values.title} appearance="title"
					   onChange={onChange}/>
				{selectedItem?.id && <button className={styles['delete']} type='button' onClick={removeJournalItem}>
					<img src="./archive.svg" alt="Archive button"/>
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="./date.svg" alt="Date icon"/>
					<span>Date</span>
				</label>
				<Input type="date" name="date" isValid={isValid.date} ref={dateRef} id="date" appearance="date" value={values.date ? new Date(values.date).toISOString().slice(0, 10) : '' }
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
			<div className={styles['form-row']}>
				<textarea name="text" id="" ref={textRef} cols="30" rows="10" value={values.text}
						  className={cn(styles['input'], styles['textarea'], {
							  [styles['invalid']]: !isValid.text
						  })}
						  onChange={onChange}/>
			</div>
			<Button>Save</Button>
		</form>
	);
}

export default JournalForm;
