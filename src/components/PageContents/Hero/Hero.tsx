import styles from "./style.module.scss";
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import {MainButton} from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";
import globalStyles from "@/app/globalImport.module.scss"
import placeholderIceCream from "@/assets/placeholderIceCream.png";
import React, {useEffect, useRef} from "react";
import {TestView} from "@/components/3D/TestView";
import {BigIceCream} from "@/components/3D/BigIceCream";
import {splitTextToSpans} from "@/utils/wordSplitter";
import {useTextExpandingBack, useTextSliding} from "@/hooks/useTextAnimation";
import {useProgress} from "@react-three/drei";
import gsap from "gsap";

export const Hero = () => {
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const {active} = useProgress(); // Track loading progress
  const { playAnimation } = useTextSliding(heroTitleRef.current, { autoPlay: false });

  useEffect(() => {
    if (!active && heroTitleRef.current) {
      playAnimation()
    }
  }, [active]);

  return (
    <>
      <div className={`${globalStyles.section} ${styles.heroContainer}`}>
        <div ref={heroTitleRef} className={styles.heroTitle}>
          <TextAlternative size={"large"}>
            {splitTextToSpans("Grab the best ice cream.")}
            {/*Grab the best ice cream.*/}
          </TextAlternative>
          <TextBase>
            We ditched the dairy, we cut the sugar infused mood-boosting adaptogens.
          </TextBase>
          <div className={styles.displayLargeScreen}>
            <MainButton text={"Shop Flavors"}/>
          </div>
        </div>
        <div className={styles.icecream3D}>
          <BigIceCream />
        </div>
      </div>
      <div className={styles.displaySmallScreen}>
        <MainButton text={"Shop Flavors"}/>
      </div>
    </>)
}