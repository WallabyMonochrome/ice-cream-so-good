import React from "react";
import styles from "@/components/Buttons/MainButton/style.module.scss"
import {TextAlternative} from "@/components/Typography/Typography";

export const MainButton = ({text}: { text: string }) => {
  return (
    <button onClick={() => console.log("coucou")} className={styles.mainButtonStyle}>
      <TextAlternative size={"mediumsmall"}>{text}</TextAlternative>
    </button>)
}