import {useGLTF, useTexture} from "@react-three/drei";
import {Color, RepeatWrapping, SRGBColorSpace} from "three";
import {useMemo} from "react";

export const ChocolateBall = ({scale = 0.5, position, rotation, chocolateType}: {
  scale?: number,
  position: [x: number, y: number, z: number],
  rotation?: [x: number, y: number, z: number],
  chocolateType?: "dark" | "light" | "white" | "bretzel" | "chou" | "saucisse" | "lardons" | "patate" | "mirabelle"
}) => {
  // Load the model and textures once
  const {nodes} = useGLTF("/models/iceCreamBaked.glb");
  const [iceCreamTexture, normalMap] = useTexture([
    "/models/texture/icecreamVanill.png",  // Base color texture
    "/models/texture/icecreambakenormal.png"  // Normal map
  ]);

  // Ensure textures are only processed once
  useMemo(() => {
    iceCreamTexture.flipY = false;
    iceCreamTexture.colorSpace = SRGBColorSpace;
    normalMap.flipY = false;
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
  }, [iceCreamTexture, normalMap]);

  const customMaterial = useMemo(() => {
    let color = "#361B0C";
    switch (chocolateType) {
      case "dark":
        color = "#361B0C";
        break;
      case "light":
        color = "#9A705A"
        break;
      case "white":
        color = "#F7D9C7"
        break;
      case "bretzel":
        color = "#8B4513"
        break;
      case "chou":
        color = "#F5E8C7"
        break;
      case "saucisse":
        color = "#D16F6B"
        break;
      case "lardons":
        color = "#FF73CF"
        break;
      case "patate":
        color = "#E8C547"
        break;
        case "mirabelle":
        color = "#F4C430"
        break;
      default:
        return;
    }

    // @ts-ignore
    const material = nodes.icecream.material.clone(); // Clone once and reuse
    material.color = new Color(color); // Neutralize base color
    material.map = iceCreamTexture;  // Set the custom texture
    material.normalMap = normalMap;  // Apply normal map
    material.roughness = 0.35;  // Set roughness
    material.normalScale.set(0.5, 0.5);  // Set normal map intensity
    return material;
    // @ts-ignore
  }, [nodes.icecream.material, iceCreamTexture, normalMap, chocolateType]);

  return (
    // @ts-ignore
    <mesh rotation={rotation} scale={scale} position={position} material={customMaterial} geometry={nodes.icecream.geometry}/>
  );
};