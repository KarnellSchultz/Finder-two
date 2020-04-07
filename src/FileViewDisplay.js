import React from "react";
import { useSpring, animated } from "react-spring";

export const FileViewDisplay = ({
  handleDeleteClick,
  handleFolderClick,
  fileView,
  docView,
  goHome,
}) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

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
          <th>
            <button onClick={goHome}>Root</button>
          </th>
        </tr>
      </tfoot>
      {fileRow.length === 0 && docView.length === 0 ? (
        <tr>
          <td>No Files in this directory</td>
          <td></td>
          <td></td>
        </tr>
      ) : (
        <animated.tbody style={props}>
          {fileRow}
          {docRow}
        </animated.tbody>
      )}
    </table>
  );
};
