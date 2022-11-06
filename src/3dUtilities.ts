import { Graphics } from "pixi.js";
import { Mat4x4, Object3D, Triangle, Vec3d } from "./basic3DTypes";
import {
  generateXRotationMatrix,
  generateYRotationMatrix,
  generateZRotationMatrix,
  multiplyMatrixVector,
} from "./matrix";

interface RotationMatrices {
  rotationXMatrix: Mat4x4 | null;
  rotationYMatrix: Mat4x4 | null;
  rotationZMatrix: Mat4x4 | null;
}

export function translateTriangle(
  triangle: Triangle,
  x: number,
  y: number,
  z: number
) {
  triangle.points.forEach((vec3d: Vec3d) => {
    vec3d.x += x;
    vec3d.y += y;
    vec3d.z += z;
  });
}

export function drawObject3D(
  object3D: Object3D,
  projectionMatrix: Mat4x4,
  graphics: Graphics
) {
  const rotationMatrices = {
    rotationXMatrix: generateXRotationMatrix(object3D.rotation.x),
    rotationYMatrix: generateYRotationMatrix(object3D.rotation.y),
    rotationZMatrix: generateZRotationMatrix(object3D.rotation.z),
  };

  object3D.mesh.forEach((triangle) => {
    drawTriangle(
      triangle,
      object3D.position,
      rotationMatrices,
      projectionMatrix,
      graphics
    );
  });
}

export function rotateTriangle(
  triangle: Triangle,
  rotationMatrices: RotationMatrices
) {
  if (rotationMatrices.rotationXMatrix) {
    triangle.points[0] = multiplyMatrixVector(
      triangle.points[0],
      rotationMatrices.rotationXMatrix
    );
    triangle.points[1] = multiplyMatrixVector(
      triangle.points[1],
      rotationMatrices.rotationXMatrix
    );
    triangle.points[2] = multiplyMatrixVector(
      triangle.points[2],
      rotationMatrices.rotationXMatrix
    );
  }
  if (rotationMatrices.rotationYMatrix) {
    triangle.points[0] = multiplyMatrixVector(
      triangle.points[0],
      rotationMatrices.rotationYMatrix
    );
    triangle.points[1] = multiplyMatrixVector(
      triangle.points[1],
      rotationMatrices.rotationYMatrix
    );
    triangle.points[2] = multiplyMatrixVector(
      triangle.points[2],
      rotationMatrices.rotationYMatrix
    );
  }
  if (rotationMatrices.rotationZMatrix) {
    triangle.points[0] = multiplyMatrixVector(
      triangle.points[0],
      rotationMatrices.rotationZMatrix
    );
    triangle.points[1] = multiplyMatrixVector(
      triangle.points[1],
      rotationMatrices.rotationZMatrix
    );
    triangle.points[2] = multiplyMatrixVector(
      triangle.points[2],
      rotationMatrices.rotationZMatrix
    );
  }
}

export function drawTriangle(
  triangle: Triangle,
  position: Vec3d,
  rotationMatrices: RotationMatrices,
  projectionMatrix: Mat4x4,
  graphics: Graphics
) {
  const projectedTriangle = <Triangle>{
    points: [triangle.points[0], triangle.points[1], triangle.points[2]],
  };

  rotateTriangle(projectedTriangle, rotationMatrices);
  translateTriangle(projectedTriangle, position.x, position.y, position.z);

  projectedTriangle.points = [
    multiplyMatrixVector(projectedTriangle.points[0], projectionMatrix),
    multiplyMatrixVector(projectedTriangle.points[1], projectionMatrix),
    multiplyMatrixVector(projectedTriangle.points[2], projectionMatrix),
  ];

  //scale triangle into viewport
  projectedTriangle.points[0].x += 1;
  projectedTriangle.points[0].y += 1;
  projectedTriangle.points[1].x += 1;
  projectedTriangle.points[1].y += 1;
  projectedTriangle.points[2].x += 1;
  projectedTriangle.points[2].y += 1;

  projectedTriangle.points[0].x *= 0.5 * 480;
  projectedTriangle.points[0].y *= 0.5 * 300;
  projectedTriangle.points[1].x *= 0.5 * 480;
  projectedTriangle.points[1].y *= 0.5 * 300;
  projectedTriangle.points[2].x *= 0.5 * 480;
  projectedTriangle.points[2].y *= 0.5 * 300;

  //draw lines
  drawLine(
    projectedTriangle.points[0].x,
    projectedTriangle.points[0].y,
    projectedTriangle.points[1].x,
    projectedTriangle.points[1].y,
    graphics
  );
  drawLine(
    projectedTriangle.points[1].x,
    projectedTriangle.points[1].y,
    projectedTriangle.points[2].x,
    projectedTriangle.points[2].y,
    graphics
  );
  drawLine(
    projectedTriangle.points[2].x,
    projectedTriangle.points[2].y,
    projectedTriangle.points[0].x,
    projectedTriangle.points[0].y,
    graphics
  );
}

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  graphics: Graphics
) {
  graphics.position.set(x1, y1);
  graphics.lineStyle(1, 0xfeeb77, 1).moveTo(x1, y1).lineTo(x2, y2);
}
