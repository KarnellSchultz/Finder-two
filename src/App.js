import React, { useState } from 'react';
import Form from './Form';

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
			name: 'Desktop',
			parentID: 0,
			type: 'file',
		},
		{
			id: 3,
			name: 'document!',
			parentID: 0,
			type: 'document',
		},
	];

	const [text, setText] = useState('');
	const [count, setCount] = useState(3);

	const [files, setFiles] = useState(tempFiles);
	const [currentFolderId, setCurrentFolderId] = useState(0);

	function nextId() {
		setCount(count + 1);
		return count;
	}
	function handleBackButtonClick(e) {
		e.preventDefault();
		let tempParentFolder = files.filter(item => item.id === currentFolderId);
		return setCurrentFolderId(tempParentFolder[0].parentID);
	}

	function handleFolderClick(e, tempID) {
		e.preventDefault();
		setCurrentFolderId(tempID);
	}

	const createFolder = () => {
		const newFile = {
			id: nextId(),
			name: text,
			parentID: currentFolderId,
			type: 'file',
		};
		setFiles([...files, newFile]);
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

	const renderFiles = () => {
		let currentView = [];
		files.map(file =>
			file.parentID === currentFolderId && file.type === 'file'
				? currentView.push(file)
				: null,
		);
		return currentView.map(item => {
			return (
				<li key={item.id}>
					<button className="file" onClick={e => handleFolderClick(e, item.id)}>
						{item.name}
					</button>
				</li>
			);
		});
	};

	const renderDocuments = () => {
		let documentCurrentView = [];
		files.map(document =>
			document.parentID === currentFolderId && document.type === 'document'
				? documentCurrentView.push(document)
				: null,
		);
		return documentCurrentView.map(item => {
			return (
				<li key={item.id}>
					<button className="document">{item.name}</button>
				</li>
			);
		});
	};

	const folderHeading = () => {
		if (currentFolderId) {
			let heading = files.filter(item => item.id === currentFolderId);
			return heading[0].name;
		} else {
			return 'Root';
		}
	};

	return (
		<>
			<h1>{folderHeading()}</h1>
			<Form
				handleTextChange={handleTextChange}
				handleSubmit={handleSubmit}
				text={text}
			/>
			{currentFolderId === 0 ? (
				<button disabled onClick={e => handleBackButtonClick(e)}>
					Root
				</button>
			) : (
				<button onClick={e => handleBackButtonClick(e)}>..</button>
			)}
			<ul>{renderFiles()}</ul>
			<ul>{renderDocuments()}</ul>
		</>
	);
}
