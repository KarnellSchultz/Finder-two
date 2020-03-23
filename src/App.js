import React, { useState } from 'react';

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
			name: 'Docs',
			parentID: 0,
			type: 'file',
		},
		{
			id: 3,
			name: 'Maps',
			parentID: 0,
			type: 'file',
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

	const renderFiles = () => {
		let currentView = [];
		files.map(file =>
			file.parentID === currentFolderId ? currentView.push(file) : null,
		);
		console.table(currentView);
		return currentView.map((item, index) => {
			return (
				<li key={item.id}>
					<button className="file" onClick={e => handleFolderClick(e, item.id)}>
						{item.name}
					</button>
				</li>
			);
		});
	};

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
			<form>
				<input
					type="text"
					name="input"
					id="input"
					placeholder="input"
					value={text}
					onChange={e => {
						handleTextChange(e);
					}}
					onSubmit={() => setText('')}
				/>
				<button
					type="submit"
					onClick={e => {
						handleSubmit(e);
					}}>
					Submit
				</button>
			</form>
			{currentFolderId === 0 ? (
				<button disabled onClick={e => handleBackButtonClick(e)}>
					Root
				</button>
			) : (
				<button onClick={e => handleBackButtonClick(e)}>..</button>
			)}
			<ul>{renderFiles()}</ul>
		</>
	);
}
