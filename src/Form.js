import React, { useState } from "react";

export default function Form({ handleSubmit, handleRadioChange }) {
  const [inputText, setInputText] = useState("");
  const [isFile, setIsFile] = useState(true);

  const handleTextChange = (e) => {
    e.preventDefault();
    setInputText(e.currentTarget.value);
  };
  return (
    <div className="form section">
      <form
        onSubmit={(e) => {
          setInputText("");
          handleSubmit(e, inputText, isFile);
        }}
      >
        <div className="create-container">
          <h3 className="create-heading">Create New</h3>
        </div>
        <button type="submit">Submit</button>
        <input
          className="input"
          type="text"
          name="input"
          id="input"
          placeholder="input"
          value={inputText}
          onChange={(e) => {
            handleTextChange(e);
          }}
        ></input>
        <section>
          <div className="radio">
            <label htmlFor="folder">
              <input
                onChange={() => setIsFile(!isFile)}
                type="radio"
                name="folder"
                checked={isFile}
              ></input>
              File
            </label>
            <label htmlFor="file">
              <input
                onChange={() => setIsFile(!isFile)}
                type="radio"
                name="file"
                checked={!isFile}
              ></input>
              Document
            </label>
          </div>
        </section>
      </form>
    </div>
  );
}
