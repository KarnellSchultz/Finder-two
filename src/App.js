import React, { useState } from 'react';

import Form from './Form';
import View from './View';

export default function App() {
	let tempFiles = [
		{
			id: 1,
			name: 'Home',
			parentID: 0,
			type: 'file',
		},
		{
			id: 2,
			name: 'document!',
			parentID: 0,
			type: 'document',
		},
	];

	const [text, setText] = useState('');
	const [count, setCount] = useState(3);
	const [isFile, setIsFile] = useState(true);

	const [files, setFiles] = useState(tempFiles);
	const [currentFolderId, setCurrentFolderId] = useState(0);

	function nextId() {
		setCount(count + 1);
		return count;
	}

	const createFolder = () => {
		const newFile = {
			id: nextId(),
			name: text,
			parentID: currentFolderId,
			type: isFile ? 'file' : 'document',
		};
		setFiles([...files, newFile]);
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

	const getData = async () => {
		let data = await fetch('http://localhost:9000/files');
		let result = await data.text();
		console.log(result);
	};

	const data = { username: 'BOOOYYYYYY' };

	async function postTest() {
		let response = await fetch('http://localhost:9000/files', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		console.log(response.statusText);
	}

	// get files

	//post files

	return (
		<>
			<FolderHeading />
			<button onClick={getData}>GET</button>
			<button onClick={postTest}>POST</button>
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
			<View
				handleFolderClick={handleFolderClick}
				currentFolderId={currentFolderId}
				files={files}
				renderType={'file'}
			/>

			<View
				handleFolderClick={handleFolderClick}
				currentFolderId={currentFolderId}
				files={files}
				renderType={'document'}
			/>
		</>
	);
}
