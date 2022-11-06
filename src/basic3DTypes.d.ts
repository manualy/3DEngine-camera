export interface ProjectionMatrixConfig {
  fNear: number;
  fFar: number;
  fFov: number;
  fAspectRatio: number;
  fFovRad: number;
}

export interface Vec3d {
  x: number;
  y: number;
  z: number;
}

export interface Triangle {
  points: Vec3d[];
}

export type Scene = Array<Object3D>;
export type Mesh = Array<Triangle>;

export interface Object3D {
  mesh: Mesh;
  position: Vec3d;
  rotation: Vec3d;
}

export type Mat4x4 = number[][]; // [rows][columns]
