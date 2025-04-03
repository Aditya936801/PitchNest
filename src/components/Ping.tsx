import React from "react";

const Ping = () => {
  return (
    <span className="relative flex size-[11px]">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex size-3 rounded-full  bg-primary"></span>
    </span>
  );
};

export default Ping;
