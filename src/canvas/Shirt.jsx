import { useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";
import { createTextTexture } from '../utils/createTextTexture';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Use utility function to generate text texture
  const textTexture = snap.showText && snap.shirtText
    ? createTextTexture(snap.shirtText, {
        width: 512,
        height: 256,
        font: 'bold 34px Arial',
        color: 'white',
        background: 'transparent',
        lineHeight: 40,
      })
    : null;

  // Update material color smoothly
  useFrame((_, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Full texture */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* Logo */}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* Text as decal */}
        {snap.showText && textTexture && (
          <Decal
            position={[0, 0.04, 0.15]} // front of chest
            rotation={[0, 0, 0]}
            scale={[0.35, 0.18, 1]}     // size of decal
            map={textTexture}
            depthTest={true}
            depthWrite={true}
            polygonOffset
            polygonOffsetFactor={-4}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
