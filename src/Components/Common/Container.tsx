import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1560px] mx-auto 2xl:px-0 px-4">{children}</div>;
};

export default Container;
