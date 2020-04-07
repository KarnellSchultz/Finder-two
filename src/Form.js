import React, { useState } from "react";

export default function Form({ handleSubmit }) {
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputText.length === 0) {
          return (e.currentTarget[0].className = "has-error");
        } else {
          setInputText("");
          handleSubmit(e, inputText, createType);
        }
      }}
    >
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
      <label htmlFor="choose">Select</label>
      <select onChange={(e) => handleSelectChange(e)} id="choose">
        <option defaultValue value="file">
          File
        </option>
        <option value="document">Document</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
