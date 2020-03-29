import React from 'react';

export default function Files({ handleFolderClick, currentFolderId, files }) {
	const renderFiles = files => {
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

	return <ul>{renderFiles(files)}</ul>;
}
