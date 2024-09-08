import React from "react";
import styles from "./style.module.scss";
import {TextAlternative} from "@/components/Typography/Typography";
import {FaPlay} from "react-icons/fa"; // Import any Play Icon like FontAwesome


export const WatchOurStoryButton: React.FC = ({}) => {
  return (
    <button
      onClick={() => console.log("Coucou")}
      className={`${styles.emailButtonStyle} `}
    >
      <div className={styles.buttonContent}>
        <div className={styles.buttonTextContent}>
          <TextAlternative size={"small"}>Watch our story</TextAlternative>
        </div>
        <div className={styles.iconWrapper}>
          <FaPlay className={styles.playIcon}/>
        </div>
      </div>
    </button>
  );
};