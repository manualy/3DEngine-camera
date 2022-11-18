import { Mat4x4, Vec3d } from "./basic3DTypes";
import {
  multiplyVector,
  normaliseVector,
  subtractVectors,
  vectorCrossProduct,
  vectorDotProduct,
} from "./vector";

export function createNewMat4x4() {
  return Array.from(Array(4), (_) => Array(4).fill(0)) as Mat4x4;
}

export function createIdentityMatrix() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
}

export function multiplyMatrixbyMatrix(matrixOne: Mat4x4, matrixTwo: Mat4x4) {
  const matrix = createNewMat4x4();
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      matrix[r][c] =
        matrixOne[r][0] * matrixTwo[0][c] +
        matrixOne[r][1] * matrixTwo[1][c] +
        matrixOne[r][2] * matrixTwo[2][c] +
        matrixOne[r][3] * matrixTwo[3][c];
  return matrix;
}

export function multiplyMatrixVector(inputVector: Vec3d, matrix: Mat4x4) {
  if (matrix !== null) {
    const newVector = {
      x:
        inputVector.x * matrix[0][0] +
        inputVector.y * matrix[1][0] +
        inputVector.z * matrix[2][0] +
        inputVector.w * matrix[3][0],
      y:
        inputVector.x * matrix[0][1] +
        inputVector.y * matrix[1][1] +
        inputVector.z * matrix[2][1] +
        inputVector.w * matrix[3][1],
      z:
        inputVector.x * matrix[0][2] +
        inputVector.y * matrix[1][2] +
        inputVector.z * matrix[2][2] +
        inputVector.w * matrix[3][2],
      w:
        inputVector.x * matrix[0][3] +
        inputVector.y * matrix[1][3] +
        inputVector.z * matrix[2][3] +
        inputVector.w * matrix[3][3],
    };

    return newVector;
  } else {
    throw new Error(
      "Unexpected error happened during vector matrix multiplication."
    );
  }
}

export function generateXRotationMatrix(degrees: number) {
  degrees = (degrees * Math.PI) / 180;
  const matrix = createNewMat4x4();
  matrix[0][0] = 1;
  matrix[1][1] = Math.cos(degrees);
  matrix[1][2] = -Math.sin(degrees);
  matrix[2][1] = Math.sin(degrees);
  matrix[2][2] = Math.cos(degrees);
  matrix[3][3] = 1;
  return matrix;
}

export function generateYRotationMatrix(degrees: number) {
  degrees = (degrees * Math.PI) / 180;
  const matrix = createNewMat4x4();
  matrix[0][0] = Math.cos(degrees);
  matrix[0][2] = Math.sin(degrees);
  matrix[1][1] = 1;
  matrix[2][0] = -Math.sin(degrees);
  matrix[2][2] = Math.cos(degrees);
  matrix[3][3] = 1;
  return matrix;
}

export function generateZRotationMatrix(degrees: number) {
  degrees = (degrees * Math.PI) / 180;
  const matrix = createNewMat4x4();
  matrix[0][0] = Math.cos(degrees);
  matrix[0][1] = -Math.sin(degrees);
  matrix[1][0] = Math.sin(degrees);
  matrix[1][1] = Math.cos(degrees);
  matrix[2][2] = 1;
  matrix[3][3] = 1;
  return matrix;
}

export function generateTranslationMatrix(vec: Vec3d) {
  const matrix = createNewMat4x4();
  matrix[0][0] = 1;
  matrix[1][1] = 1;
  matrix[2][2] = 1;
  matrix[3][3] = 1;
  matrix[3][0] = vec.x;
  matrix[3][1] = vec.y;
  matrix[3][2] = vec.z;
  return matrix;
}

export function inversedMatrix(m: Mat4x4) {
  let newMat = createNewMat4x4();

  newMat[0][0] = m[0][0];
  newMat[0][1] = m[1][0];
  newMat[0][2] = m[2][0];
  newMat[0][3] = 0;
  newMat[1][0] = m[0][1];
  newMat[1][1] = m[1][1];
  newMat[1][2] = m[2][1];
  newMat[1][3] = 0;
  newMat[2][0] = m[0][2];
  newMat[2][1] = m[1][2];
  newMat[2][2] = m[2][2];
  newMat[2][3] = 0;
  newMat[3][0] = -(
    m[3][0] * newMat[0][0] +
    m[3][1] * newMat[1][0] +
    m[3][2] * newMat[2][0]
  );
  newMat[3][1] = -(
    m[3][0] * newMat[0][1] +
    m[3][1] * newMat[1][1] +
    m[3][2] * newMat[2][1]
  );
  newMat[3][2] = -(
    m[3][0] * newMat[0][2] +
    m[3][1] * newMat[1][2] +
    m[3][2] * newMat[2][2]
  );
  newMat[3][3] = 1;
  return newMat;
}

export function pointAtMatrix(position: Vec3d, target: Vec3d, up: Vec3d) {
  // Calculate new forward direction
  const forward = subtractVectors(target, position);
  normaliseVector(forward);

  // Calculate new up direction
  const a = multiplyVector(forward, vectorDotProduct(up, forward));
  const newUp = subtractVectors(up, a);
  normaliseVector(newUp);

  // New right direction
  const newRight = vectorCrossProduct(newUp, forward);

  return [
    [newRight.x, newRight.y, newRight.z, 0],
    [newUp.x, newUp.y, newUp.z, 0],
    [forward.x, forward.y, forward.z, 0],
    [
      -vectorDotProduct(position, newRight),
      -vectorDotProduct(position, newUp),
      -vectorDotProduct(position, forward),
      1,
    ],
  ];
}

export function generateProjectionMatrix(
  fFar: number,
  fNear: number,
  fFov: number,
  fAspectRatio: number
) {
  let pMat = createNewMat4x4();
  const fFovRad = 1 / Math.tan(((fFov * 0.5) / 180) * Math.PI);
  pMat[0][0] = fAspectRatio * fFovRad;

  pMat[1][1] = fFovRad;
  pMat[2][2] = fFar / (fFar - fNear);
  pMat[3][2] = (-fFar * fNear) / (fFar - fNear);
  pMat[2][3] = 1;
  pMat[3][3] = 0;

  return pMat;
}
