import React, { useState, useEffect } from "react";
import CrumbsDisplay from "./CrumbsDisplay";

export default function Breadcrumbs({ files, currentFolderId }) {
  const initialState = [];
  const [breadArray, setBreadArray] = useState(initialState);

  function displayBread(tempCurrentFolderId) {
    if (tempCurrentFolderId === 0) {
      return setBreadArray((prevState) => ["🗄 Root", ...prevState]);
    } else if (tempCurrentFolderId !== 0) {
      let currentFolder = files.filter(
        (item) => item._id === tempCurrentFolderId
      );
      setBreadArray((prevState) => [currentFolder[0].name, ...prevState]);
      return displayBread(currentFolder[0].parentID);
    }
  }

  useEffect(() => {
    setBreadArray(initialState);
    displayBread(currentFolderId);
    // eslint-disable-next-line
  }, [currentFolderId]);

  return (
    <div>
      <CrumbsDisplay breadArray={breadArray} />
    </div>
  );
}
