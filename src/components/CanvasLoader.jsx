import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  // Effect to manage loader visibility
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300); // Delay to show completed animation

      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [progress]);

  // Prevent rendering if loader is not needed
  if (!showLoader) return null;

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={loaderStyle}></div>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 20,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

// Loader styles and animations
const loaderStyle = {
  width: 40,
  height: 40,
  border: "4px solid #f1f1f1",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default CanvasLoader;
