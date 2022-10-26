import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
	sports: 21,
	history: 23,
	politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

// Testing url
// const tempUrl =
// 	'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [waiting, setWaiting] = useState(true); //For filling form before making api call
	const [loading, setLoading] = useState(false); // for loading api
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [error, setError] = useState(false);
	const [quiz, setQuiz] = useState({
		amount: 10,
		category: 'sports',
		difficulty: 'easy',
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchQuestions = async url => {
		setLoading(true);
		setWaiting(false);

		const response = await axios.get(url).catch(err => console.log(err));

		if (response) {
			const data = response.data.results;
			if (data.length > 0) {
				setQuestions(data);
				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true);
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};
	const nextQuestion = () => {
		setIndex(oldIndex => {
			const index = oldIndex + 1;
			if (index > questions.length - 1) {
				openModal();
				return 0;
			} else {
				return index;
			}
		});
	};

	const checkAnswer = value => {
		if (value) {
			setCorrect(oldState => oldState + 1);
		}
		nextQuestion();
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setWaiting(true);
		setCorrect(0);
		setIsModalOpen(false);
	};

	// For testing while building the app
	// useEffect(() => {
	// 	fetchQuestions(tempUrl);
	// 	// setLoading(false);
	// }, []);

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;

		//! Dynamically updating input value via [name] while returning old state with spread operator
		setQuiz({ ...quiz, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		const { amount, category, difficulty } = quiz;
		const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
		fetchQuestions(url);
	};

	return (
		<AppContext.Provider
			value={{
				waiting,
				loading,
				questions,
				index,
				correct,
				error,
				quiz,
				handleChange,
				handleSubmit,
				isModalOpen,
				nextQuestion,
				checkAnswer,
				closeModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
