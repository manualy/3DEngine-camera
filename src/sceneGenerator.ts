import { Object3D } from "./basic3DTypes";

function createCube() {
  return <Object3D>{
    mesh: [
      // SOUTH
      {
        points: [
          { x: 0, y: 0, z: 0, w: 1 },
          { x: 0, y: 1, z: 0, w: 1 },
          { x: 1, y: 1, z: 0, w: 1 },
        ],
      },
      {
        points: [
          { x: 0, y: 0, z: 0, w: 1 },
          { x: 1, y: 1, z: 0, w: 1 },
          { x: 1, y: 0, z: 0, w: 1 },
        ],
      },
      // EAST
      {
        points: [
          { x: 1, y: 0, z: 0, w: 1 },
          { x: 1, y: 1, z: 0, w: 1 },
          { x: 1, y: 1, z: 1, w: 1 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 0, w: 1 },
          { x: 1, y: 1, z: 1, w: 1 },
          { x: 1, y: 0, z: 1, w: 1 },
        ],
      },
      // NORTH
      {
        points: [
          { x: 1, y: 0, z: 1, w: 1 },
          { x: 1, y: 1, z: 1, w: 1 },
          { x: 0, y: 1, z: 1, w: 1 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 1, w: 1 },
          { x: 0, y: 1, z: 1, w: 1 },
          { x: 0, y: 0, z: 1, w: 1 },
        ],
      },
      // WEST
      {
        points: [
          { x: 0, y: 0, z: 1, w: 1 },
          { x: 0, y: 1, z: 1, w: 1 },
          { x: 0, y: 1, z: 0, w: 1 },
        ],
      },
      {
        points: [
          { x: 0, y: 0, z: 1, w: 1 },
          { x: 0, y: 1, z: 0, w: 1 },
          { x: 0, y: 0, z: 0, w: 1 },
        ],
      },
      // TOP
      {
        points: [
          { x: 0, y: 1, z: 0, w: 1 },
          { x: 0, y: 1, z: 1, w: 1 },
          { x: 1, y: 1, z: 1, w: 1 },
        ],
      },
      {
        points: [
          { x: 0, y: 1, z: 0, w: 1 },
          { x: 1, y: 1, z: 1, w: 1 },
          { x: 1, y: 1, z: 0, w: 1 },
        ],
      },
      // BOTTOM
      {
        points: [
          { x: 1, y: 0, z: 1, w: 1 },
          { x: 0, y: 0, z: 1, w: 1 },
          { x: 0, y: 0, z: 0, w: 1 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 1, w: 1 },
          { x: 0, y: 0, z: 0, w: 1 },
          { x: 1, y: 0, z: 0, w: 1 },
        ],
      },
    ],
    position: { x: 0, y: 0, z: 0, w: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
  };
}

export function generateScene() {
  const cube1 = createCube();
  // const cube2 = createCube();
  // const cube3 = createCube();
  // const cube4 = createCube();
  cube1.position = { x: 0, y: 0, z: 2, w: 1 };
  return [cube1];
}
