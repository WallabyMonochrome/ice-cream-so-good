"use client"
import React, {useEffect, useRef} from "react";
import styles from "./style.module.scss";
import globalStyles from "@/app/globalImport.module.scss";
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import Image from "next/image";
import {BiMenuAltLeft} from "react-icons/bi";
import placeholderProfile from "@/assets/Thib.jpg";
import {useProgress} from "@react-three/drei";
import gsap from "gsap";

export const Navbar: React.FC = () => {
  const {active} = useProgress(); // Track loading progress
  const navOptionsRef = useRef<HTMLDivElement>(null); // Ref for the navOptions

  useEffect(() => {
    if (!active && navOptionsRef.current) {
      gsap.fromTo(navOptionsRef.current,
        {y: -100, opacity: 0}, // Start position (offscreen, transparent)
        {y: 0, opacity: 1, duration: 0.8, ease: "power3.out"} // End position (onscreen, visible)
      );
    }
  }, [active]);

  return (
    <>
      <div ref={navOptionsRef} className={`${globalStyles.section}`}>
        <div className={`${styles.navbarContainer}`}>
          <div><TextAlternative size={"medium"}>Ice Quiche</TextAlternative></div>
          <div className={styles.navOptions} >
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