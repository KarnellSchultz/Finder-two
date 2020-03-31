import React, { useState, useEffect } from 'react';

import Form from './Form';
import View from './View';
import Breadcrumbs from './Breadcrumbs';

export default function App() {
	const [userInputText, setUserInputText] = useState('');
	const [isFile, setIsFile] = useState(() => true);

	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState(() => getFiles());
	const [currentFolderId, setCurrentFolderId] = useState(0);

	useEffect(() => {
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
		getFiles();
		console.log(response.statusText);
	}

	const createFolder = () => {
		const newFile = {
			_id: files.length + 1,
			name: userInputText,
			parentID: currentFolderId,
			type: isFile ? 'file' : 'document',
		};
		postNewFileToDataBase(newFile);
	};

	function handleBackButtonClick(e) {
		e.preventDefault();
		let tempParentFolder = files.filter(item => item._id === currentFolderId);
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
		setUserInputText(e.currentTarget.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (userInputText.length === 0) {
			alert('Add a name before submitting');
		} else {
			createFolder();
			setUserInputText('');
		}
	};

	const FolderHeading = () => {
		if (currentFolderId) {
			let heading = files.filter(item => item._id === currentFolderId);
			return <h1>{heading[0].name}</h1>;
		} else {
			return <h1>Root</h1>;
		}
	};

	return (
		<>
			<FolderHeading />
			{files.length > 1 && (
				<Breadcrumbs currentFolderId={currentFolderId} files={files} />
			)}
			<Form
				handleRadioChange={handleRadioChange}
				handleTextChange={handleTextChange}
				handleSubmit={handleSubmit}
				isFile={isFile}
				userInputText={userInputText}
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
