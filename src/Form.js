import React from 'react';

export default function Form({
	handleSubmit,
	text,
	handleRadioChange,
	isFile = true,
	handleTextChange,
}) {
	return (
		<form
			onSubmit={e => {
				handleSubmit(e);
			}}>
			<input
				type="text"
				name="input"
				id="input"
				placeholder="input"
				value={text}
				onChange={e => {
					handleTextChange(e);
				}}
			/>
			<div className="radio">
				<label htmlFor="folder">
					File
					<input
						onChange={handleRadioChange}
						type="radio"
						name="folder"
						checked={isFile}
					/>
				</label>
				<label htmlFor="file">
					Document
					<input
						onChange={handleRadioChange}
						type="radio"
						name="file"
						checked={!isFile}
					/>
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
