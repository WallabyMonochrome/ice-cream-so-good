import {useEffect, useState} from "react";
import {useProgress} from "@react-three/drei";
import styles from "./style.module.scss";
import {TextAlternative} from "@/components/Typography/Typography";

const CustomLoader = ({active}: {active: boolean}) => {
  const {progress} = useProgress(); // Get the current loading progress
  const [opacity, setOpacity] = useState(1);  // State to control the opacity
  const [isVisible, setIsVisible] = useState(true);  // State to control the visibility

  useEffect(() => {
    if (active) {
      // When active is true, ensure opacity is 1 and the loader is visible
      setIsVisible(true);
      setOpacity(1);
    } else {
      // When active becomes false, gradually fade out
      const fadeTimeout = setTimeout(() => {
        setOpacity(0);  // Start fading out
      }, 200); // Delay before starting fade (optional)

      // After the fade-out transition, hide the loader completely
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Match this timeout with the CSS transition duration

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [active]);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div
      className={styles.loaderContainer}
      style={{
        opacity: opacity,
        transition: 'opacity 0.3s ease-out',
        pointerEvents: 'none'
      }}
    >
      <div className={styles.loaderContent}>
        <TextAlternative size={"large"}>Welcome to Ice Quiche !</TextAlternative>
        <TextAlternative size={"medium"}>Your ice cream is almost ready… 🍦</TextAlternative>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;