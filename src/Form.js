import React from 'react';

export default function Form({ handleSubmit, text, handleTextChange }) {
	const [file, isFile] = React.useState(true);
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
					Folder
					<input
						onClick={e => isFile(!file)}
						type="radio"
						name="folder"
						value=""
						checked={file}
					/>
				</label>
				<label htmlFor="file">
					File
					<input
						onClick={e => isFile(!file)}
						type="radio"
						name="file"
						value=""
						checked={!file}
					/>
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
