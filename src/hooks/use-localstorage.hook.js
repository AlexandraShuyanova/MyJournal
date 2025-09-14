import {useEffect, useState} from 'react';

export function useLocalstorage(key) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const raw = localStorage.getItem(key);
		const res = raw ? JSON.parse(raw) : [];

		setData(res);
	},[]);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}