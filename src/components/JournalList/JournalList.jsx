import './JournalList.css';
import React, {useContext} from 'react';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalList({items}) {

	const {userId} = useContext(UserContext);
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	if (items.length === 0) {
		return <p>No memories for now. Add some!</p>;
	}

	return <>
		{items.filter(el => el.userId === userId).sort(sortItems).map(el => (
			<CardButton key={el.id}>
				<JournalItem
					title={el.title}
					date={el.date}
					text={el.text}
				/>
			</CardButton>
		))}
	</>;
}

export default JournalList;