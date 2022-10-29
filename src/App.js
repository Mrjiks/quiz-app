import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
	const {
		waiting,
		loading,
		correct,
		questions,
		index,
		nextQuestion,
		checkAnswer,
	} = useGlobalContext();

	if (waiting) {
		return <SetupForm />;
	}

	if (loading) {
		return <Loading />;
	}
	const { question, incorrect_answers, correct_answer } = questions[index];

	//? Randomize correct answer
	//! answers array must have elements (3 incorrect and 1 correct answer // 0-3)
	//! Math.random return 0-0.99 (therefore 0.99*4 === 3.96)
	//!Math.floor rounds down nearest whole number

	let answers = [...incorrect_answers];
	let tempIndex = Math.floor(Math.random() * 4);

	//? Placing the correct answer using the generated tempIndex
	if (tempIndex === 3) {
		answers.push(correct_answer);
	} else {
		answers.push(answers[tempIndex]);
		answers[tempIndex] = correct_answer;
	}
	return (
		<main>
			<Modal />
			<section className='quiz quiz-small'>
				<div>
					<h1 className='heading-app'>LEARN TODAY</h1>
				</div>
				<div className='question-ans'>
					<h4>Questions:</h4>
					<p className='correct-answers'>
						correct answer: {correct}/{questions.length}
					</p>
				</div>
				<article className='container'>
					<p className='single-question'>Question:{index + 1}</p>
					<p
						dangerouslySetInnerHTML={{ __html: question }}
						className='question-text'
					/>
					<div className='btn-container'>
						{answers.map((answer, index) => {
							return (
								<button
									className='answer-btn'
									key={index}
									onClick={() => checkAnswer(correct_answer === answer)}
									dangerouslySetInnerHTML={{ __html: answer }}
								/>
							);
						})}
					</div>
				</article>
				<button
					className='next-question'
					onClick={nextQuestion}
				>
					next question
				</button>
			</section>
		</main>
	);
}

export default App;
