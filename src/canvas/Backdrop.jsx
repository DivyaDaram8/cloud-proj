import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={100}
      alphaTest={0.9}
      scale={15}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.2]}
      color="#1a1a1a"
      colorBlend={0.5}
    >
      <RandomizedLight
        amount={5}
        radius={10}
        intensity={0.6}
        ambient={0.3}
        position={[7, 6, -10]}
        bias={0.001}
      />
      <RandomizedLight
        amount={4}
        radius={7}
        intensity={0.4}
        ambient={0.4}
        position={[-6, 6, -8]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
