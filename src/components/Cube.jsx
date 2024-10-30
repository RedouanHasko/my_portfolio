import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

const Cube = (props) => {
  // Use useGLTF to load the model only once
  const { nodes } = useGLTF("models/cube.glb");

  // Use useTexture to load the texture only once
  const texture = useTexture("textures/cube.png");

  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Use useMemo to prevent unnecessary recalculations
  const rotationValues = useMemo(
    () => ({
      y: hovered ? "+=2" : `+=${Math.PI * 2}`,
      x: hovered ? "+=2" : `-=${Math.PI * 2}`,
    }),
    [hovered]
  );

  // Optimize GSAP animation
  useGSAP(() => {
    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(cubeRef.current.rotation, {
        ...rotationValues,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      });
  });

  return (
    <group
      scale={0.7}
      position={[9, -4, 0]}
      rotation={[2.6, 0.8, -1.8]}
      dispose={null}
      {...props}
    >
      <mesh
        ref={cubeRef}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)} // Reset hover state
      >
        <meshMatcapMaterial matcap={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload("models/cube.glb");

export default Cube;
