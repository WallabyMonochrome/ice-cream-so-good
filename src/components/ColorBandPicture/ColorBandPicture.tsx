import styles from "./style.module.scss";
import Image from "next/image";
import girlIceCream from "@/assets/girlHoldingGlassB.png";
import boyHoldingIceCream from "@/assets/boyHoldingIceCream.png";
import React from "react";

export const ColorBandPicture = ({isGirl}: { isGirl: boolean }) => {
  return (
    <>
      <div className={`${isGirl ? styles.girlBackground : styles.boyBackground} ${styles.bandBackground}`}>
        {/*<Image src={} alt={}*/}
        <div className={styles.bandPhoto}>
          <Image
            sizes={"20vw"}
            fill={true}
            src={isGirl ? girlIceCream : boyHoldingIceCream}
            alt={"Profile Image"}
            style={{objectFit: "contain"}}
          />
        </div>

      </div>
    </>
  )
}