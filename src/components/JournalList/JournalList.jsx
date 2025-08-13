import './JournalList.css';
import React from 'react';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';

function JournalList({items}) {

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
		{items.sort(sortItems).map(el => (
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