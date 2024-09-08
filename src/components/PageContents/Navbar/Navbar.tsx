import React from "react";
import styles from "./style.module.scss"
import globalStyles from "@/app/global.module.scss"
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import Image from "next/image";
import {BiMenuAltLeft} from "react-icons/bi";

import placeholderProfile from "@/assets/Thib.jpeg";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className={`${globalStyles.section}`}>
        <div className={`${styles.navbarContainer}`}>
          <div><TextAlternative size={"medium"}>Creamy</TextAlternative></div>
          <div className={styles.navOptions}>
            <TextBase><a>About</a></TextBase>
            <TextBase>Products</TextBase>
            <TextBase>Moods</TextBase>
            <TextBase>Flavors</TextBase>
            <TextBase>Ingredients</TextBase>
          </div>
          <div className={styles.navProfile}>
            <div className={styles.profilePicture}>
              <Image width={32} height={32} src={placeholderProfile}
                     alt={"Profile Image"}/>
            </div>
            <BiMenuAltLeft fontSize={32} fontWeight={"light"}/>
          </div>
        </div>
      </div>
    </>
  )
}
