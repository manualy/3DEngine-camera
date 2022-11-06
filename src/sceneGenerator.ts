import { Object3D } from "./basic3DTypes";

function createCube() {
  return <Object3D>{
    mesh: [
      // SOUTH
      {
        points: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 1, y: 1, z: 0 },
        ],
      },
      {
        points: [
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 0 },
          { x: 1, y: 0, z: 0 },
        ],
      },
      // EAST
      {
        points: [
          { x: 1, y: 0, z: 0 },
          { x: 1, y: 1, z: 0 },
          { x: 1, y: 1, z: 1 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 0 },
          { x: 1, y: 1, z: 1 },
          { x: 1, y: 0, z: 1 },
        ],
      },
      // NORTH
      {
        points: [
          { x: 1, y: 0, z: 1 },
          { x: 1, y: 1, z: 1 },
          { x: 0, y: 1, z: 1 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 1 },
          { x: 0, y: 1, z: 1 },
          { x: 0, y: 0, z: 1 },
        ],
      },
      // WEST
      {
        points: [
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 1, z: 1 },
          { x: 0, y: 1, z: 0 },
        ],
      },
      {
        points: [
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 1, z: 0 },
          { x: 0, y: 0, z: 0 },
        ],
      },
      // TOP
      {
        points: [
          { x: 0, y: 1, z: 0 },
          { x: 0, y: 1, z: 1 },
          { x: 1, y: 1, z: 1 },
        ],
      },
      {
        points: [
          { x: 0, y: 1, z: 0 },
          { x: 1, y: 1, z: 1 },
          { x: 1, y: 1, z: 0 },
        ],
      },
      // BOTTOM
      {
        points: [
          { x: 1, y: 0, z: 1 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 0, z: 0 },
        ],
      },
      {
        points: [
          { x: 1, y: 0, z: 1 },
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 0, z: 0 },
        ],
      },
    ],
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  };
}

export function generateScene() {
  const cube1 = createCube();
  cube1.position = { x: 0, y: 0, z: 2 };
  return [cube1];
}
