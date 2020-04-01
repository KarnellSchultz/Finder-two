import React, { useState, useEffect } from "react";

import Form from "./Form";
import View from "./View";
import Breadcrumbs from "./Breadcrumbs";

// const home = [
//   {
//     _id: 0,
//     name: "Home",
//     parentID: 0,
//     type: "file"
//   }
// ];

export default function App() {
  const [isFile, setIsFile] = useState(() => true);

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([
    {
      _id: 0,
      name: "Home",
      parentID: 0,
      type: "file"
    }
  ]);
  const [currentFolderId, setCurrentFolderId] = useState(0);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    setIsLoading(true);
    const data = await fetch("http://localhost:9000/files", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(data);
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
        "Content-Type": "application/json"
      }
    });
    getFiles();
    console.log(response.statusText);
  }

  // const createId = () => {
  //   files.length == null || fil 0 ?
  // }

  const createFolder = inputText => {
    //  console.log(files);
    const newFile = {
      _id: files.length + 1,
      name: inputText,
      parentID: currentFolderId,
      type: isFile ? "file" : "document"
    };
    postNewFileToDataBase(newFile);
  };

  function handleBackButtonClick(e) {
    e.preventDefault();
    let tempParentFolder = files.filter(item => item._id === currentFolderId);
    return setCurrentFolderId(tempParentFolder[0].parentID);
  }

  function handleFolderClick(e, tempID) {
    e.preventDefault();
    setCurrentFolderId(tempID);
  }
  const handleRadioChange = () => {
    setIsFile(!isFile);
  };

  const handleSubmit = (e, inputText) => {
    e.preventDefault();
    if (inputText.length === 0) {
      alert("Add a name before submitting");
    } else {
      createFolder(inputText);
      console.log(files);
    }
  };
  const handleDeleteClick = async (e, _id) => {
    e.preventDefault();

    fetch(`http://localhost:9000/remove/${_id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
    getFiles();
  };

  const FolderHeading = () => {
    if (currentFolderId) {
      let heading = files.filter(item => item._id === currentFolderId);
      return <h1>{heading[0].name}</h1>;
    } else {
      return <h1>Root</h1>;
    }
  };

  const BackButtonDisplay = () => {
    return currentFolderId === 0 ? (
      <button disabled onClick={e => handleBackButtonClick(e)}>
        Root
      </button>
    ) : (
      <button onClick={e => handleBackButtonClick(e)}>..</button>
    );
  };

  return (
    <>
      <FolderHeading />
      {files && <Breadcrumbs currentFolderId={currentFolderId} files={files} />}
      <Form
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
        isFile={isFile}
      />
      <BackButtonDisplay />
      {!isLoading && files && (
        <View
          handleFolderClick={handleFolderClick}
          currentFolderId={currentFolderId}
          files={files}
          handleDeleteClick={handleDeleteClick}
          renderType={"file"}
        />
      )}
      {/* {!isLoading && files && (
        <View
          handleFolderClick={handleFolderClick}
          currentFolderId={currentFolderId}
          files={files}
          handleDeleteClick={handleDeleteClick}
          renderType={"document"}
        />
      )} */}
    </>
  );
}
