/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const UpButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      // Change the value based on when you want it to appear
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="rounded-full bg-black-200 text-white p-3 shadow-lg hover:bg-black-300 transition"
      >
        <img src="/assets/go-up.png" alt="up" className="w-10 h-10" />
      </button>
    </div>
  );
};

export default UpButton;
