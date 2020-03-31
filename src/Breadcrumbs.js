import React from 'react';

export default function Breadcrumbs({ files, currentFolderId }) {
	displayBread();

	function displayBread() {
		let result = '';
		let currentFileTarget;
		let tempCurrentFolderID = currentFolderId;
		console.log(currentFolderId);
		console.log(files.filter(item => item._id === currentFolderId));

		if (tempCurrentFolderID === 0) {
			return (result += 'Root!');
		} else if (tempCurrentFolderID !== 0) {
			currentFileTarget = files.filter(
				file => file._id === tempCurrentFolderID,
			);
			console.log({ currentFileTarget });
			return (result += currentFileTarget[0].name);
		}

		return result;
	}

	return <div>{displayBread()}</div>;
}
