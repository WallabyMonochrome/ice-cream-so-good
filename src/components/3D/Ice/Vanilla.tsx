import {useGLTF, useTexture} from "@react-three/drei";
import {Color, RepeatWrapping, SRGBColorSpace} from "three";

export const VanillaBall = ({position, rotation}: {
  position: [x: number, y: number, z: number],
  rotation?: [x: number, y: number, z: number]
}) => {
  const {nodes} = useGLTF("/models/iceCreamBaked.glb");
  const [iceCreamTexture, normalMap] = useTexture([
    "/models/texture/icecreamVanill.png",  // Base color texture
    "/models/texture/IceCreamBakeNormal.png"  // Normal map
  ]);


  iceCreamTexture.flipY = false;
  iceCreamTexture.colorSpace = SRGBColorSpace;
  normalMap.flipY = false;  // Ensure the normal map is not flipped vertically
  normalMap.wrapS = RepeatWrapping; // Repeat horizontally
  normalMap.wrapT = RepeatWrapping; // Repeat vertically

  const iceCreamMesh = nodes.icecream;
  // @ts-ignore
  const customMaterial = iceCreamMesh.material.clone();
  customMaterial.color = new Color(0xffffff); // Set it to white (neutral base color)
  customMaterial.map = iceCreamTexture;  // Set the custom texture (color)
  customMaterial.normalMap = normalMap;  // Optionally set the normal map
  customMaterial.roughness = 0.2;  // Optionally set the normal map
  customMaterial.normalScale.set(0.5, 0.5);  // Adjust normal map strength if needed
  return (
    <>
      {/*@ts-ignore*/}
      <mesh rotation={rotation} scale={0.5} position={position} material={customMaterial} geometry={iceCreamMesh.geometry}></mesh>
      {/*<primitive position={[-0, -0.5, 0.3]} object={sceneCloned} scale={0.4} onClick={() => console.log("Model Clicked")}/>*/}
    </>
  )
}