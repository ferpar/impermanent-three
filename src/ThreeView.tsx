import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeView = (): React.ReactNode => {
  const mount = useRef<HTMLDivElement>(null);
	const mounted = useRef<boolean>(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
		if (!mounted.current) {
    mount.current?.appendChild(renderer.domElement);
		}
		mounted.current = true;

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		camera.position.z = 5;
		const animate = function () {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(scene, camera);
		};
		animate();
  }, []);
  return (
    <div>
      <h1>ThreeView</h1>
      <div className="container" ref={mount}></div>
    </div>
  );
};

export default ThreeView;
