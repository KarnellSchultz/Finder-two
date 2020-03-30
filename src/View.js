import React from 'react';

export default function View({
	renderType,
	files,
	currentFolderId,
	handleFolderClick,
}) {
	function CreateListOfItemsToRender({ files }) {
		let currentView = [];
		files.map(item => {
			return item.parentID === currentFolderId && item.type === renderType
				? currentView.push(item)
				: null;
		});
		const view = currentView.map(item => (
			<li key={item._id}>
				{item.type === 'file' ? (
					<button
						className="file"
						onClick={e => handleFolderClick(e, item._id)}>
						{item.name}
					</button>
				) : (
					<button className={item.type}>{item.name}</button>
				)}
			</li>
		));

		return <ul> {view}</ul>;
	}

	// return <ul>{createListOfItemsToRender(files)}</ul>;
	return <CreateListOfItemsToRender files={files} />;
}
