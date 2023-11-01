import * as THREE from "three";
import React from "react";

const threeProcess = (
  mount: React.RefObject<HTMLElement>,
  mounted: React.MutableRefObject<boolean>
) => {
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

  const geometry = new THREE.DodecahedronGeometry(1, 0)
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);

  scene.add(light);

  const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
};


export default threeProcess;