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
	const data = [
		{
			title: 'Preparing for course updates',
			date: new Date(),
			text: 'Mountain hikes reveal amazing landscapes'
		},
		{
			title: 'Journal',
			date: new Date(),
			text: 'Do mountaineering and mountain tourism'
		}
	];

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					<CardButton>
						<JournalItem
							title={data[0].title}
							date={data[0].date}
							text={data[0].text}
						/>
					</CardButton>
					<CardButton>
						<JournalItem
							title={data[1].title}
							date={data[1].date}
							text={data[1].text}
						/>
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Content>
				<JournalForm />
			</Content>
		</div>
	);
}

export default App;
