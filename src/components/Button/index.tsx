import { FC } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface ButtonProps {
  link?: string;
  text: string;
  type: "button" | "link";
}

export const Button: FC<ButtonProps> = ({ type, text, link }) => {
  return (
    <>
      {type === "button" ? (
        <div title={text} className="button">
          <button>{text}</button>
        </div>
      ) : (
        <div title={text} className="button">
          <a href={`${link}`} target="_blank">
            {text}
          </a>
        </div>
      )}
    </>
  );
};
