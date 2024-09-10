import React from "react";
import styles from "./style.module.scss"
import {TextAlternative} from "@/components/Typography/Typography";

export const FlavorButton = ({text, onClick, backgroundColor, isSelected}: {
  text: string,
  backgroundColor: string,
  onClick: Function,
  isSelected: boolean,
}) => {
  return (
    <button
      onClick={() => onClick()} style={{backgroundColor: backgroundColor}} className={`${styles.flavorButtonStyle} ${isSelected ? styles.isSelected : ""}`}>
      <TextAlternative size={"small"}>{text}</TextAlternative>
    </button>)
}