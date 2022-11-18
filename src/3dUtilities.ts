import { Graphics } from "pixi.js";
import { Mat4x4, Object3D, Triangle, Vec3d } from "./basic3DTypes";
import {
  createIdentityMatrix,
  generateTranslationMatrix,
  generateXRotationMatrix,
  generateYRotationMatrix,
  generateZRotationMatrix,
  multiplyMatrixbyMatrix,
  multiplyMatrixVector,
} from "./matrix";
import { addVectors, divideVector } from "./vector";

export interface RotationMatrices {
  rotationXMatrix: Mat4x4;
  rotationYMatrix: Mat4x4;
  rotationZMatrix: Mat4x4;
}

export function translateTriangle(
  triangle: Triangle,
  translationMatrix: Mat4x4
) {
  if (translationMatrix)
    triangle.points.forEach((vec3d: Vec3d) => {
      const translatedPoints = multiplyMatrixVector(vec3d, translationMatrix);
      vec3d.x = translatedPoints.x;
      vec3d.y = translatedPoints.y;
      vec3d.z = translatedPoints.z;
    });
}

export function drawObject3D(
  object3D: Object3D,
  projectionMatrix: Mat4x4,
  graphics: Graphics
) {
  let worldMatrix = createIdentityMatrix();
  const rotationMatrices = {
    rotationXMatrix: generateXRotationMatrix(object3D.rotation.x),
    rotationYMatrix: generateYRotationMatrix(object3D.rotation.y),
    rotationZMatrix: generateZRotationMatrix(object3D.rotation.z),
  };
  const translationMatrix = generateTranslationMatrix(object3D.position);

  worldMatrix = multiplyMatrixbyMatrix(
    worldMatrix,
    rotationMatrices.rotationXMatrix
  );
  worldMatrix = multiplyMatrixbyMatrix(
    worldMatrix,
    rotationMatrices.rotationYMatrix
  );
  worldMatrix = multiplyMatrixbyMatrix(
    worldMatrix,
    rotationMatrices.rotationZMatrix
  );
  worldMatrix = multiplyMatrixbyMatrix(worldMatrix, translationMatrix);

  object3D.mesh.forEach((triangle) => {
    drawTriangle(triangle, worldMatrix, projectionMatrix, graphics);
  });
}

export function drawTriangle(
  triangle: Triangle,
  worldMatrix: Mat4x4,
  projectionMatrix: Mat4x4,
  graphics: Graphics
) {
  const transformedTriangle = <Triangle>{
    points: [
      multiplyMatrixVector(triangle.points[0], worldMatrix),
      multiplyMatrixVector(triangle.points[1], worldMatrix),
      multiplyMatrixVector(triangle.points[2], worldMatrix),
    ],
  };

  //convert from 3d -> 2d
  const projectedTriangle = <Triangle>{
    points: [
      multiplyMatrixVector(transformedTriangle.points[0], projectionMatrix),
      multiplyMatrixVector(transformedTriangle.points[1], projectionMatrix),
      multiplyMatrixVector(transformedTriangle.points[2], projectionMatrix),
    ],
  };
  // scale into view
  projectedTriangle.points[0] = divideVector(
    projectedTriangle.points[0],
    projectedTriangle.points[0].w
  );
  projectedTriangle.points[1] = divideVector(
    projectedTriangle.points[1],
    projectedTriangle.points[1].w
  );
  projectedTriangle.points[2] = divideVector(
    projectedTriangle.points[2],
    projectedTriangle.points[2].w
  );

  //offset into visible normalised space
  let vectorOffsetView = { x: 1, y: 1, z: 0, w: 1 };
  projectedTriangle.points[0] = addVectors(
    projectedTriangle.points[0],
    vectorOffsetView
  );
  projectedTriangle.points[1] = addVectors(
    projectedTriangle.points[1],
    vectorOffsetView
  );
  projectedTriangle.points[2] = addVectors(
    projectedTriangle.points[2],
    vectorOffsetView
  );
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
