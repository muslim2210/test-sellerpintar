import React from "react";

const Wrapper = ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return (
    <div
      className={`w-full max-w-screen-2xl px-3 md:px-6 lg:px-10 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
