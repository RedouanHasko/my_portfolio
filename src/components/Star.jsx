import { Float, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Star = (props) => {
  const group = useRef(); // Reference for the outer group
  const starRef = useRef(); // Reference for the star mesh itself
  const { nodes, materials } = useGLTF("/models/star.glb");

  //useFrame to rotate the star x, y, z
  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.x += 0.005; // Adjust the speed of rotation by changing 0.01
      starRef.current.rotation.y += 0.005;
      starRef.current.rotation.z += 0.02;
    }
  });

  return (
    <Float floatIntensity={7}>
      <group ref={group} {...props}>
        <group ref={starRef} name="star" scale={55}>
          <mesh
            geometry={nodes.star_0.geometry}
            material={materials.glassesFrames}
          />
          <mesh geometry={nodes.star_1.geometry} material={materials.lens} />
          <mesh geometry={nodes.star_2.geometry} material={materials.Star} />
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload("/models/star.glb");

export default Star;
