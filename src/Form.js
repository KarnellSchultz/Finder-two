import React from 'react';

export default function Form({
	handleSubmit,
	text,
	handleRadioChange,
	isFile,
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
						onClick={handleRadioChange}
						type="radio"
						name="folder"
						value=""
						checked={isFile}
					/>
				</label>
				<label htmlFor="file">
					Document
					<input
						onClick={handleRadioChange}
						type="radio"
						name="file"
						value=""
						checked={!isFile}
					/>
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
