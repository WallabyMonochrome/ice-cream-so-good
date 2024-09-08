import {Box, Center, Environment, OrbitControls, PerspectiveCamera, View, useGLTF} from "@react-three/drei"


const IceBalls = () => {
  const {scene} = useGLTF("/models/icecream.glb");
  return (
    <>
      <primitive position={[0, 1, 0]} object={scene} scale={0.7} onClick={() => console.log("Model Clicked")}/>

    </>
  )
}

export const BigIceCream = () => {
  // Load the GLTF model (adjust the path as per your project structure)
  const sceneCup = useGLTF("/models/cup.glb");

  return (
    <>
      {/*// @ts-ignore */}
      <View style={{width: "inherit", height: "inherit"}}>
        <Center>
          <OrbitControls makeDefault/>
          {/* Display the GLTF model */}
          <IceBalls />
          <primitive position={[0, -1, 0]} object={sceneCup.scene} scale={1}
                     onClick={() => console.log("Model Clicked")}/>
          <Environment preset="sunset"/>
        </Center>s
      </View>
    </>
  )
}

// Ensure GLTFLoader is cached and available
useGLTF.preload("/models/icecream.glb");
useGLTF.preload("/models/cup.glb");
