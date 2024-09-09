"use client"
import {
  Environment,
  PerspectiveCamera,
  View,
  useGLTF,
  PresentationControls
} from "@react-three/drei"
import {VanillaBall} from "@/components/3D/Ice/Vanilla";
import {ChocolateBall} from "@/components/3D/Ice/Chocolate";

// Flavor

const TheVanilla = () => {
  return (
    <>
      <VanillaBall position={[-0.3, 0.2, 0.1]}/>
      <VanillaBall position={[0.3, 0.35, -0.2]} rotation={[0, 0.5, 0.1]}/>
      <VanillaBall position={[0.12, 0.75, -0.15]} rotation={[0, 0.5, 0.1]}/>
      <Cup/>
    </>
  )
}

const ThreeChocolate = () => {
  return (
    <>
      <ChocolateBall chocolateType={"dark"} position={[-0.3, 0.2, 0.1]}/>
      <ChocolateBall chocolateType={"light"} position={[0.3, 0.35, -0.2]} rotation={[0, 0.5, 0.1]}/>
      <ChocolateBall chocolateType={"white"} position={[0.12, 0.75, -0.15]} rotation={[0, 0.5, 0.1]}/>
      <Cup/>
    </>
  )
}

const Bretzel = () => {
  return (
    <>
      <ChocolateBall scale={0.75} chocolateType={"bretzel"} position={[-0., 0.1, 0.0]}/>
      <Cup/>
    </>
  )
}

const Choucroute = () => {
  return (
    <>
      <ChocolateBall  chocolateType={"chou"} position={[-0.3, 0.2, 0.14]}/>
      <ChocolateBall  chocolateType={"lardons"} position={[0.4, 0.35, -0.2]} rotation={[0, 0.2, 0.1]}/>
      <ChocolateBall scale={0.45} chocolateType={"saucisse"} position={[0.12, 0.85, -0.15]} rotation={[0, 0.1, 0.1]}/>
      <ChocolateBall chocolateType={"patate"} position={[-0.4, 0.55, -0.25]} rotation={[0, 1.5, 0.1]}/>
      <Cup/>
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

  return (
    <>
      {/*@ts-ignore*/}
      <View style={{width: "100%", height: "inherit"}}>
        <PerspectiveCamera
          makeDefault // This ensures this camera is the default one used
          fov={50} // Field of view (adjust to your needs)
          position={[-0, 0.8, 4]} // Position of the camera (x, y, z)
        />
        <PresentationControls global={true}
                              azimuth={[-Math.PI / 6, Math.PI / 6]}  // Limit horizontal rotation (-30 to 30 degrees)
                              polar={[0, 0.9]}  // Opt/**/ionally limit vertical rotation (0 to 90 degrees)
        >
          <group scale={0.8} position={[0, 0.7, 0]}>
            {selectedIce === 0 && <TheVanilla></TheVanilla>}
            {selectedIce === 1 && <ThreeChocolate></ThreeChocolate>}
            {selectedIce === 2 && <Bretzel></Bretzel>}
            {selectedIce === 3 && <Choucroute></Choucroute>}
          </group>
        </PresentationControls>
        <Environment preset="dawn"/>
      </View>
    </>
  )
}
