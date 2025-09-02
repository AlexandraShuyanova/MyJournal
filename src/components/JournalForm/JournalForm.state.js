export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true,
		text: true
	},
	values: {
		title: '',
		date: '',
		text: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValidity = state.values.title?.trim().length;
		const textValidity = state.values.text?.trim().length;
		const dateValidity = state.values.date;

		return {
			...state,
			isValid: {
				title: titleValidity,
				date: dateValidity,
				text: textValidity
			},
			isFormReadyToSubmit: titleValidity && dateValidity && textValidity
		};
	}
	case 'RESET_DATA':
		return {...state, values: INITIAL_STATE.values};
	case 'SET_DATA':
		return {...state, values: {...state.values, ...action.payload}};
	}
}

