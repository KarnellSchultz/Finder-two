import React, { useState, useEffect } from "react";

import FileView from "./FileView";
import { Layout } from "./Layout";

// const home = [
//   {
//     _id: 0,
//     name: "Home",
//     parentID: 0,
//     type: "file"
//   }
// ];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([
    {
      _id: 0,
      parentID: 0,
      name: "Home",
      type: "file",
    },
  ]);
  const [currentFolderId, setCurrentFolderId] = useState(0);
  useEffect(() => {
    getFiles();
  }, [currentFolderId]);

  async function getFiles() {
    setIsLoading(true);
    const data = await fetch("http://localhost:9000/files", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    console.log(json);
    setIsLoading(false);
    return setFiles(json);
    // console.error(`Server Error ☠️ is the server on? ${err}`);
  }

  async function postNewFileToDataBase(tempFile) {
    let response = await fetch("http://localhost:9000/files", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(tempFile),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getFiles();
    console.log(response.statusText);
  }

  const createId = () => {
    let count = files.length - 1;
    if (count < 0) {
      return (count *= -1);
    }
    let newId = files[count]._id + 1;
    return newId;
  };

  const createFolder = (inputText, createType = "file") => {
    console.log(createType);
    const newFile = {
      _id: createId(),
      parentID: currentFolderId,
      name: inputText,
      type: createType,
    };
    postNewFileToDataBase(newFile);
  };

  function handleBackButtonClick(e) {
    e.preventDefault();
    let tempParentFolder = files.filter((item) => item._id === currentFolderId);
    return setCurrentFolderId(tempParentFolder[0].parentID);
  }

  function handleFolderClick(e, tempID) {
    e.preventDefault();
    setCurrentFolderId(tempID);
  }

  const deleteItem = (_id) => {
    fetch(`http://localhost:9000/remove/${_id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return getFiles();
      });
  };

  const handleDeleteClick = async (e, _id) => {
    e.preventDefault();
    deleteItem(_id);
  };

  return (
    <Layout
      createFolder={createFolder}
      currentFolderId={currentFolderId}
      files={files}
      handleBackButtonClick={handleBackButtonClick}
    >
      {!isLoading && files && (
        <FileView
          handleFolderClick={handleFolderClick}
          currentFolderId={currentFolderId}
          files={files}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </Layout>
  );
}
