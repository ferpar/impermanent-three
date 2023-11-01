import React, { useRef, useEffect } from "react";
import threeProcess from "./threeProcess";

const ThreeView = (): React.ReactNode => {
  const mount = useRef<HTMLDivElement|null>(null);
const mounted = useRef<boolean>(false);

  useEffect(() => {
		threeProcess(mount, mounted)
  }, []);
  return (
    <div>
      <h1>ThreeView</h1>
      <div className="container" ref={mount}></div>
    </div>
  );
};

export default ThreeView;
