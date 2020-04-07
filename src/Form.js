import React, { useState } from "react";

export default function Form({ createFolder }) {
  const [inputText, setInputText] = useState("");
  const [createType, setCreateType] = useState("file");

  function handleSelectChange(e) {
    e.preventDefault();
    setCreateType(e.currentTarget.value);
  }

  const handleTextChange = (e) => {
    e.preventDefault();
    inputText.length >= 0
      ? (e.currentTarget.className = "is-success")
      : (e.currentTarget.className = "has-error");
    return setInputText(e.currentTarget.value);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    return inputText.length <= 0
      ? (e.currentTarget.className = "has-error")
      : (e.currentTarget.className = "is-success");
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    if (inputText.length === 0) {
      return (e.currentTarget[0].className = "has-error");
    } else {
      setInputText("");
      return createFolder(addExtensionToFileName(inputText), createType);
    }
  };

  const addExtensionToFileName = (tempFileName) => {
    return `${tempFileName}.${createType}`;
  };

  return (
    <form onSubmit={(e) => validateSubmit(e)}>
      <label htmlFor="input"> Create New </label>
      <input
        className="input"
        type="text"
        name="input"
        id="input"
        placeholder="Cool File . . ."
        value={inputText}
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => {
          handleTextChange(e);
        }}
      ></input>
      <label htmlFor="chooseType">Select</label>
      <select onChange={(e) => handleSelectChange(e)} id="chooseType">
        <option defaultValue value="file">
          File
        </option>
        <option value="document">Document</option>
      </select>
      <button className="full-button" type="submit">
        Submit
      </button>
    </form>
  );
}
