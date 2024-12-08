import React, { ReactNode } from "react";

function MaxWidth({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`lg:max-w-7xl font-pop w-full md:w-full min-h-screen mx-auto transition-all ease-in-out duration-300 overflow-hidden  ${className}`}
    >
      {children}
    </div>
  );
}

export default MaxWidth;
