import React from "react";

export const FileViewDisplay = ({
  handleDeleteClick,
  handleFolderClick,
  fileView,
  docView,
}) => {
  const fileRow = fileView.map((file) => {
    return (
      <tr key={file._id}>
        <td>{file.name}</td>
        <td>
          <button onClick={(e) => handleFolderClick(e, file._id)}>Click</button>
        </td>
        <td>
          <button onClick={(e) => handleDeleteClick(e, file._id)}>
            {"❌"}
          </button>
        </td>
      </tr>
    );
  });
  const docRow = docView.map((doc) => {
    return (
      <tr key={doc._id}>
        <td> {doc.name} </td>
        <td>
          <button disabled className="accent-button">
            click
          </button>
        </td>
        <td>
          <button onClick={(e) => handleDeleteClick(e, doc._id)}>{"❌"}</button>
        </td>
      </tr>
    );
  });

  return (
    <table className="striped-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Go-To</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Footer 1</th>
          <th>Footer 2</th>
          <th>Footer 3</th>
        </tr>
      </tfoot>
      <tbody>
        {fileRow}
        {docRow}
      </tbody>
    </table>
  );
};
