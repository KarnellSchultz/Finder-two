import React, { useState, useEffect } from "react";
import { FileViewDisplay } from "./FileViewDisplay";

export default function FileView({
  files,
  currentFolderId,
  handleFolderClick,
  handleDeleteClick,
}) {
  const [fileView, setFileView] = useState([]);
  const [docView, setDocView] = useState([]);

  function clearView() {
    setFileView(() => []);
    setDocView(() => []);
    return null;
  }

  const createFileView = () => {
    return files.map((file) => {
      if (file.type === "file") {
        return file.parentID === currentFolderId
          ? setFileView((prevState) => [file, ...prevState])
          : null;
      } else {
        return null;
      }
    });
  };
  const createDocView = () => {
    return files.map((doc) => {
      if (doc.type === "document") {
        return doc.parentID === currentFolderId
          ? setDocView((prevState) => [doc, ...prevState])
          : null;
      } else {
        return null;
      }
    });
  };
  console.log({ docView });
  useEffect(() => {
    createFileView();
    createDocView();
    return () => {
      clearView();
    };
    // eslint-disable-next-line
  }, [files, currentFolderId]);

  return (
    <FileViewDisplay
      handleDeleteClick={handleDeleteClick}
      handleFolderClick={handleFolderClick}
      fileView={fileView}
      docView={docView}
    />
  );
}
