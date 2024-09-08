import styles from "./style.module.scss";
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import {MainButton} from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";
import globalStyles from "@/app/global.module.scss"
import placeholderIceCream from "@/assets/placeholderIceCream.png";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <>
      <div className={`${globalStyles.section} ${styles.heroContainer}`}>
        <div className={styles.heroTitle}>
          <TextAlternative size={"large"}>
            Grab the best ice cream.
          </TextAlternative>
          <TextBase>
            We ditched the dairy, we cut the sugar infused mood-boosting adaptogens.
          </TextBase>
          <div className={styles.displayLargeScreen}>
            <MainButton text={"Shop Flavors"}/>
          </div>
        </div>
        <div className={styles.icecream3D}>
          <Image
            sizes={"100vw"}
            fill={true}
            src={placeholderIceCream}
            alt={"Profile Image"}
            style={{objectFit: "contain"}}/>
        </div>
      </div>
      <div className={styles.displaySmallScreen}>
        <MainButton text={"Shop Flavors"}/>
      </div>
    </>)
}