import React, { useState } from "react";

export default function Form({
  handleSubmit,
  handleRadioChange,
  isFile = true
}) {
  const [inputText, setInputText] = useState("");

  const handleTextChange = e => {
    e.preventDefault();
    setInputText(e.currentTarget.value);
  };
  return (
    <form
      onSubmit={e => {
        setInputText("");
        handleSubmit(e, inputText);
      }}
    >
      <h3>Create New</h3>
      <input
        type="text"
        name="input"
        id="input"
        placeholder="input"
        value={inputText}
        onChange={e => {
          handleTextChange(e);
        }}
      ></input>
      <div className="radio">
        <label htmlFor="folder">
          File
          <input
            onChange={handleRadioChange}
            type="radio"
            name="folder"
            checked={isFile}
          ></input>
        </label>
        <label htmlFor="file">
          Document
          <input
            onChange={handleRadioChange}
            type="radio"
            name="file"
            checked={!isFile}
          ></input>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
