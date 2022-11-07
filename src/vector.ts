import { Vec3d } from "./basic3DTypes";

export function addVectors(vectorOne: Vec3d, vectorTwo: Vec3d) {
  return {
    x: vectorOne.x + vectorTwo.x,
    y: vectorOne.y + vectorTwo.y,
    z: vectorOne.z + vectorTwo.z,
  };
}

export function vectorAdd(vector: Vec3d, number: number) {
  return {
    x: vector.x + number,
    y: vector.y + number,
    z: vector.z + number,
  };
}

export function subtractVectors(vectorOne: Vec3d, vectorTwo: Vec3d) {
  return {
    x: vectorOne.x - vectorTwo.x,
    y: vectorOne.y - vectorTwo.y,
    z: vectorOne.z - vectorTwo.z,
  };
}

export function vectorSubtract(vector: Vec3d, number: number) {
  return {
    x: vector.x - number,
    y: vector.y - number,
    z: vector.z - number,
  };
}

export function multiplyVector(vector: Vec3d, value: number) {
  return {
    x: vector.x * value,
    y: vector.y * value,
    z: vector.z * value,
  };
}

export function divideVector(vector: Vec3d, value: number) {
  return {
    x: vector.x / value,
    y: vector.y / value,
    z: vector.z / value,
  };
}

export function vectorDotProduct(vectorOne: Vec3d, vectorTwo: Vec3d) {
  return (
    vectorOne.x * vectorTwo.x +
    vectorOne.y * vectorTwo.y +
    vectorOne.z * vectorTwo.z
  );
}

export function vectorCrossProduct(vectorOne: Vec3d, vectorTwo: Vec3d) {
  return {
    x: vectorOne.y * vectorTwo.z - vectorOne.z * vectorTwo.y,
    y: vectorOne.z * vectorTwo.x - vectorOne.x * vectorTwo.z,
    z: vectorOne.x * vectorTwo.y - vectorOne.y * vectorTwo.x,
  };
}

export function vectorLength(v: Vec3d) {
  return Math.sqrt(vectorDotProduct(v, v));
}

export function normaliseVector(vector: Vec3d) {
  let l = vectorLength(vector);
  vector.x = vector.x / l;
  vector.y = vector.y / l;
  vector.z = vector.z / l;
}
