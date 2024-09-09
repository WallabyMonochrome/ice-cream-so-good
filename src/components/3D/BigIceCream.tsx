"use client"
import {
  Box,
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  View,
  useGLTF,
  useTexture,
  Float, PresentationControls
} from "@react-three/drei"
import {Color, RepeatWrapping, SRGBColorSpace, TangentSpaceNormalMap} from "three";
import {VanillaBall} from "./Ice/Vanilla";
import {ChocolateBall} from "./Ice/Chocolate";

const IceBall = () => {
  const {scene} = useGLTF("/models/iceCreamB.glb");
  const [iceCreamTexture, normalMap] = useTexture([
    "/models/texture/IceCreamBakeA.png",  // Base color texture
    "/models/texture/IceCreamBakeNormal.png"  // Normal map
  ]);
  iceCreamTexture.flipY = false;
  iceCreamTexture.colorSpace = SRGBColorSpace;
  normalMap.flipY = false;  // Ensure the normal map is not flipped vertically
  normalMap.wrapS = RepeatWrapping; // Repeat horizontally
  normalMap.wrapT = RepeatWrapping; // Repeat vertically

  // @ts-ignore
  scene.children[0].material.normalMap = normalMap;  // Apply normal map
  // @ts-ignore
  scene.children[0].material.normalMapType = TangentSpaceNormalMap;  // Default option for most normal maps
  // @ts-ignore
  scene.children[0].material.normalScale.set(1, 1);  // Set the intensity of the normal map
  // @ts-ignore
  scene.children[0].material.map = iceCreamTexture; // Apply the texture to the model

  return (
    <>
      <primitive position={[-0.35, -0.2, -0.2]} object={scene} scale={0.4}
                 onClick={() => console.log("Model Clicked")}/>
    </>
  )
}


const Cup = () => {
  const sceneCup = useGLTF("/models/cup.glb");
  return (
    <>
      <primitive
        position={[0, -1.2, 0]}
        rotation={[0, Math.PI * 1.5, 0]} // Rotate the model by 45 degrees (π/4 radians) along the Z axis
        object={sceneCup.scene} scale={1.1}
        onClick={() => console.log("Model Clicked")}/>
    </>
  )
}

export const BigIceCream = () => {

  return (
    <>
      {/*@ts-ignore*/}
      <View style={{width: "inherit", height: "inherit"}}>
        {/*<Center>*/}
        <PerspectiveCamera
          makeDefault // This ensures this camera is the default one used
          fov={50} // Field of view (adjust to your needs)
          position={[0, 0.4, 4]} // Position of the camera (x, y, z)
        />
        <PresentationControls global={true} rotation={[0.13, 0.1, 0.1]}
                              azimuth={[-Math.PI / 6, Math.PI / 6]}  // Limit horizontal rotation (-30 to 30 degrees)
                              polar={[0, 0.3]}  // Optionally limit vertical rotation (0 to 90 degrees)
        >
          <Float floatIntensity={1} speed={2}>
            <group position={[0, 0.7, 0]}>
              <Cup/>
              <IceBall/>
              <ChocolateBall scale={0.4} chocolateType={"dark"} position={[0.4, 0.25, -0.11]}/>
              <VanillaBall position={[0, 0.3, 0.3]}/>
            </group>
          </Float>
        </PresentationControls>
        <Environment preset="dawn"/>
      </View>
    </>
  )
}

// Ensure GLTFLoader is cached and available
useGLTF.preload("/models/iceCreamB.glb");
useGLTF.preload("/models/iceCreamBaked.glb");
useGLTF.preload("/models/cup.glb");
