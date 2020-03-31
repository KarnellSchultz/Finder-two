import React, { useState, useEffect } from "react";
import CrumbsDisplay from "./CrumbsDisplay";

export default function Breadcrumbs({ files, currentFolderId }) {
  const [breadArray, setBreadArray] = useState([]);

  let crumbBuilderArray = [];

  function displayBread(tempCurrentFolderId) {
    if (tempCurrentFolderId === 0) {
      return crumbBuilderArray.push("Root 🌳");
    } else if (tempCurrentFolderId !== 0) {
      let currentFolder = files.filter(
        item => item._id === tempCurrentFolderId
      );
      crumbBuilderArray.push(currentFolder[0].name);
      return displayBread(currentFolder[0].parentID);
    }
    return null;
  }

  useEffect(() => {
    displayBread(currentFolderId);
    setBreadArray(crumbBuilderArray);
    // eslint-disable-next-line
  }, [currentFolderId]);

  return <CrumbsDisplay breadArray={breadArray} />;
}
