/* eslint-disable react/prop-types */
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const DemoComputer = (props) => {
  // Load textures and cache them
  const baseColorMap = useLoader(
    TextureLoader,
    "/textures/monitor/Base_baseColor.jpeg"
  );
  const metallicRoughnessMap = useLoader(
    TextureLoader,
    "/textures/monitor/Base_metallicRoughness.png"
  );
  const normalMap = useLoader(
    TextureLoader,
    "/textures/monitor/Base_normal.png"
  );

  const txt = useVideoTexture(
    props.texture || "/textures/project/project1.mp4"
  );

  // Load GLTF model
  const { nodes, materials } = useGLTF("/models/monitor.glb");

  // Memoize material setup to prevent unnecessary updates
  useEffect(() => {
    materials.Base.map = baseColorMap;
    materials.Base.metalnessMap = metallicRoughnessMap;
    materials.Base.roughnessMap = metallicRoughnessMap;
    materials.Base.normalMap = normalMap;

    materials.Base.metalness = 1;
    materials.Base.roughness = 1;
  }, [baseColorMap, metallicRoughnessMap, normalMap, materials.Base]);

  const group = useRef();

  // GSAP animation on the group reference
  useEffect(() => {
    if (group.current) {
      gsap.fromTo(
        group.current.rotation,
        { y: Math.PI },
        { y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [txt]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.03}>
        <mesh
          geometry={nodes.Screen_Display_0.geometry}
          material={materials.Display}
          scale={100}
        >
          <meshBasicMaterial map={txt} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Main_low_Base_0.geometry}
          material={materials.Base}
          position={[0, -10.552, -5.016]}
          scale={100}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/monitor.glb");

export default DemoComputer;
