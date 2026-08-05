import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1560px] mx-auto md:px-10 px-4">{children}</div>;
};

export default Container;
