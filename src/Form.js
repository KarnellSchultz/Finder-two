import React, { useState } from "react";

export default function Form({ handleSubmit, handleRadioChange }) {
  const [inputText, setInputText] = useState("");
  const [isFile, setIsFile] = useState(true);

  const handleTextChange = (e) => {
    e.preventDefault();
    setInputText(e.currentTarget.value);
  };
  return (
    <div className="">
      <form
        onSubmit={(e) => {
          setInputText("");
          handleSubmit(e, inputText, isFile);
        }}
      >
        <label htmlFor="input"> Create New </label>
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
        <div className="small-container">
          <label htmlFor="folder">
            <input
              onChange={() => setIsFile(!isFile)}
              type="radio"
              id="folder"
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
              id="file"
              checked={!isFile}
            ></input>
            Document
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
