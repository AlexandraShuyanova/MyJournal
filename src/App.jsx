import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton.jsx';
import LeftPanel from './Layouts/LeftPanel/LeftPanel.jsx';
import Content from './Layouts/Content/Content.jsx';
import Header from './components/Header/Header.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import JournalAddButton from './components/JournalAddButoon/JournalAddButton.jsx';
import React, {useState} from 'react';
import JournalForm from './components/JournalForm/JournalForm.jsx';

function App() {
	const INITIAL_DATA = [
		/*{
			id: 1,
			title: 'Preparing for course updates',
			date: new Date(),
			text: 'Mountain hikes reveal amazing landscapes'
		},
		{
			id: 2,
			title: 'Journal',
			date: new Date(),
			text: 'Do mountaineering and mountain tourism'
		}*/
	];

	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			title: item.title,
			text: item.text,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(el => el.id)) + 1 : 1
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items}/>
			</LeftPanel>
			<Content>
				<JournalForm onSubmit={item => addItem(item)}/>
			</Content>
		</div>
	);
}

export default App;
