import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './Layouts/LeftPanel/LeftPanel.jsx';
import Content from './Layouts/Content/Content.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButoon/JournalAddButton.jsx';
import React, {useContext, useEffect, useState} from 'react';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useLocalstorage} from './hooks/use-localstorage.hook.js';
import {UserContextProvider} from './context/user.context.jsx';

function mapItems(items) {
	if (!Array.isArray(items)) return [];
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalstorage('data' );

	const addItem = (item) => {
		setItems([...mapItems(items), {
			...item,
			date: new Date(item.date),
			id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1.
		}]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(items)}/>
				</LeftPanel>
				<Content>
					<JournalForm onSubmit={item => addItem(item)}/>
				</Content>
			</div>
		</UserContextProvider>

	);
}

export default App;
