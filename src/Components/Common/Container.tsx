import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1560px] mx-auto px-10">{children}</div>;
};

export default Container;
