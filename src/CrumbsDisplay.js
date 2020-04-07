import React from "react";
import { useSpring, animated } from "react-spring";

export default function CrumbsDisplay({ breadArray }) {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <ul className="breadcrumbs">
      {breadArray.map((item, index) => (
        <animated.li style={props} key={index}>{`${item} / `}</animated.li>
      ))}
    </ul>
  );
}
