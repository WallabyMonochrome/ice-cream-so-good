"use client"
import styles from "./style.module.scss"
import {Navbar} from "@/components/PageContents/Navbar/Navbar";
import {Hero} from "@/components/PageContents/Hero/Hero";
import {FlavorSelect} from "@/components/PageContents/FlavorSelect/FlavorSelect";

const MainPage = () => {

  return (
    <>
      <div className={styles.landingPageContainer}>
        <Navbar/>
        <Hero />
        <FlavorSelect />
      </div>
    </>);
};
export default MainPage;