import './JournalAddButton.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton({children}) {
	return (
		<CardButton className='journal-add'>
			<img src="./plus.svg" alt="plus"></img>
			New memory
		</CardButton>
	);
}

export default JournalAddButton;