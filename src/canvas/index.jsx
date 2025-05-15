// canvas/index.jsx
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" background />

      <CameraRig>
        <Backdrop />
        {/* Use a fixed group instead of <Center> to prevent refitting on text toggle */}
        <group position={[0, 0, 0]}>
          <Shirt />
        </group>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
