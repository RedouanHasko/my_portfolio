/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from "react";
import "../TypewriterEffect.css"; // Create this CSS file for custom styles

const TypewriterEffect = () => {
  const messages = useMemo(
    () => [
      "Web Developer",
      "Freelancer",
      "Gamer",
      "Footballer",
      "Human",
      "Software Engineer",
    ],
    []
  );
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showCursor, setShowCursor] = useState(true); // State for cursor blinking

  const currentMessage = messages[currentMessageIndex];
  const timeoutRef = useRef(null);
  const cursorTimeoutRef = useRef(null);

  useEffect(() => {
    // Blink the cursor every 500ms
    cursorTimeoutRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimeoutRef.current);
  }, []);

  useEffect(() => {
    const typeCharacter = () => {
      if (isFinished) return; // Stop typing effect if finished

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentMessageIndex(
            (prevIndex) => (prevIndex + 1) % messages.length
          );
        }
      } else {
        setDisplayedText((prev) => currentMessage.slice(0, prev.length + 1));
        if (displayedText === currentMessage) {
          if (currentMessage === "Software Engineer") {
            setIsFinished(true); // Stop effect on "Software Engineer"
            setTimeout(() => {
              setShowCursor(false); // Hide cursor after finishing
            }, 500);
          } else {
            setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
          }
        }
      }
    };

    timeoutRef.current = isDeleting
      ? setTimeout(typeCharacter, 50)
      : setTimeout(typeCharacter, 150);

    return () => clearTimeout(timeoutRef.current);
  }, [displayedText, isDeleting, currentMessage, isFinished]);

  return (
    <div className="typewriter-container">
      <p className="hero_tag text-gray_gradient">
        A person who is trying to be a good
      </p>
      <h2
        className={`hero_tag text-gray_gradient ${
          isFinished ? "finished-text" : ""
        }`}
      >
        {displayedText}
        {showCursor && !isFinished && (
          <span className="blinking-cursor">|</span>
        )}
      </h2>
    </div>
  );
};

export default TypewriterEffect;
