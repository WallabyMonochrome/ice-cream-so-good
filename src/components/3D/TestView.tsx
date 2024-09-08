import {Box, Center, Environment, OrbitControls, PerspectiveCamera, View} from "@react-three/drei"

export const TestView = () => {
  return (
    <>
      {/*// @ts-ignore*/}
      <View style={{width: "inherit", height: "inherit"}}>
        <Center>
          <OrbitControls makeDefault/>
          {/*<ambientLight intensity={0.3}/>*/}
          <Box onPointerOver={(e) => console.log("OVERED")} onClick={() => console.log("SMLFDF")} material-color="purple" />
          <Environment preset="dawn"/>
        </Center>
      </View>
    </>
  )
}