import { Graphics } from "pixi.js";
import { Mat4x4, Object3D, Triangle, Vec3d } from "./basic3DTypes";
import {
  generateTranslationMatrix,
  generateXRotationMatrix,
  generateYRotationMatrix,
  generateZRotationMatrix,
  multiplyMatrixVector,
} from "./matrix";
import { addVectors } from "./vector";

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

export function rotateTriangle(
  triangle: Triangle,
  rotationMatrices: RotationMatrices
) {
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

export function rotateVec3d(vector: Vec3d, rotationMatrices: RotationMatrices) {
  if (rotationMatrices.rotationXMatrix) {
    const newVector = multiplyMatrixVector(
      vector,
      rotationMatrices.rotationXMatrix
    );
    vector.x = newVector.x;
    vector.y = newVector.y;
    vector.z = newVector.z;
  }
  if (rotationMatrices.rotationYMatrix) {
    const newVector = multiplyMatrixVector(
      vector,
      rotationMatrices.rotationYMatrix
    );
    vector.x = newVector.x;
    vector.y = newVector.y;
    vector.z = newVector.z;
  }
  if (rotationMatrices.rotationZMatrix) {
    const newVector = multiplyMatrixVector(
      vector,
      rotationMatrices.rotationZMatrix
    );
    vector.x = newVector.x;
    vector.y = newVector.y;
    vector.z = newVector.z;
  }
}

export function drawObject3D(
  object3D: Object3D,
  projectionMatrix: Mat4x4,
  viewMatrix: Mat4x4,
  graphics: Graphics
) {
  const rotationMatrices = {
    rotationXMatrix: generateXRotationMatrix(object3D.rotation.x),
    rotationYMatrix: generateYRotationMatrix(object3D.rotation.y),
    rotationZMatrix: generateZRotationMatrix(object3D.rotation.z),
  };

  const translationMatrix = generateTranslationMatrix(object3D.position);

  object3D.mesh.forEach((triangle) => {
    drawTriangle(
      triangle,
      rotationMatrices,
      translationMatrix,
      viewMatrix,
      projectionMatrix,
      graphics
    );
  });
}

export function drawTriangle(
  triangle: Triangle,
  rotationMatrices: RotationMatrices,
  translatioNMatrix: Mat4x4,
  projectionMatrix: Mat4x4,
  viewMatrix: Mat4x4,
  graphics: Graphics
) {
  const viewedTriangle = <Triangle>{
    points: [triangle.points[0], triangle.points[1], triangle.points[2]],
  };

  rotateTriangle(viewedTriangle, rotationMatrices);
  translateTriangle(viewedTriangle, translatioNMatrix);

  //convert from world -> view
  viewedTriangle.points[0] = multiplyMatrixVector(
    viewedTriangle.points[0],
    viewMatrix
  );
  viewedTriangle.points[1] = multiplyMatrixVector(
    viewedTriangle.points[1],
    viewMatrix
  );
  viewedTriangle.points[2] = multiplyMatrixVector(
    viewedTriangle.points[2],
    viewMatrix
  );
  //convert from 3d -> 2d
  const projectedTriangle = <Triangle>{
    points: [
      multiplyMatrixVector(viewedTriangle.points[0], projectionMatrix),
      multiplyMatrixVector(viewedTriangle.points[1], projectionMatrix),
      multiplyMatrixVector(viewedTriangle.points[2], projectionMatrix),
    ],
  };

  //scale triangle into viewport

  let vectorOffsetView = { x: 1, y: 1, z: 0 };
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
