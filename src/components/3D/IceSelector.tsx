"use client"
import {
  Environment,
  PerspectiveCamera,
  View,
  useGLTF,
  PresentationControls, ContactShadows
} from "@react-three/drei"
import {VanillaBall} from "@/components/3D/Ice/Vanilla";
import {ChocolateBall} from "@/components/3D/Ice/Chocolate";
import {useEffect, useRef} from "react";
import gsap from "gsap";

// Flavor

const TheVanilla = () => {
  return (
    <>
      <VanillaBall position={[-0.45, 0.2, 0.]}/>
      <VanillaBall position={[0.35, 0.25, -0]} rotation={[0, 0.5, 0.1]}/>
      <VanillaBall position={[-0.26, 0.75, -0.3]} rotation={[0, 0.5, 0.1]}/>

    </>
  )
}

const ThreeChocolate = () => {
  return (
    <>
      <ChocolateBall  scale={0.6} chocolateType={"dark"} position={[-0.3, 0.2, 0.1]}/>
      <ChocolateBall scale={0.6} chocolateType={"light"} position={[0.3, 0.35, -0.2]} rotation={[0, 0.5, 0.1]}/>
      <ChocolateBall scale={0.6} chocolateType={"white"} position={[0.12, 0.75, -0.15]} rotation={[0, 0.5, 0.1]}/>

    </>
  )
}

const Bretzel = () => {
  return (
    <>
      <ChocolateBall scale={0.75} chocolateType={"bretzel"} position={[-0., 0.1, 0.0]}/>
    </>
  )
}

const Choucroute = () => {
  return (
    <>
      <ChocolateBall  scale={0.6} chocolateType={"chou"} position={[-0.3, 0.2, 0.14]}/>
      <ChocolateBall  scale={0.6} chocolateType={"lardons"} position={[0.4, 0.35, -0.2]} rotation={[0, 0.2, 0.1]}/>
      <ChocolateBall scale={0.45} chocolateType={"saucisse"} position={[0.12, 0.85, -0.15]} rotation={[0, 0.1, 0.1]}/>
      <ChocolateBall  scale={0.6} chocolateType={"patate"} position={[-0.4, 0.55, -0.25]} rotation={[0, 1.5, 0.1]}/>

    </>
  )
}

const Mirabelle = () => {
  return (
    <>
      <ChocolateBall  scale={0.6} chocolateType={"mirabelle"} position={[-0.2, 0.2, 0.1]}/>
      <ChocolateBall  scale={0.6} chocolateType={"mirabelle"} position={[0.35, 0.35, -0.2]} rotation={[0, 0.5, 0.1]}/>
      <ChocolateBall  scale={0.6} chocolateType={"mirabelle"} position={[-0.2, 0.75, -0.15]} rotation={[0, 0.5, 0.1]}/>
    </>
  )
}

//
const Cup = () => {
  const sceneCup = useGLTF("/models/cup.glb");
  const sceneClone = sceneCup.scene.clone();
  return (
    <>
      <primitive
        position={[0, -1.2, 0]}
        rotation={[0, Math.PI * 1.5, 0]} // Rotate the model by 45 degrees (π/4 radians) along the Z axis
        object={sceneClone} scale={1.1}
        onClick={() => console.log("Model Clicked")}/>
    </>
  )
}

export const IceSelectorView = ({selectedIce}: { selectedIce: number }) => {
  const groupRef: any = useRef(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(groupRef.current.scale, {x: 0, y: 0, z: 0}, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.3,
        ease: "power1.out"
      });
    }
  }, [selectedIce]);

  return (
    <>
      {/*@ts-ignore*/}
      <View style={{width: "100%", height: "inherit", touchAction: "none"}}>
        <PerspectiveCamera
          makeDefault // This ensures this camera is the default one used
          fov={50} // Field of view (adjust to your needs)
          position={[-0, 0.8, 4]} // Position of the camera (x, y, z)
        />
        <PresentationControls global={true}
                              rotation={[0.1, 0, 0]}
                              azimuth={[-Math.PI / 6, Math.PI / 6]}  // Limit horizontal rotation (-30 to 30 degrees)
                              polar={[0, 0.1]}

        >
          <group  scale={0.8} position={[0, 0.7, 0]}>
            <group position={[0, 0., 0]} ref={groupRef} frustumCulled={false}>
              {selectedIce === 0 && <TheVanilla></TheVanilla>}
              {selectedIce === 1 && <ThreeChocolate></ThreeChocolate>}
              {selectedIce === 2 && <Bretzel></Bretzel>}
              {selectedIce === 3 && <Choucroute></Choucroute>}
              {selectedIce === 4 && <Mirabelle></Mirabelle>}
            </group>
            <Cup/>
          </group>
        </PresentationControls>
        <Environment preset="dawn"/>
        <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={10} blur={2} far={10} resolution={256}
                        color="#000000"/>
      </View>
    </>
  )
}
