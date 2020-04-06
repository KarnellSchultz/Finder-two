import React from "react";

export default function CrumbsDisplay({ breadArray }) {
  return (
    <ul className="breadcrumbs">
      {breadArray.map((item, index) => (
        <li key={index}>{`${item} / `}</li>
      ))}
    </ul>
  );
}
