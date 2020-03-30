import React, { useState, useEffect } from 'react';

import Form from './Form';
import View from './View';

export default function App() {
	const [text, setText] = useState('');
	const [isFile, setIsFile] = useState(() => true);

	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState(() => getFiles());
	const [currentFolderId, setCurrentFolderId] = useState(0);
	const [count, setCount] = useState(async () => 0);

	useEffect(() => {
		setCount(files.length + 1);
		console.log(files.length);
		console.log(files);
	}, [files]);

	async function getFiles() {
		setIsLoading(true);
		let data = await fetch('http://localhost:9000/files');
		const text = await data.text();
		setFiles(JSON.parse(text));
		setIsLoading(false);
	}

	// const option = {
	// 	method: 'POST', // or 'PUT'
	// 	body: JSON.stringify(tempFile),
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	}}

	async function postNewFileToDataBase(tempFile) {
		let response = await fetch('http://localhost:9000/files', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(tempFile),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(response.statusText);
	}

	function nextId() {
		setCount(count + 1);
		return count;
	}

	const createFolder = () => {
		const newFile = {
			id: files.length + 1,
			name: text,
			parentID: currentFolderId,
			type: isFile ? 'file' : 'document',
		};
		postNewFileToDataBase(newFile);
	};

	function handleBackButtonClick(e) {
		e.preventDefault();
		let tempParentFolder = files.filter(item => item.id === currentFolderId);
		return setCurrentFolderId(tempParentFolder[0].parentID);
	}

	function handleFolderClick(e, tempID) {
		e.preventDefault();
		setCurrentFolderId(tempID);
	}
	const handleRadioChange = () => {
		setIsFile(!isFile);
	};

	const handleTextChange = e => {
		e.preventDefault();
		setText(e.currentTarget.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		text.length > 0 && createFolder();
		setText('');
	};

	const FolderHeading = () => {
		if (currentFolderId) {
			let heading = files.filter(item => item.id === currentFolderId);
			return <h1>{heading[0].name}</h1>;
		} else {
			return <h1>Root</h1>;
		}
	};

	return (
		<>
			<FolderHeading />
			<button onClick={getFiles}>GET</button>
			{/* <button onClick={postNewFileToDataBase}>POST</button> */}
			<Form
				handleRadioChange={handleRadioChange}
				handleTextChange={handleTextChange}
				handleSubmit={handleSubmit}
				isFile={isFile}
				text={text}
			/>
			{currentFolderId === 0 ? (
				<button disabled onClick={e => handleBackButtonClick(e)}>
					Root
				</button>
			) : (
				<button onClick={e => handleBackButtonClick(e)}>..</button>
			)}
			{!isLoading && (
				<View
					handleFolderClick={handleFolderClick}
					currentFolderId={currentFolderId}
					files={files}
					renderType={'file'}
				/>
			)}
			{!isLoading && (
				<View
					handleFolderClick={handleFolderClick}
					currentFolderId={currentFolderId}
					files={files}
					renderType={'document'}
				/>
			)}
		</>
	);
}
