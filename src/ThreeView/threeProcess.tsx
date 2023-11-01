import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import React from "react";

const threeProcess = (
  mount: React.RefObject<HTMLElement>,
  mounted: React.MutableRefObject<boolean>
) => {
  const scene = new THREE.Scene();
  // add camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // set renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  if (!mounted.current) {
    mount.current?.appendChild(renderer.domElement);
  }
  mounted.current = true;

  // add single geometry
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // add multiple geometry from data source
  const cubeData = [
    {
      geometry: new THREE.BoxGeometry(1, 1, 1),
      color: 0xff0000,
      x: -2,
      y: 0,
      z: 0,
    },
    {
      geometry: new THREE.BoxGeometry(1, 1, 1),
      color: 0x00ff00,
      x: 0,
      y: 0,
      z: 0,
    },
    {
      geometry: new THREE.BoxGeometry(1, 1, 1),
      color: 0x0000ff,
      x: 2,
      y: 0,
      z: 0,
    },
  ];

  const cubes = cubeData.map((cube) => {
    const { geometry, color, x, y, z } = cube;
    const instance = instancer(scene)(geometry, color, x, y, z);
    scene.add(instance);
    return instance
  })
  

  // update camera position
  camera.position.z = 25;

  // add light
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  // animation loop
  const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    for (let i = 0; i < cubes.length; i++) {
      const cube = cubes[i];
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  };
  animate();
};

export default threeProcess;

function instancer(scene: THREE.Scene) {
  return function (
    geometry: THREE.BufferGeometry,
    color: number,
    x: number = 0,
    y: number = 0,
    z: number = 0
  ) {
    const material = new THREE.MeshPhongMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  };
}
