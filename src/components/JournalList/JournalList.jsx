import './JournalList.css';
import React, {useContext, useMemo} from 'react';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalList({items, setItem}) {

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const {userId} = useContext(UserContext);
	const filteredItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortItems), [items, userId]);

	if (items.length === 0) {
		return <p>No memories for now. Add some!</p>;
	}

	return <>
		{filteredItems.map(el => (
			<CardButton key={el.id} onClick={() => setItem(el)}>
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