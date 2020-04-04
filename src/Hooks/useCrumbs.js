import { useState } from "react";

export const useCrumbs = (initialState = "root") => {
  const [crumb, setCrumb] = useState(initialState);

  setCrumb((prevState) => [...prevState]);

  return [crumb, setCrumb];
};
