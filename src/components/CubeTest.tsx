import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createRef, useEffect, useRef } from "react";
import * as THREE from "three";

import { RoundedBox } from "@react-three/drei";

import SummerVibes from "../images/summer-vibes.jpg";

import { Mesh, MeshPhysicalMaterial, TextureLoader } from "three";
import useWindowSize from "../hooks/useWindowSize";

const Background = () => {
  const { scene } = useThree();

  const loader = new TextureLoader();
  const texture = loader.load(`${SummerVibes}`);
  texture.encoding = THREE.sRGBEncoding;

  scene.background = texture;

  return null;
};

const RefractionCube = () => {
  const cubeRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);

  const deadZone = 0.2;

  useFrame((state) => {
    let deadZoneMousePosition = [state.mouse.x, state.mouse.y];
    let mouseCenterDistance = Math.sqrt(
      state.mouse.x ** 2 + state.mouse.y ** 2
    );

    if (mouseCenterDistance < deadZone) {
      deadZoneMousePosition = [0, 0];
    } else {
      deadZoneMousePosition = [
        deadZoneMousePosition[0] *
          ((mouseCenterDistance - deadZone) / mouseCenterDistance),
        deadZoneMousePosition[1] *
          ((mouseCenterDistance - deadZone) / mouseCenterDistance),
      ];
    }

    cubeRef.current?.setRotationFromEuler(
      new THREE.Euler(-deadZoneMousePosition[1], deadZoneMousePosition[0], 0)
    );

    if (materialRef.current) {
      materialRef.current.thickness = Math.max(
        mouseCenterDistance - deadZone,
        0
      );
    }
  });

  return (
    <RoundedBox ref={cubeRef} args={[1, 1, 1]} radius={0.02} smoothness={10}>
      <meshPhysicalMaterial
        ref={materialRef}
        roughness={0}
        transmission={1}
        thickness={2}
      />
    </RoundedBox>
  );
};

const CubeTest = () => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const windowSize = useWindowSize();

  return (
    <Canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: windowSize.width,
        height: windowSize.height,
        margin: 0,
        border: 0,
      }}
      camera={{
        position: [0, 0, 2],
      }}
    >
      <Background />
      <ambientLight />
      <directionalLight position={[10, 0, 10]} intensity={10} />

      <RefractionCube />
    </Canvas>
  );
};

export default CubeTest;
