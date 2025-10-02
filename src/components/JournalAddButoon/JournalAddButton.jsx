import './JournalAddButton.css';
import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton({children, clearForm}) {
	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<img src="./plus.svg" alt="plus"></img>
			New memory
		</CardButton>
	);
}

export default JournalAddButton;