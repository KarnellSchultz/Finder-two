import React from "react";

export default function View({
  renderType,
  files,
  currentFolderId,
  handleFolderClick,
  handleDeleteClick
}) {
  function CreateListOfItemsToRender() {
    let currentView = [];

    files.map(item => {
      console.log(item);
      return item.parentID === currentFolderId && item.type === renderType
        ? currentView.push(item)
        : null;
    });

    const view = currentView.map(item => (
      <li key={item._id}>
        {item.type === "file" ? (
          <>
            <button
              className="file"
              onClick={e => handleFolderClick(e, item._id)}
            >
              {item.name}
            </button>
            <button
              onClick={e => {
                handleDeleteClick(e, item._id);
              }}
            >
              {" "}
              💣
            </button>
          </>
        ) : (
          <button className={item.type}>{item.name}</button>
        )}
      </li>
    ));

    return <ul> {view}</ul>;
  }

  return <CreateListOfItemsToRender />;
}
