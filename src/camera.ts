import { Mat4x4, Vec3d } from "./basic3DTypes";
import { ICanvas } from "pixi.js";
import { generateProjectionMatrix } from "./matrix";

export class Camera {
  private __fNear: number;
  private __fFar: number;
  private __fFov: number;
  private fFovRad: number;
  private appView: ICanvas;
  position: Vec3d;
  rotation: Vec3d;
  lookDirection: Vec3d;
  fYaw: number;
  projectionMatrix: Mat4x4;

  constructor(
    appView: ICanvas,
    position = { x: 0, y: 0, z: -5 } as Vec3d,
    rotation = { x: 0, y: 0, z: 0 } as Vec3d,
    lookDirection = { x: 0, y: 0, z: 1 } as Vec3d,
    fFov = 90,
    fYaw = 0
  ) {
    this.appView = appView;
    this.position = position;
    this.rotation = rotation;
    this.lookDirection = lookDirection;
    this.fYaw = fYaw;
    this.__fFov = fFov;
    this.__fNear = 0.1;
    this.__fFar = 1000;
    this.fFovRad = 1 / Math.tan(((fFov * 0.5) / 180) * Math.PI);
    this.projectionMatrix = generateProjectionMatrix(
      this.__fFar,
      this.__fNear,
      this.appView.height / this.appView.width,
      this.fFovRad
    );
  }

  set fFov(newFFov: number) {
    this.__fFov = newFFov;
    this.fFovRad = 1 / Math.tan(((newFFov * 0.5) / 180) * Math.PI);
    this.recalculateProjectionMatrix();
  }

  get fFov(): number {
    return this.__fFov;
  }

  recalculateProjectionMatrix() {
    this.projectionMatrix = generateProjectionMatrix(
      this.__fFar,
      this.__fNear,
      this.appView.height / this.appView.width,
      this.fFovRad
    );
  }
}
