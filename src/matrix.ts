import { Mat4x4, Vec3d } from "./basic3DTypes";

export function createNewMat4x4() {
  return Array.from(Array(4), (_) => Array(4).fill(0)) as Mat4x4;
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
  if (degrees !== 0) {
    const matrix = createNewMat4x4();
    matrix[0][0] = 1;
    matrix[1][1] = Math.cos(degrees);
    matrix[1][2] = -Math.sin(degrees);
    matrix[2][1] = Math.sin(degrees);
    matrix[2][2] = Math.cos(degrees);
    matrix[3][3] = 1;
    return matrix;
  }
  return null;
}

export function generateYRotationMatrix(degrees: number) {
  if (degrees !== 0) {
    const matrix = createNewMat4x4();
    matrix[0][0] = Math.cos(degrees);
    matrix[0][2] = Math.sin(degrees);
    matrix[1][1] = 1;
    matrix[2][0] = -Math.sin(degrees);
    matrix[2][2] = Math.cos(degrees);
    matrix[3][3] = 1;
    return matrix;
  }
  return null;
}

export function generateZRotationMatrix(degrees: number) {
  if (degrees !== 0) {
    const matrix = createNewMat4x4();
    matrix[0][0] = Math.cos(degrees);
    matrix[0][1] = -Math.sin(degrees);
    matrix[1][0] = Math.sin(degrees);
    matrix[1][1] = Math.cos(degrees);
    matrix[2][2] = 1;
    matrix[3][3] = 1;
    return matrix;
  }
  return null;
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
