import React from "react";
import Form from "./Form";
import Breadcrumbs from "./Breadcrumbs";

export const Layout = ({
  children,
  handleBackButtonClick,
  files,
  handleSubmit,
  currentFolderId,
}) => {
  const FolderHeading = () => {
    if (currentFolderId) {
      let heading = files.filter((item) => item._id === currentFolderId);
      return <h1>{heading[0].name}</h1>;
    } else {
      return <h1>Root</h1>;
    }
  };

  const BackButtonDisplay = () => {
    return currentFolderId === 0 ? (
      <button disabled onClick={(e) => handleBackButtonClick(e)}>
        Root
      </button>
    ) : (
      <button onClick={(e) => handleBackButtonClick(e)}>..</button>
    );
  };

  return (
    <div>
      <FolderHeading />
      {files && <Breadcrumbs currentFolderId={currentFolderId} files={files} />}
      <Form handleSubmit={handleSubmit} />
      <BackButtonDisplay />
      {children}
    </div>
  );
};
