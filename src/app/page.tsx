"use client"
import styles from "./style.module.scss"
import {Navbar} from "@/components/PageContents/Navbar/Navbar";
import {Hero} from "@/components/PageContents/Hero/Hero";
import {FlavorSelect} from "@/components/PageContents/FlavorSelect/FlavorSelect";
import {CanvasForView} from "@/components/3D/CanvasForView";
import {Suspense, useRef, useEffect, useState} from "react";
import {useProgress} from "@react-three/drei";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import {ReactLenis, useLenis} from "lenis/react";

const MainPage = () => {
  const rootRef: any = useRef();
  const {progress, active, total, loaded} = useProgress(); // Track loading progress
  return (
    <>
      <div ref={rootRef} className={styles.landingPageContainer}>
          <ReactLenis autoRaf={true} options={{
            lerp: 1,
            wheelMultiplier: 1,
            touchMultiplier: 1
          }} root/>
          <CustomLoader active={active}/>
        <Suspense>
          <Navbar/>
          <Hero/>
          <FlavorSelect/>
          <CanvasForView eventSourceRef={rootRef}/>
        </Suspense>
      </div>
    </>
  );
};

export default MainPage;