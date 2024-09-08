import styles from "./style.module.scss"
import globalStyles from "@/app/global.module.scss"
import {TextAlternative, TextBase} from "@/components/Typography/Typography";
import {useEffect, useRef, useState} from "react";
import {FlavorButton} from "@/components/Buttons/FlavorButton/FlavorButton";

export const FlavorSelect: React.FC = () => {
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState<number>(2);

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

      // Calculate the start and end angles based on screen width
      const startAngle = Math.PI * mapRange(screenWidth, 756, 1400, 0.25, 0.3);
      const endAngle = Math.PI * mapRange(screenWidth, 756, 1400, 0.75, 0.7);

      const centerX = Math.floor((screenWidth - 20) / 2);
      const maxCurveWidth = 1800;
      const radiusX = Math.min(screenWidth / 2, maxCurveWidth / 2);
      const radiusY = 100;
      const centerY = flavorBackgroundTop + flavorBackgroundHeight / 2 + radiusY;
      const buttonCount = 5;

      const angles = [...Array(buttonCount)].map((_, index) => {
        return startAngle + (index * (endAngle - startAngle)) / (buttonCount - 1);
      });

      const calculateTangentRotation = (angle: number, radiusX: number, radiusY: number) => {
        const dx = -radiusX * Math.sin(angle);
        const dy = radiusY * Math.cos(angle);
        let rotationDeg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (rotationDeg > 90 || rotationDeg < -90) {
          rotationDeg += 180;
        }
        return rotationDeg;
      };

      angles.forEach((angle, index) => {
        const x = centerX + 50 - radiusX * Math.cos(angle);
        const y = centerY - radiusY * Math.sin(angle);

        if (buttonRefs.current[index]) {
          const tangentRotation = calculateTangentRotation(angle, radiusX, radiusY);
          buttonRefs.current[index]!.style.left = `${x }px`;
          buttonRefs.current[index]!.style.top = `${y}px`;
          buttonRefs.current[index]!.style.transform = `translate(-50%, -50%) rotate(${tangentRotation}deg)`;
        }
      });

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
      text: "Vanilla Being",
    },
    {
      backgroundColor: "#FCE5DD",
      text: "Chocolate Bliss",
    },
    {
      backgroundColor: "#FDFDF3",
      text: "Mango Magic",
    },
    {
      backgroundColor: "#E3F6BE",
      text: "Strawberry Dream",
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
        {/*<div ref={buttonRefA} className={styles.buttonA}>Button</div>*/}
        {/* Map through the buttonData array to render buttons */}
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
            </div>
            <div className={`${styles.flavorLeftSide}`}>
              <TextAlternative fontColor={"black"} size={"medium"}>Everyone can be cremos</TextAlternative>
              <TextAlternative fontColor={"black"} size={"small"}>Get the scoops</TextAlternative>
            </div>
            <div className={`${styles.flavorLeftSide}`}>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}>Everyone loves ice cream</TextAlternative>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}>But nobody screams with joy at</TextAlternative>
              <TextAlternative fontColor={"black"} size={"mediumsmall"}>the cost complexity</TextAlternative>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}