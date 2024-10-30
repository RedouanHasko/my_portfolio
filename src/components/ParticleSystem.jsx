import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const ParticleSystem = () => {
  const particleCount = 200; // Number of particles
  const attractionRange = 1.5; // Distance within which particles are attracted to the mouse
  const attractionForce = 0.05; // Strength of attraction towards mouse

  const particles = useRef(
    [...Array(particleCount)].map(() => ({
      position: {
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        z: -5, // Keep the particles in the same z position
      },
      velocity: {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
      },
    }))
  );

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Update mouse position in normalized device coordinates
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const particlesArray = particles.current;
    const mouseX = mouse.current.x * 10; // Scale by camera zoom
    const mouseY = mouse.current.y * 10;

    for (let i = 0; i < particlesArray.length; i++) {
      const particle = particlesArray[i];
      const dx = particle.position.x - mouseX;
      const dy = particle.position.y - mouseY;

      // Update particle position based on velocity
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;

      // Update particle velocity for random movement
      particle.velocity.x += (Math.random() - 0.5) * 0.02; // Smaller velocity change
      particle.velocity.y += (Math.random() - 0.5) * 0.02; // Smaller velocity change

      // Calculate distance from mouse
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Attract particles towards the mouse
      if (distance < attractionRange) {
        const attractionStrength =
          attractionForce * (1 - distance / attractionRange);
        particle.position.x += dx * attractionStrength;
        particle.position.y += dy * attractionStrength;
      }

      // Reset position if particle moves out of bounds
      if (
        Math.abs(particle.position.x) > 10 ||
        Math.abs(particle.position.y) > 10
      ) {
        particle.position.x = Math.random() * 20 - 10;
        particle.position.y = Math.random() * 20 - 10;
      }
    }
  });

  return (
    <>
      {particles.current.map((particle, index) => (
        <mesh
          key={index}
          position={[
            particle.position.x,
            particle.position.y,
            particle.position.z,
          ]}
        >
          <circleGeometry args={[0.02, 16]} />{" "}
          {/* Smaller radius for smaller particles */}
          <meshBasicMaterial color={"#ffffff"} opacity={0.8} transparent />
        </mesh>
      ))}
    </>
  );
};

export default ParticleSystem;
