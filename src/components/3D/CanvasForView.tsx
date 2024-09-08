import {Canvas} from "@react-three/fiber";
import {Bounds, Box, Preload, View} from "@react-three/drei";
import {Perf} from "r3f-perf";

export const CanvasForView = (props: { eventSourceRef: any }) => {
  return (
    <Canvas
      eventSource={props.eventSourceRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
      }}
    >
      <View.Port/>
      <Preload all/>
    </Canvas>
  )}