import * as PIXI from "pixi.js";
import { drawObject3D, RotationMatrices } from "../3dUtilities";
import { Camera } from "../camera";
import {
  generateXRotationMatrix,
  generateYRotationMatrix,
  generateZRotationMatrix,
} from "../matrix";
import { generateScene } from "../sceneGenerator";
import { Controls, handleKeyDown, handleKeyUp } from "./controls";

export const generatePixiApp = () => {
  const app = new PIXI.Application({
    width: 480,
    height: 300,
    backgroundColor: "#000000",
    // resolution: window.devicePixelRatio || 1,
    resolution: 1,
  });

  // @ts-ignore
  document.querySelector<HTMLDivElement>("#display")!.appendChild(app.view);

  const container = new PIXI.Container();
  const graphics = new PIXI.Graphics();

  const controls = <Controls>{
    isKeyUpPressed: false,
    isKeyDownPressed: false,
    isKeyLeftPressed: false,
    isKeyRightPressed: false,
  };

  app.stage.addChild(container);

  container.addChild(graphics);

  container.x = 0;
  container.y = 0;

  container.pivot.x = app.view.width / 2;
  container.pivot.y = app.view.height / 2;
  const scene = generateScene();
  const camera = new Camera(app.view);

  var fTheta = 0;

  window.addEventListener("keydown", (event) => handleKeyDown(event, controls));
  window.addEventListener("keyup", (event) => handleKeyUp(event, controls));

  app.ticker.add((delta) => {
    graphics.clear();

    // render scene
    fTheta += delta;

    if (controls.isKeyUpPressed) camera.position.y += 0.01 * delta; // Travel Upwards
    if (controls.isKeyDownPressed) camera.position.y -= 0.01 * delta; // Travel Downwards
    if (controls.isKeyLeftPressed) camera.position.x -= 0.01 * delta; // Travel Along X-Axis
    if (controls.isKeyRightPressed) camera.position.x += 0.01 * delta; // Travel Along X-Axis
    if (controls.isKeyGoForwardPressed) camera.position.z += 0.5 * delta; // Travel Along X-Axis
    if (controls.isKeyGoBackwardPressed) camera.position.z -= 0.5 * delta; // Travel Along X-Axis
    if (controls.isKeyTurnRightPressed) camera.rotation.y += 0.5 * delta;
    if (controls.isKeyTurnLeftPressed) camera.rotation.y -= 0.5 * delta;
    if (controls.isKeyZoomInPressed) camera.fFov -= 1 * delta;
    if (controls.isKeyZoomOutPressed) camera.fFov += 1 * delta;

    const cameraRotationMatrices = <RotationMatrices>{
      rotationXMatrix: generateXRotationMatrix(camera.rotation.x),
      rotationYMatrix: generateYRotationMatrix(camera.rotation.y),
      rotationZMatrix: generateZRotationMatrix(camera.rotation.z),
    };

    scene.forEach((object3d) => {
      object3d.rotation.z = fTheta * 0.5;
      object3d.rotation.x = fTheta * 0.25;
      object3d.rotation.y = fTheta * 0.25;
      drawObject3D(object3d, camera.projectionMatrix, graphics);
    });
  });
};
