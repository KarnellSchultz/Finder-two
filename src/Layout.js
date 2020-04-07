import React from "react";
import Form from "./Form";
import Breadcrumbs from "./Breadcrumbs";

export const Layout = ({
  children,
  handleBackButtonClick,
  files,
  createFolder,
  currentFolderId,
}) => {
  const FolderHeading = () => {
    const contextText = "Current Directory: ";
    if (currentFolderId) {
      let heading = files.filter((item) => item._id === currentFolderId);
      return <h1>{`${contextText} ${heading[0].name}`}</h1>;
    } else {
      return <h1>{contextText} Root</h1>;
    }
  };

  const BackButtonDisplay = () => {
    return currentFolderId === 0 ? (
      <button
        className="muted-button"
        disabled
        onClick={(e) => handleBackButtonClick(e)}
      >
        Root
      </button>
    ) : (
      <button onClick={(e) => handleBackButtonClick(e)}>..</button>
    );
  };

  return (
    <section className="small-container">
      <nav>
        <section>
          <FolderHeading />
        </section>
      </nav>
      <section>
        <Form createFolder={createFolder} />
      </section>
      <section>
        {files && (
          <Breadcrumbs currentFolderId={currentFolderId} files={files} />
        )}
      </section>
      <BackButtonDisplay />
      <section>{children}</section>
    </section>
  );
};
