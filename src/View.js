import React from 'react';

export default function View({
	renderType,
	files,
	currentFolderId,
	handleFolderClick,
}) {
	const createListOfItemsToRender = files => {
		let currentView = [];
		files.map(item => {
			console.log(item, currentFolderId);
			return item.parentID === currentFolderId && item.type === renderType
				? currentView.push(item)
				: null;
		});
		const view = currentView.map(item => (
			<li key={item.id}>
				{item.type === 'file' ? (
					<button className="file" onClick={e => handleFolderClick(e, item.id)}>
						{item.name}
					</button>
				) : (
					<button className={item.type}>{item.name}</button>
				)}
			</li>
		));

		return view;
	};

	return <ul>{createListOfItemsToRender(files)}</ul>;
}
