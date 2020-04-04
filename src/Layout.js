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
      return <h1 className={"create-heading-file"}>{heading[0].name}</h1>;
    } else {
      return <h1 className={"create-heading-root"}>Root </h1>;
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
    <>
      <nav>
        <section>
          <FolderHeading />
        </section>
      </nav>
      <section>
        <Form handleSubmit={handleSubmit} />
      </section>
      <section>
        {files && (
          <Breadcrumbs currentFolderId={currentFolderId} files={files} />
        )}
      </section>
      <BackButtonDisplay />
      <section>{children}</section>
    </>
  );
};
