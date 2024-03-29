import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
	const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
	return (
		<main>
			<section className='quiz quiz-small'>
				{/* amount */}
				<div className='heading-app'>
					<h1 className='heading-app'>LEARN TODAY</h1>
				</div>
				<form className='setup-form'>
					<h2>:setup quiz:</h2>
					<h4>to start answering...</h4>
					<div className='form-control'>
						<label htmlFor='amount'>number of questions</label>
						<input
							type='number'
							name='amount'
							id='amount'
							value={quiz.amount}
							onChange={handleChange}
							className='form-input'
							min={1}
							max={50}
						/>
					</div>
					{/* category */}
					<div className='form-control'>
						<label htmlFor='category'>Category</label>
						<select
							name='category'
							id='category'
							className='form-input'
							value={quiz.category}
							onChange={handleChange}
						>
							<option value='sports'>Sports</option>
							<option value='history'>history</option>
							<option value='politics'>politics</option>
						</select>
					</div>
					{/* difficulty */}
					<div className='form-control'>
						<label htmlFor='category'>Select Difficulty</label>
						<select
							name='difficulty'
							id='difficulty'
							className='form-input'
							value={quiz.difficulty}
							onChange={handleChange}
						>
							<option value='easy'>easy</option>
							<option value='medium'>medium</option>
							<option value='hard'>hard</option>
						</select>
					</div>
					{error && (
						<p className='error'>
							can't generate questions for this option, please try another one.
						</p>
					)}
					<button
						type='submit'
						onClick={handleSubmit}
						className='submit-btn'
					>
						start
					</button>
				</form>
			</section>
		</main>
	);
};

export default SetupForm;
