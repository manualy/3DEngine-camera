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
        matrix[3][0],
      y:
        inputVector.x * matrix[0][1] +
        inputVector.y * matrix[1][1] +
        inputVector.z * matrix[2][1] +
        matrix[3][1],
      z:
        inputVector.x * matrix[0][2] +
        inputVector.y * matrix[1][2] +
        inputVector.z * matrix[2][2] +
        matrix[3][2],
    };
    const w =
      inputVector.x * matrix[0][3] +
      inputVector.y * matrix[1][3] +
      inputVector.z * matrix[2][3] +
      matrix[3][3];

    if (w !== 0) {
      newVector.x /= w;
      newVector.y /= w;
      newVector.z /= w;
    }

    return newVector;
  } else {
    throw new Error(
      "Unexpected error happened during vector matrix multiplication."
    );
  }
}

export function generateXRotationMatrix(degrees: number) {
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
  newMat[1][0] = m[0][1];
  newMat[1][1] = m[1][1];
  newMat[1][2] = m[2][1];
  newMat[2][0] = m[0][2];
  newMat[2][1] = m[1][2];
  newMat[2][2] = m[2][2];
  newMat[3][0] =
    -m[3][0] * newMat[0][0] + m[3][1] * newMat[1][0] + m[3][2] * newMat[2][0];
  newMat[3][1] =
    -m[3][0] * newMat[0][1] + m[3][1] * newMat[1][1] + m[3][2] * newMat[2][1];
  newMat[3][2] =
    -m[3][0] * newMat[0][2] + m[3][1] * newMat[1][2] + m[3][2] * newMat[2][2];
  newMat[3][3] = 1;
  return newMat;
}

export function pointAtMatrix(position: Vec3d, target: Vec3d, up: Vec3d) {
  // Calculate new forward direction
  const newForward = subtractVectors(target, position);
  normaliseVector(newForward);

  // Calculate new up direction
  const a = multiplyVector(newForward, vectorDotProduct(up, newForward));
  const newUp = subtractVectors(up, a);

  // New right direction
  const newRight = vectorCrossProduct(newUp, newForward);
  let matrix = createNewMat4x4();

  matrix[0][0] = newRight.x;
  matrix[0][1] = newRight.y;
  matrix[0][2] = newRight.z;
  matrix[1][0] = newUp.x;
  matrix[1][1] = newUp.y;
  matrix[1][2] = newUp.z;
  matrix[2][0] = newForward.x;
  matrix[2][1] = newForward.y;
  matrix[2][2] = newForward.z;
  matrix[3][0] = position.x;
  matrix[3][1] = position.y;
  matrix[3][2] = position.z;
  matrix[3][3] = 1;

  return matrix;
}

export function generateProjectionMatrix(
  fFar: number,
  fNear: number,
  fAspectRatio: number,
  fFovRad: number
) {
  let pMat = createNewMat4x4();

  pMat[0][0] = fAspectRatio * fFovRad;
  pMat[1][1] = fFovRad;
  pMat[2][2] = fFar / (fFar - fNear);
  pMat[3][2] = (-fFar * fNear) / (fFar - fNear);
  pMat[2][3] = 1;
  pMat[3][3] = 0;

  return pMat;
}
