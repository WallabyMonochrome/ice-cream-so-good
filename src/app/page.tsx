"use client"
import styles from "./style.module.scss"
import {Navbar} from "@/components/PageContents/Navbar/Navbar";
import {Hero} from "@/components/PageContents/Hero/Hero";
import {FlavorSelect} from "@/components/PageContents/FlavorSelect/FlavorSelect";
import {CanvasForView} from "@/components/3D/CanvasForView";
import {Suspense, useRef} from "react";
import {Loader, useProgress} from "@react-three/drei";

const MainPage = () => {
  const rootRef: any = useRef();
  const {active, progress, errors, item, loaded, total} = useProgress();
  console.log("Progress", progress, active);


  return (
    <>
      <Suspense fallback={null}>
        <div ref={rootRef} className={styles.landingPageContainer}>
          <Navbar/>
          <Hero/>
          <FlavorSelect/>
          <CanvasForView eventSourceRef={rootRef}/>
        </div>
      </Suspense>
    </>);
};
export default MainPage;