import styles from "./style.module.scss";
import React from "react";
import {Lilita_One, Roboto} from 'next/font/google'

const lilita = Lilita_One({
  weight: '400',
  subsets: ['latin']
})

const roboto = Roboto({
  weight: '500',
  subsets: ['latin']
})

export const TextBase = ({children, fontColor}: { children: React.ReactNode, fontColor?: string }) => {
  return (<>
    <div className={`${roboto.className} ${styles.textBase}`} style={{color: fontColor}}>
      {children}
    </div>
  </>)
}

export const TextAlternative = (
  {
    children,
    size = "medium",
    fontColor
  }: {
    children: React.ReactNode,
    size?: "small" | "mediumsmall" | "medium" | "large",
    fontColor?: string
  }) => {
  const sizeClass =
    size === "mediumsmall"
      ? styles.mediumSmallSize
      :

    size === "small"
    ? styles.smallSize
    : size === "medium"
      ? styles.mediumSize
      : styles.largeSize;

  return (
    <>
      <div className={`${styles.textAlternative} ${sizeClass}`}
           style={{
             color: fontColor,
           }}>
        {children}
      </div>
    </>
  );
}