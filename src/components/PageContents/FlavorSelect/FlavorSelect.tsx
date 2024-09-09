import styles from "./style.module.scss"
import globalStyles from "@/app/global.module.scss"
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import React, {useEffect, useRef, useState} from "react";
import {FlavorButton} from "@/components/Buttons/FlavorButton/FlavorButton";
import {WatchOurStoryButton} from "@/components/Buttons/WatchOurStoryButton/WatchOurStoryButton";
import {ColorBandPicture} from "@/components/ColorBandPicture/ColorBandPicture";
import {BigIceCream} from "@/components/3D/BigIceCream";
import { IceSelectorView} from "@/components/3D/IceSelector";

export const FlavorSelect: React.FC = () => {
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState<number>(3);

  const curveRef = useRef<HTMLDivElement | null>(null);
  const flavorBackgroundRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return outMin + ((outMax - outMin) * (value - inMin)) / (inMax - inMin);
  };

  const updateButtonPositions = () => {
    if (flavorBackgroundRef.current) {
      const flavorBackgroundTop = flavorBackgroundRef.current.offsetTop;
      const flavorBackgroundHeight = flavorBackgroundRef.current.offsetHeight;
      const screenWidth = window.innerWidth;

      const centerX = Math.floor((screenWidth - 20) / 2);

      const maxCurveWidth = 1800; // Max curve width in pixels
      const radiusX = Math.min(screenWidth / 2, maxCurveWidth / 2); // Horizontal radius
      const radiusY = 100; // Vertical radius
      const centerY = flavorBackgroundTop + flavorBackgroundHeight / 2 + radiusY; // Y center of the curve
      const buttonCount = 5;

      // Set a min and max spread for the X values (in pixels)
      const minXSpread = 500; // Minimum distance between start and end X values
      const maxXSpread = 1000; // Maximum distance between start and end X values

      const spreadX = Math.min(maxXSpread, Math.max(minXSpread, radiusX * 1.4));

      const minX = centerX - spreadX / 2; // Limit the starting x position based on spread
      const maxX = centerX + spreadX / 2; // Limit the ending x position based on spread

      const xPositions = [...Array(buttonCount)].map((_, index) => {
        return minX + (index * (maxX - minX)) / (buttonCount - 1); // Evenly distributed x between minX and maxX
      });

      const calculateTangentRotation = (x: number, radiusX: number, radiusY: number) => {
        const normalizedX = (x - centerX) / radiusX;
        const slope = (-radiusY / radiusX) * (normalizedX / Math.sqrt(1 - normalizedX * normalizedX)); // Derivative of ellipse equation

        let rotationDeg = Math.atan(slope) * (180 / Math.PI); // Convert radians to degrees
        return -rotationDeg; // Flip the direction of the rotation
      };

      // For each x-position, calculate the corresponding y-position on the top part of the curve
      xPositions.forEach((x, index) => {
        const normalizedX = (x - centerX) / radiusX;
        const y = centerY - radiusY * Math.sqrt(1 - normalizedX * normalizedX); // Flipped y

        if (buttonRefs.current[index]) {
          const tangentRotation = calculateTangentRotation(x, radiusX, radiusY);
          buttonRefs.current[index]!.style.left = `${x}px`;
          buttonRefs.current[index]!.style.top = `${y}px`;
          buttonRefs.current[index]!.style.transform = `translate(-50%, -50%) rotate(${tangentRotation}deg)`;
        }
      });

      // Position the visual curve
      if (curveRef.current) {
        curveRef.current.style.width = `${radiusX * 2}px`;
        curveRef.current.style.height = `${radiusY * 2}px`;
        curveRef.current.style.left = `${centerX - radiusX}px`;
        curveRef.current.style.top = `${centerY - radiusY}px`;
      }
    }
  };

  useEffect(() => {
    updateButtonPositions();
    window.addEventListener('resize', updateButtonPositions);
    return () => window.removeEventListener('resize', updateButtonPositions);
  }, []);

  const buttonData = [
    {
      backgroundColor: "#EBFFF4",
      text: "La Vanille",
    },
    {
      backgroundColor: "#FCE5DD",
      text: "3 Chocolats",
    },
    {
      backgroundColor: "#FDFDF3",
      text: "Bretzel",
    },
    {
      backgroundColor: "#E3F6BE",
      text: "Choucroute",
    },
    {
      backgroundColor: "#E8E8E8",
      text: "Banana gelato",
    }
  ];

  return (
    <>
      <div ref={curveRef} className={styles.visualCurve}></div>
      <div style={{maxWidth: "1800px", overflow: "hidden", margin: "auto"}}>
        <div ref={flavorBackgroundRef} className={styles.flavorBackground}>
        </div>
        {buttonData.map((button, index) => (
          <div
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={`${styles.buttonContainer}`} // Apply custom className from buttonData
          >
            <FlavorButton isSelected={index === selectedFlavorIndex} text={button.text} onClick={() => setSelectedFlavorIndex(index)} backgroundColor={button.backgroundColor} />
          </div>
        ))}


        <div className={`${styles.flavorContainer}`}>
          <div className={`${globalStyles.section} ${styles.flavorSelectorContent}`}>
            <div className={`${styles.flavorLeftSide}`}>
              <TextAlternative fontColor={"black"} size={"medium"}>Everyone can be cremos</TextAlternative>
              <TextBase fontColor={"black"}>Get the scoops</TextBase>
              <WatchOurStoryButton />
            </div>
            <div className={`${styles.flavorShowcase}`}>
              <IceSelectorView selectedIce={selectedFlavorIndex}  />
            </div>
            <div className={`${styles.flavorRightSide}`}>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}><div className={styles.textWithComponent}>Everyone loves <ColorBandPicture isGirl={true} /> ice cream</div></TextAlternative>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}>But nobody screams with joy at</TextAlternative>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}><div className={styles.textWithComponent}>the cost <ColorBandPicture isGirl={false}/> complexity.</div></TextAlternative>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}